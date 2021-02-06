const http = require('http');
const work = require('./timetrack');
const mysql = require('mysql');

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
      work.add(req, res);
      break;
    case HTTPMethod.PUT:
      work.update(req, res);
      break;
    case HTTPMethod.GET:
      switch (req.url) {
        case '/':
          work.show(res);
          break;
        case '/archived':
          work.showArchived(res);
          break;
      }
      break;
    case HTTPMethod.DELETE: {
      work.delete(req, res);
    }
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('Server started');
});
