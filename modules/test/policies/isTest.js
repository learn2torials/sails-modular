/* global sails */

/**
 * [POLICY] Check allowed hosts
 * @param request
 * @param response
 * @param next
 */
module.exports = (request, response, next) => {
  sails.log('Test policy OK');
  next();
};
