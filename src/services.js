
/**
 *
 * Author: Sandip Patel
 * Description: load services files for given module
 */
const _ = require('lodash');
const async = require('async');

module.exports =  (sails, dir, cb) => {
  async.waterfall(
    [
      function loadServicesFromDirectory(next) {
        require('include-all').optional(
          {
            dirname: dir,
            flatten: true,
            replaceExpr: /^.*\//,
            filter: /^([^.]+)\.js$/,
          },
          next,
        );
      },
      function injectServicesIntoSails(modules, next) {
        sails.services = _.merge(modules || {}, sails.services || {});
        if (sails.config.globals.services) {
          _.each(modules, (service) => {
            global[service.globalId] = service;
          });
        }
        return next(null);
      },
    ],
    (err) => {
      return cb(err);
    },
  );
};
