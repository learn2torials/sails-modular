/**
 *
 * Author: Sandip Patel
 * Description: load models files for given module
 */
module.exports = (sails, dir, cb) => {
  require("include-all").optional(
    {
      dirname: dir,
      flatten: true,
      replaceExpr: /^.*\//,
      filter: /^([^.]+)\.js$/
    },
    (err, models) => {
      if (err) {
        return cb(err);
      }
      require("include-all").optional(
        {
          dirname: dir,
          flatten: true,
          replaceExpr: /^.*\//,
          filter: /(.+)\.attributes.json$/
        },
        (err, supplements) => {
          if (err) {
            return cb(err);
          }
          const finalModels = _.merge(models, supplements);
          sails.hooks.orm.models = _.merge(
            finalModels || {},
            sails.hooks.orm.models || {}
          );
          sails.models = _.merge(finalModels || {}, sails.models || {});
        }
      );
    }
  );
  return cb();
};
