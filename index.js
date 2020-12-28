// Modules
var express = require('express');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false})
const mongoose = require('mongoose');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');
var read = fs.readFileSync('./views/index.ejs', 'utf8');
global.document = new JSDOM(read).window.document;
document.location.reload();

//Models
const itemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const Item = mongoose.model('Item', itemSchema);

//Set-up
var app = express();
mongoose.connect('mongodb+srv://antoine:antoinetest@cluster0.qh9so.mongodb.net/antoine?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.set('view engine', 'ejs');
app.use(bodyParser.json());


// Home
app.get('/', function(req, res){
  app.use('/assets', express.static('assets'));
  Item.find({}, function(err, items){
    if (err) throw err;
    res.render('index', {data: items});
  })
});

// Add an item
app.post('/', urlencodedParser, function(req, res){
  const item = new Item({
    name: req.body.item
  });
  item.save( function(err, items) {
    if (err) throw err;
  });
  Item.find({}, function(err, items){
    if (err) throw err;
    res.render('index', {data: items});
  });
});

//Delete an item
app.delete('/:id', function(req, res) {
  Item.find({item: req.params.item.replace(/\-/g, " ")}).remove( function(err, data){
    if (err) throw err;
  }
);
  Item.find({}, function(err, items){
    if (err) throw err;
    res.render('index', {data: items});
  });
});



app.listen(3000);
