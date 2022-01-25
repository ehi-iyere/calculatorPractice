const http = require('http');
const fs = require('fs');
const _ = require("lodash");
const express = require('express')
const app = express()
 
const server = http.createServer((req, res)=>{
    //lodash

    const num = _.random(0,20);
    console.log(num);

    const  great = _.once(()=>{
        console.log('heloo');
    });
    
    great();
    great();
    res.setHeader('Content-Type', 'text/html');
    //sending html
    let path = './views';
    switch(req.url){
        case '/':
            path += '/calculator.html';
            res.statusCode = 200;
            break;
        case '/calculator.css':
            path += '/calculator.css';
            res.statusCode = 200;
            break;
        case '/calculator.js':
            path += '/calculator.js';
            res.statusCode = 200;
            break;
        case '/extra':
            path += '/extra.html';
            res.statusCode = 200;
            break;
        case '/extra-stuff':
             res.statusCode = 301;
             res.setHeader('Location', '/extra');
             res.end();
            break;
        default:
            path += '/404.html';
            res.statusCode = 404;
            break;
    }
    fs.readFile(path, (err,data)=>{
        if(err){
            console.log(err);
            res.end();
        }
        else{
            
            res.write(data);
            res.end();
        }
    })
    
});

server.listen(3000, 'localhost', ()=>{
    console.log('listening for request on localhost: 3000')
})