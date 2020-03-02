const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

const config = require('./config/config');
const authUser = require('./app/services/authService');

mongoose.connect(config.db.uri);

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.get('/auth', authUser);

app.get('/auth/instagram/callback', authUser);




app.get('/login', function (request, response) {
	response.redirect(config.instagram.auth_url);
});

app.get('/', function (request, response) {
	response.sendfile('./public/index.html')
});

app.listen(3000);
console.log('App is runung on port 3000');