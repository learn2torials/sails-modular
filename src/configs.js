
/**
 *
 * Author: Sandip Patel
 * Description: load config files for given module
 */
module.exports =  (sails, dir, cb) => {
  require('include-all').aggregate(
    {
      dirname: dir,
      filter: /(.+)\.(js|json)$/,
      excludeDirs: /(locales|env)$/,
      exclude: ['locales', 'local.js', 'local.json'],
    },
    (err, configs) => {
      if (err) {
        return cb(err);
      }
      sails.config = _.merge(sails.config, configs, (a, b) => {
        if (_.isArray(a)) {
          return a.concat(b);
        }
      });
    },
  );
  return cb();
};
