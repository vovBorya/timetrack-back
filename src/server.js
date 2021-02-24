const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');

const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));

routes(app);

app.listen(PORT, () => {
  console.log('Server started');
});
