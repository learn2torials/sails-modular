
/**
 *
 * Author: Sandip Patel
 * Description: load controllers files for given module
 */
const _ = require('lodash');
const helpRegisterAction = require('sails/lib/app/private/controller/help-register-action');
const traditionalRegex = new RegExp('^((?:(?:.*)/)*([0-9A-Z][0-9a-zA-Z_]*))Controller\\..+$');

module.exports =  (sails, dir, cb) => {
  require('include-all').optional({
    dirname: dir,
    flatten: true,
    keepDirectoryPath: true,
    filter: /(^[^.]+\.(?:(?!md|txt).)+$)/,
  }, (err, files) => {
    if (err) { return cb(err); }
    try {
      _.each(files, (controller) => {
        _.each(controller, (action, actionId) => {
          const match = traditionalRegex.exec(controller.globalId);
          if(match) {
            const actionIdentity = (match[1] + '/' + actionId).toLowerCase();
            if (_.isString(action) || _.isBoolean(action)) {
              return;
            }
            helpRegisterAction(sails, action, actionIdentity, true);
          }
        });
      });
    }
    catch(err) {
      return cb(err);
    }
  });
  return cb();
};
