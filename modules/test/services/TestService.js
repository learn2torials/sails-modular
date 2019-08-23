/* global sails */

/**
 *
 * @type {{test: module.exports.test}}
 */
module.exports = {
  test: function (req, res) {
    sails.log('test method on ExampleService');
  }
};
