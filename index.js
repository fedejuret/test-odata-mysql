const express = require('express');
var createFilter = require('odata-v4-mysql').createFilter;
const mysql = require('mysql2');

const app = express();

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456789",
    database: "project_one"
});

app.get("/api/contenido", function (req, res) {
    var filter = createFilter(req.query.$filter);
    // connection instance from mysql module
    connection.query(filter.from("contenido"), filter.parameters, function (err, data) {
        res.json({
            '@odata.context': req.protocol + '://' + req.get('host') + '/api/$metadata#contenido',
            value: data
        });
    });
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});