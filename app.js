var express = require('express');
var todoControllers = require('./todoControllers.js');
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// const fs = require('fs');
// var read = fs.readFileSync('./views/index.ejs', 'utf8');
// global.document = new JSDOM(read).window.document;
var app = express();
//document.location.reload();


//Set-up
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
todoControllers(app);

app.listen(3000);
