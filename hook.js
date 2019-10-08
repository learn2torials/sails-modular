const fs = require("fs");
const _ = require("lodash");
const path = require("path");

module.exports = function(sails) {
  const loader = require("./index")(sails);
  const directoryPath = path.join(sails.config.appPath, "modules");
  return {
    getDirectories: function(path) {
      return fs.readdirSync(path).filter(function(file) {
        return fs.statSync(path + "/" + file).isDirectory();
      });
    },
    initialize: function(next) {
      const modules = this.getDirectories(directoryPath);
      sails.after(["hook:i18n:loaded"], function() {
        _.map(modules, mod => {
          const modulePath = path.join(sails.config.appPath, "modules", mod);
          loader.inject(modulePath, err => {
            if (err) sails.log.warn(err);
          });
        });
      });
      return next();
    }
  };
};
