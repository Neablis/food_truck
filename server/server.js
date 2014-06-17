var express = require('express'),
    path = require('path'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var app = express();
console.log(path.join(__dirname, '../'));
app.use(express.compress());
app.use(express.static(path.join(__dirname, '../')));

app.listen(process.env.PORT || 3006);
