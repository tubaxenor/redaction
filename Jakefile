process.env.NODE_ENV = "development"
require('js-yaml');
require('./app/models/newsletter.js');

String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

namespace('db', function () {
  desc('Load yaml to mongodb');
  task('load', { async: true }, function () {
    var mongoose = require('mongoose'),
    fs = require('fs'),
    config = require('./config/config'),
    db = mongoose.connect(config.db),
    Newsletter = mongoose.model("Newsletter"),
    moment = require('moment');

    var makeDate = function(pubDate){
      return pubDate.replace(/(th|nd|st|rd)/, ",").capitalize();
    }

    var loadYaml = function(filepath){
      var yaml_file = require(filepath);
      yaml_file.pubdate = makeDate(yaml_file.pubdate)
      return yaml_file
    }

    // Borrowed from server.js
    var data_path = __dirname + '/data/archives';
    var walk = function(path) {
      fs.readdirSync(path).forEach(function(file) {
        var filepath = path + '/' + file;
        var stat = fs.statSync(filepath);
        if (stat.isFile()) {
          if (/(.*)\.yml/.test(file)) {
            var campaign = new Newsletter(loadYaml(filepath));
            Newsletter.findOne({ "edition": campaign.edition }, "edition", function(err, newsletter){
              if(!newsletter) {
                campaign.save(function (err) {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log(file + " loaded.")
                  }
                });
              }
            });
          }
        }
      });
      return true
    };

    if(walk(data_path)) process.exit();
  });
});