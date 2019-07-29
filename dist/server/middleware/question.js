"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.questionMiddleware = void 0;

var _dbApi = require("../db-api");

var _utils = require("../utils");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// const question = {
//     _id: 1,
//     title: 'fafa¿Cómo reutilizo un componente en Android?',
//     description: 'Miren esta es mi pregunta...',
//     createdAt: new Date(),
//     icon: 'devicon-android-plain',
//     answers: [],
//     user: {
//         email: 'luis@gmail.com',
//         password: '1234',
//         firstName: 'Luis',
//         lastName: 'Rangel',
//         _id: 999
//     }
// };
// export const questions = new Array(10).fill(question);
// export const questionsMiddleware = (req, res, next) => {
//     req.questions = questions;
//     next();
// }
// export const questionMiddleware = (req, res, next) => {
//     const { id } = req.params;
//     req.question = questions.find(({ _id }) => _id === +id);
//     next();
// }
var questionMiddleware = function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _dbApi.question.findById(req.params.id);

          case 3:
            req.question = _context.sent;
            next();
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            (0, _utils.handleError)(_context.t0, res);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function questionMiddleware(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.questionMiddleware = questionMiddleware;