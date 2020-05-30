/* eslint-disable indent */
//componente para seguridad en autenticacion
const auth = require('.');
const upload = require('../Utils/uploadImage');

let owner = '';

module.exports = function checkAuth(action) {
  function middleware(req, res, next) {
    switch (action) {
      case 'update':
        owner = req.body.user_id;
        auth.check.own(req, owner);
        next();
        break;
      case 'create':
        auth.check.logged(req);
        next();
        break;
      case 'update-image':
        owner = req.body.user_id;
        auth.check.own(req, owner);
        upload;
        next();
        break;
      default:
        next();
    }
  }

  return middleware;
};