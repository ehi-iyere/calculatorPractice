const express = require('express');
const app = express();
const dBURI = 'mongodb+srv://admin:280708admin@histories.gzya9.mongodb.net/histories?retryWrites=true&w=majority';
var morgan = require('morgan')
const mongoose = require('mongoose');
const History = require('./models/history');
const { render } = require('ejs');
//const functions = require('./public/calculator');
const promptSync = require('prompt-sync')({sigint: true});
mongoose.connect(dBURI,{useNewUrlParser: true, useUnifiedTopology:true})
   .then((result)=> app.listen(3000))
   .catch((err)=>console.log(err));
 //register v ieew wngine 
app.set('view engine', 'ejs')
//listen for req

//practicing middlewear
//static files using middleware

app.use(express.static('public'));
//app.use(express.urlencoded({extended: true}));
app.use(express.json({limit:'1mb'}));
//used to get coloured http request status
app.use(morgan('dev'));
app.get('/add-history', (req,res)=>{
   const history = new History({
      body: '3-2'
   });
   history.save()
      .then((result)=>{
         res.send(result)
      })
      .catch((err)=>{
         console.log(err);
      });
  
});


app.get('/all-history', (req,res) =>{
History.find()
   .then((result)=>{
      res.send(result)
   })
   .catch((err)=>{
      console.log(err);
   });
})

app.get('/single-history', (req,res) =>{
   History.findById('6147ac650fde41e6392e66fc')
      .then((result)=>{
         res.send(result)
      })
      .catch((err)=>{
         console.log(err);
      });
   })

app.get('/history', (req,res)=>{
   History.find().sort({createdAt: -1})
   .then((result)=>{
      res.render('calculator', {title: 'hsitory', histories: result} )
   })
   .catch((err)=>{
      console.log(err);
   });
})

app.post('/history',(req,res)=>{
   
   const history = new History(req.body);

   history.save()
   .then(result => {
      res.json( {redirect:'/history'})
   })
      .catch((err)=>{
         console.log(err);
      }); 
})
app.get('/histories/:id',(req,res)=>{
   const id = req.params.id;
   History.findById(id)
      .then(result => {
         res.render('details', {history: result, title: "A history"})
      })
      .catch((err)=>{
         console.log(err);
      });
})

app.delete('/histories/:id',(req,res)=>{
   const id = req.params.id;
   History.findByIdAndDelete(id)
      .then(result => {
         res.json( {redirect:'/history'})
      })
      .catch((err)=>{
         console.log(err);
      });
})


//responding for req

app.get('/', (req,res) =>{
   //res.render('calculator', {title: "Welcome to Calculator"});
   res.redirect('/history');
});

 
app.get('/extra', (req,res) =>{
   res.render('extra', {title: "Extra"});
});

//redirect
app.get('/extra-stff', (req,res) =>{
    res.redirect('./extra');
 });

 //404 page 
 app.use((req,res)=>{
    res.status(404).render('404',{title: "404 Error"});
})