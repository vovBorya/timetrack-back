const qs = require('querystring');

exports.parseReceivedData = (req, cb) => {
  let body = '';
  req.setEncoding('utf8');
  req.on('data', (chunk) => body += chunk);
  req.on('end', () => {
    const data = qs.parse(body);
    cb(data);
  });
};

exports.add = (db, req, res) => {
  exports.parseReceivedData(req, (work) => {
    const {hours, date, description} = work
    db.query(
      'INSERT INTO works (hours, date, description)' +
      'VALUES (?, ?, ?)',
      [hours, date, description],
      (err) => {
        if (err) throw err;
        // return new obj
        // show(db, res);
      }
    );
  });
};

exports.delete = (db, req, res) => {
  exports.parseReceivedData(req, (workId) => {
    db.query(
      'DELETE FROM works' +
      'WHERE id = ?',
      [workId],
      (err) => {
        if (err) throw err;
        // return deleted id
        // exports.show(db, res);
      }
    )
  })
};

exports.update = (db, req, res) => {
  exports.parseReceivedData(req, (newWork) => {
    const {id, hours, date, archived, description} = newWork;
    db.query(
      'UPDATE works +' +
      'SET hours = ?, date = ?, archived = ?, description = ?' +
      'WHERE id = ?',
      [hours, date, archived, description, id],
      (err) => {
        if (err) throw err;
        //return updated obj
      }
    )
  })
}

exports.show = (db, res, showArchive = false) => {
  db.query(
    'SELECT * FROM works WHERE archived = ?',
    [showArchive],
    (err, works) => {
      if (err) throw err;
      res.end(works);
    }
  )
};

exports.showArchived = (db, res) => {
  exports.show(db, res, true);
}
