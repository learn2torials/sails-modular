/**
 *
 * Author: Sandip Patel
 * Description: load policies files for given module
 */
const _ = require('lodash');
const async = require('async');

module.exports = (sails, dir, cb) => {
  sails._actionMiddleware = {}; // reset
  if (_.isArray(sails.config.paths.policies)) {
    sails.config.paths.policies.push(dir);
  } else {
    sails.config.paths.policies = [sails.config.paths.policies, dir];
  }
  sails.modules.loadPolicies = function(cb) {
    async.reduce(
      sails.config.paths.policies,
      {},
      (prev, curr, callback) => {
        require('include-all').optional(
          {
            dirname: curr,
            flatten: true,
            replaceExpr: null,
            keepDirectoryPath: true,
            filter: /^(.+)\.(?:(?!md|txt).)+$/,
          },
          (err, policies) => {
            if (err) {
              return callback(err);
            }
            const modules = _.merge(prev, policies);
            _.each(modules, moduleDef => {
              moduleDef.sails = sails;
              _.bindAll(moduleDef);
            });
            return callback(undefined, modules);
          },
        );
      },
      cb,
    );
  };
  return sails.hooks.policies.initialize(cb);
};
