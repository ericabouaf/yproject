#!/usr/bin/node

var express = require('express');

var app = express.createServer();

app.configure(function(){
    app.use(express.methodOverride());
    app.use(express.bodyDecoder());
    app.use(app.router);
    app.use(express.staticProvider(__dirname+'/..'));
});

app.get('/', function(req, res){
    res.redirect('index.html');
});

app.get('/tests', function(req, res){
    res.send('hello world');
});

app.listen(3000);

console.log("listening on http://localhost:3000");
