const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config();

const app = express();

mongoose.connect(process.env.DB_CONNECTION_URI, { useNewUrlParser: true });

app.use(morgan('combined'));
app.use(bodyParser.json());


router(app);
const port = process.env.PORT || 3090;

app.listen(port, () => {
    console.log(`Server listening on ${port}`)
});