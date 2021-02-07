const http = require('http');
const workService = require('./timetrack-service');
const mysql = require('mysql');
const url = require('url');

const HTTPMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

const PORT = process.env.PORT || 8080;

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'password',
  database: 'timetrack',
});

const server = http.createServer((req, res) => {
  switch (req.method) {
    case HTTPMethod.POST:
      workService.create(req, res);
      break;
    case HTTPMethod.PUT:
      workService.update(req, res);
      break;
    case HTTPMethod.GET:
      const query = url.parse(req.url, true).query;
      if (query.id) workService.getOne(res, query.id);
      switch (req.url) {
        case '/':
          workService.getAll(res);
          break;
        case '/archived':
          workService.getAllArchived(res);
          break;
      }
      break;
    case HTTPMethod.DELETE: {
      workService.delete(req, res);
    }
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('Server started');
});
