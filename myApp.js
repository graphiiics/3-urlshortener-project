var express = require('express');
var app = express();
const mongo = require('mongodb');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const shortid = require('shortid')
const dns = require('dns');

const shortCtrl = require('./controllers/ShortUrlController')

//Connect MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connection Succed')
});


app.post('/new', (req, res) => {

 
  var original = req.body.original
  
  var url = original.split('//')
  var hostname = (url.length > 1) ? url[1] : url [0] 
  //(hostname.length > 0) ? hostname == hostname[1] : hostname == hostname[0]
  console.log(hostname)
  
  
  //Comprobar URL Original
  dns.lookup(hostname, (err, address, family) => {
    console.log(err)
    if(err) return res.json({"error":"invalid URL"})
    //console.log("------->",address)
    //res.send("xxxxxx")
    shortCtrl.get(req.body)
    .then(data => {
      console.log(data)
      if(data){
        res.json(data)
      }else{
        
        
        var newUrl = {
          original: original,
          short_url: shortid.generate()
        }
        //generate random text
        //console.log(shortid.generate());
      
        
        shortCtrl.create(newUrl)
        .then(data => {
          res.json(newUrl)
        })
        .catch(err => {
          res.json({
              confirmation: 'fail',
              message: err.message
            })
        })
      }
    })
    .catch(err => {
      res.json({
				confirmation: 'fail',
				message: err.message
			})
    }) 
  
  })

})

app.get('/:short', (req, res) => {
  //console.log(req)
  shortCtrl.get({ short_url : req.params.short})
    .then(data => {
      console.log(data.original)
      res.redirect(data.original)
    })
    .catch(err => {
        res.json({
          confirmation: 'fail',
          message: err.message
        })
    })
})




module.exports = app;