var express = require('express'),
    app = express(),
    path = require('path'),
    nDI = require('..');

var container = new nDI.Container(),
    loader = new nDI.Loader(container, path.join(__dirname, 'src'));

loader.load('services.json');

app.set('ip', process.env.IP || '127.0.0.1');
app.set('port', process.env.PORT || 3000);
app.use('/', container.get('controller').getRouter());

var server = app.listen(app.get('port'), app.get('ip'), function() {
  var address = server.address();

  console.log(
    'Express server is running at: http://%s:%d/',
    address.address,
    address.port
  );
});
