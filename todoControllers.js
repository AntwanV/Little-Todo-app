//Modules
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
const mongoose = require('mongoose');
 
var psw = require('./psw.js'); 
//Connect to Mongoose
mongoose.connect('mongodb+srv://antoine:'+psw+'@cluster0.qh9so.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Models
const itemSchema = mongoose.Schema({
  name: {
  type: String,
  required: true
  }
});

const Item = mongoose.model('Item', itemSchema);

//App
module.exports = function(app) {
  // Home
  app.use(bodyParser.json());
  app.get('/', function(req, res){
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
    item.save( function(err) {
      if (err) throw err
    });
    Item.find({}, function(err, items){
      if (err) throw err;
      res.render('index', {data: items});

    });
});

  //Delete an item
  app.delete('/:id', function(req, res) {
    Item.deleteOne({name: req.params.id.replace(/-/g, " ")})
     .then(result => console.log(`Deleted ${result.deletedCount} item.`))
     .catch(err => console.error(`Delete failed with error: ${err}`));

    Item.find({}, function(err, items){
      if (err) throw err;
      res.render('index', {data: items});
    });
  });
};
