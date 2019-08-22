
/**
 *
 * Author: Sandip Patel
 * Description: create modular structure
 */
const async = require('async');

module.exports = (sails) => {
  return {

    injectConfigs: function (dir, cb) {
      require(__dirname + '/src/configs')(sails, dir, cb);
    },

    injectPolicies: function (dir, cb) {
      require(__dirname + '/src/policies')(sails, dir, cb);
    },

    injectModels: function (dir, cb) {
      require(__dirname + '/src/models')(sails, dir, cb);
    },

    injectServices: function (dir, cb) {
      require(__dirname + '/src/services')(sails, dir, cb);
    },

    injectControllers: function (dir, cb) {
      require(__dirname + '/src/controllers')(sails, dir, cb);
    },

    inject: function (dir, next) {

      let toLoad = [];
      const self = this;
      const callback = next || function(){};

      const directories = {
        models: dir + '/models',
        configs: dir + '/configs',
        services: dir + '/services',
        policies: dir + '/policies',
        controllers: dir + '/controllers',
      };

      const loadConfigs = (next) => {
        self.injectConfigs(directories.configs, (err) => {
          if (err) {
            return next(err);
          }
          return next(null);
        });
      };

      const loadPolicies = (next) => {
        self.injectPolicies(directories.policies, (err) => {
          if (err) {
            return next(err);
          }
          return next(null);
        });
      };

      const loadModels = (next) => {
        self.injectModels(directories.models, (err) => {
          if (err) {
            return next(err);
          }
          return next(null);
        });
      };

      const loadServices = (next) => {
        self.injectServices(directories.services, (err) => {
          if (err) {
            return next(err);
          }
          return next(null);
        });
      };

      const loadControllers = (next) => {
        self.injectControllers(directories.controllers, (err) => {
          if (err) {
            return next(err);
          }
          return next(null);
        });
      };

      // load second
      toLoad.push(loadConfigs);
      toLoad.push(loadPolicies);

      // load after
      toLoad.push(loadModels);
      toLoad.push(loadServices);
      toLoad.push(loadControllers);

      async.waterfall(toLoad, (err) => {
        if (err) {
          sails.log.error(err);
          return callback(err);
        }
        sails.log('custom module loaded');
        return callback();
      });
    }
  };
};
