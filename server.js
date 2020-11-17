const express = require('express');
const serveStatic = require('serve-static');
const enforce = require('express-sslify');
const app = express();

app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(serveStatic(__dirname + '/dist'));

app.listen(process.env.PORT || 5000);