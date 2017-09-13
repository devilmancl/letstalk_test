var path = require('path');
var async = require('async');

var users_info_data = require(path.resolve(__dirname, '../data/users_info_data.json'));

var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.userinfoDS;
ds.automigrate('UserInfo', function(err) {
  if (err) throw err;
  app.models.UserInfo.create(users_info_data, function(err, model) {
    if (err) throw err;

    console.log('Created:', model.length);

    ds.disconnect();
    return;
  });
  return;
});

