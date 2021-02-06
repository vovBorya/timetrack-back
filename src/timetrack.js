const qs = require('querystring');
const {Work} = require('./models/Work');

exports.parseReceivedData = (req, cb) => {
  let body = '';
  req.setEncoding('utf8');
  req.on('data', (chunk) => body += chunk);
  req.on('end', () => {
    const data = qs.parse(body);
    cb(data);
  });
};

exports.add = (req, res) => {
  exports.parseReceivedData(req, async (work) => {
    const {hours, date, description} = work;
    const newWork = await Work.create({hours, date, description});
    res.end(JSON.stringify(newWork));
  });
};

exports.delete = (req, res) => {
  exports.parseReceivedData(req,  async ({id}) => {
    await Work.destroy({where: {id}});
    res.end(JSON.stringify(parseInt(id)));
  })
};

exports.update = (req, res) => {
  exports.parseReceivedData(req, async (newWork) => {
    const {id, hours, date, archived, description} = newWork;
    await Work.update({
      date,
      hours,
      archived,
      description,
    }, {where: {id}})
    res.end(JSON.stringify(newWork));
  })
}

exports.show = async (res, showArchive = false) => {
  const works = await Work.findAll({where: {archived: showArchive}});
  res.end(JSON.stringify(works, null, 2));
};

exports.showArchived = (res) => {
  exports.show(res, true);
}
