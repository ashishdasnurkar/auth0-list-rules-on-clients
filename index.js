var express  = require('express');
var auth0    = require('auth0-oauth2-express');
var Webtask  = require('webtask-tools');
var nconf    = require('nconf');
var app      = express();
var template = require('./templates/index.jade');
var metadata = require('./webtask.json');

app.use(auth0({
    clientName: 'Auth0 List Rules on Clients',
    scopes: 'read:clients read:rules'
  })
);

app.get('/', function (req, res) {
    res.header("Content-Type", 'text/html');
    res.status(200).send(template({
        baseUrl: res.locals.baseUrl,
        auth0Domain: nconf.get("AUTH0_DOMAIN")
    }));
});

// This endpoint would be called by webtask-gallery to discover your metadata
app.get('/meta', function (req, res) {
    res.status(200).send(metadata);
});

module.exports = app;
