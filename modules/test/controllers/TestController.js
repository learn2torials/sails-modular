/* global sails */
/* global Test */
/* global TestService */

/**
 *
 * @type {{test: (function(*, *): *)}}
 */
module.exports = {
  test: function (req, res) {

    // sample service test
    TestService.test();

    // sample example model
    const example = await Test.findOne({ 'id': 1});

    return res.ok(example);
  }
};
