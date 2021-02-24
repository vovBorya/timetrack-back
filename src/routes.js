const workService = require('./service');

module.exports = (app) => {
  app.route('/api/works/').post(workService.create);

  app.route('/api/works/:workId').put(workService.update);

  app.route('/api/works/:workId').get(workService.getOne);

  app.route('/api/works/').get(workService.getAll);

  app.route('/api/works/:workId').delete(workService.delete);
};
