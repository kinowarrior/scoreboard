const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).send("Hello World");
});


const server = app.listen(5000, function () {
    console.log("app running on port.", server.address().port);
});