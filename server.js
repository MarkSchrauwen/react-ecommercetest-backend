const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const {readdirSync} = require("fs");
require('dotenv').config();

// import routes
const authRoutes = require('./routes/auth');

const app = express();

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(() => console.log('DB CONNECTED'))
    .catch(err => console.log('DB connection error : ', err))

// middleware
app.use(morgan("dev"));
app.use(bodyParser.json({limit: "2mb"}));
app.use(cors());

// routes middleware
readdirSync('./routes').map((r) => app.use("/api", require("./routes/" + r)));

// route


const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server is running on port: ${port}`));