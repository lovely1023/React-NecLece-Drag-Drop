const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config()

const app = express();

var corsOptions = {
    origin: function (origin, callback) {
        if (true) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
};

app.use(cors(corsOptions));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const initRoutes = require("./router");
app.use(express.urlencoded({ extended: true }));
initRoutes(app);


const port = process.env.PORT;
const domain = "localhost"
const ipAddress = "0.0.0.0"

app.listen(port, () => {
    console.log(`Running at http://${domain}:${port} or http://${ipAddress}:${port}`);
});