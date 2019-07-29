"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _debug = _interopRequireDefault(require("debug"));

var _cors = _interopRequireDefault(require("cors"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = require("../config");

var _models = require("../models");

var _bcryptjs = require("bcryptjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// import { users, findUserByEmail } from '../middleware';
var app = _express["default"].Router();

var debug = new _debug["default"]('platzioverflowbe:auth'); // function comparePasswords(providedPassword, userPassword) {
//     return providedPassword === userPassword;
// }

app.use((0, _cors["default"])());
app.post('/signin', function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var _req$body, email, password, user, token;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            debug("Login user Try!");
            _req$body = req.body, email = _req$body.email, password = _req$body.password; // const user = new findUserByEmail(email);

            _context.next = 4;
            return _models.User.findOne({
              email: email
            });

          case 4:
            user = _context.sent;

            if (user) {
              _context.next = 8;
              break;
            }

            debug("User with email ".concat(email, " not found"));
            return _context.abrupt("return", handleLoginFailde(res));

          case 8:
            if ((0, _bcryptjs.compareSync)(password, user.password)) {
              _context.next = 11;
              break;
            }

            debug("Password do not match: ".concat(password, " != ").concat(user.password));
            return _context.abrupt("return", handleLoginFailde(res, 'Password don\'t match'));

          case 11:
            //crear token
            token = createToken(user);
            res.status(200).json({
              message: 'Login succeded',
              token: token,
              userId: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
app.post('/signup', function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res, next) {
    var _req$body2, firstName, lastName, email, password, u, user, token;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            debug("Creating new user Try!");
            _req$body2 = req.body, firstName = _req$body2.firstName, lastName = _req$body2.lastName, email = _req$body2.email, password = _req$body2.password; // const user = {
            //     _id: +new Date(),
            //     firstName,
            //     lastName,
            //     email,
            //     password
            // };

            u = new _models.User({
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: (0, _bcryptjs.hashSync)(password, 10)
            });
            debug("Creating new user: ".concat(u));
            _context2.next = 6;
            return u.save();

          case 6:
            user = _context2.sent;
            // users.push(user);
            //crear token
            token = createToken(user);
            res.status(201).json({
              message: 'User created',
              token: token,
              userId: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email
            });

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());

var createToken = function createToken(user) {
  return _jsonwebtoken["default"].sign({
    user: user
  }, _config.secret, {
    expiresIn: 86400
  });
};

function handleLoginFailde(res, message) {
  return res.status(401).json({
    message: 'Login fails',
    error: message || 'Email and password don\'t match'
  });
}

var _default = app;
exports["default"] = _default;