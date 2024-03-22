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

app.use(cors());

route(app)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})