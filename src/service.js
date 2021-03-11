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

exports.create = async (req, res) => {
  const {hours, date, description} = req.body;
  const newWork = await Work.create({hours, date, description});
  res.end(JSON.stringify(newWork));
};

exports.delete = async (req, res) => {
  const {workId} = req.params;
  await Work.destroy({where: {id: workId}});
  res.end(JSON.stringify(parseInt(workId)));
};

exports.update = async (req, res) => {
  const {hours, date, description, archived} = req.body;
  const {workId} = req.params;
  console.log({hours, date, description, archived, workId});
  await Work.update({
    date,
    hours,
    archived,
    description,
  }, {where: {id: workId}});
  res.end(JSON.stringify({
    id: workId,
    date,
    hours,
    archived,
    description,
  }));
};

exports.getOne = async (req, res) => {
  const work = await Work.findByPk(parseInt(req.params.workId));
  if (work === null) errorNotFound(res);
  else res.end(JSON.stringify(work));
};

exports.getAll = async (req, res) => {
  const works = await Work.findAll({where: {archived: !!req.params.archived}});
  res.send(JSON.stringify(works, null, 2));
};

const errorNotFound = (res) => {
  res.statusCode = 404;
  res.end('Resource not found');
};
