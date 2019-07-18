if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express()
const errorHandler = require('./middlewares/error-handler');
const port = process.env.PORT || 3000
const mongoose = require('mongoose');

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
mongoose.connect(process.env.DB_SERVER, {
  useNewUrlParser: true,
  useCreateIndex: true
});

app.use(cors())
app.use(morgan('tiny'))

// Routes Main
const routesIndex = require('./routes/index');

//  Home Page
app.use('/', routesIndex)
app.use(errorHandler)

app.listen(port, () => console.log(`Hello from port : ${port}! 😙`))
