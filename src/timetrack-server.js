const http = require('http');
const work = require('./timetrack');
const mysql = require('mysql');

const HTTPMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

const PORT = process.env.PORT || 3000;

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'timetrack',
});

const server = http.createServer((req, res) => {
  switch (req.method) {
    case HTTPMethod.POST:
      work.add(db, req, res);
      break;
    case HTTPMethod.PUT:
      work.update(db, req, res);
      break;
    case HTTPMethod.GET:
      switch (req.url) {
        case '/':
          work.show(db, req, res);
          break;
        case '/archived':
          work.showArchived(db, res);
          break;
      }
      break;
    case HTTPMethod.DELETE: {
      work.delete(db, req, res);
    }
  }
});

db.query('CREATE TABLE IF NOT EXISTS works (' +
  'id INT(10) NOT NULL AUTO_INCREMENT,' +
  'hours DECIMAL(5,2) DEFAULT 0,' +
  'date DATE,' +
  'archived  BOOLEAN DEFAULT false,' +
  'description LONGTEXT,' +
  'PRIMARY KEY (id)' +
  ')', (err) => {
  if (err) throw err;
  console.log('Server started');
  server.listen(PORT, '127.0.0.1');
});
