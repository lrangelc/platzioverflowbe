"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.required = void 0;

var _debug = _interopRequireDefault(require("debug"));

var _config = require("../config");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _types = require("@babel/types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var debug = new _debug["default"]('platzioverflowbe:auth-middleware'); // export const users = [
//     {
//         email: 'luis@gmail.com',
//         password: '1234',
//         firstName: 'Luis',
//         lastName: 'Rangel',
//         _id: 999
//     }
// ];
// export const findUserByEmail = e => users.find(({email}) => email === e)
// function findUserByEmail(email) {
//     return users.find(user => user.email === email)
// }

var required = function required(req, res, next) {
  _jsonwebtoken["default"].verify(req.query.token, _config.secret, function (err, token) {
    if (err) {
      debug('JWT was not encrypted with our secret');
      return res.status(401).json({
        message: 'Unauthorized',
        error: err
      });
    }

    debug("Token verified ".concat(token));
    req.user = token.user;
    next();
  });
};

exports.required = required;