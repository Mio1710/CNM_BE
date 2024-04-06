const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()
const port = 8000
const route = require('./app/routes')


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(cors({
  origin: 'http://localhost:3000'
}));

// config auth middleware
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

route(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})