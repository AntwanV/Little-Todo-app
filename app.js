var express = require('express');
var todoControllers = require('./todoControllers.js');

var app = express();

//Set-up
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
todoControllers(app);

app.listen(3000);
