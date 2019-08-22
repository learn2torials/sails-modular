
/**
 *
 * Author: Sandip Patel
 * Description: load policies files for given module
 */
const _ = require('lodash');

module.exports =  (sails, dir, cb) => {
  require('include-all').optional({
    dirname: dir,
    flatten: true,
    replaceExpr: null,
    filter: /(.+)\.js$/,
    keepDirectoryPath: true
  }, (err, policies) => {
    if (err) {
      return cb(err);
    }
    _.each(policies, (policyFn, policyName) => {
      policyFn.sails = sails;
      policyFn._middlewareType = 'POLICY: '+policyName;
    });
    _.merge(sails.hooks.policies.middleware, policies);
    return sails.hooks.policies.initialize(cb);
  });
};
