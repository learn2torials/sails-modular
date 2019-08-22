/* global sails */
/* global ExampleService */

/**
 *
 * @type {{test: (function(*, *): *)}}
 */
module.exports = {
  test: function (req, res) {
    ExampleService.test();
    sails.log('test method on ExampleController');
    return res.ok();
  }
};
