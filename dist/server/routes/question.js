"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _middleware = require("../middleware");

var _dbApi = require("../db-api");

var _utils = require("../utils");

var _debug = _interopRequireDefault(require("debug"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// import { required, questionMiddleware, questionsMiddleware, questions } from '../middleware';
var app = _express["default"].Router();

var debug = new _debug["default"]('platzioverflowbe:routes:question'); // const currentUser = {
//     email: 'luis@gmail.com',
//     password: '1234',
//     firstName: 'Luis',
//     lastName: 'Rangel',
//     _id: 999
// };
// function userMiddleware(req, res, next) {
//     req.user = currentUser;
//     next();
// }

app.use((0, _cors["default"])()); // GET /api/questions
// READ QUESTIONS
// app.get('/', questionsMiddleware, (req, res) => {

app.get('/', function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var sort, questions;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            sort = req.query.sort;
            _context.next = 4;
            return _dbApi.question.findAll(sort);

          case 4:
            questions = _context.sent;
            res.status(200).json(questions);
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              message: 'An error ocurred',
              error: _context.t0
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); // GET /api/questions/:id
// READ question

app.get('/:id', _middleware.questionMiddleware, function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // setTimeout(()=>{
            //     res.status(200).json(req.question)
            // }, 1000);
            try {
              // const q = await question.findById(req.params.id);
              res.status(200).json(req.question);
            } catch (err) {
              // handleError(err,res);
              res.status(500).json({
                message: 'An error ocurred',
                error: err
              });
            }

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()); // POST /api/questions
// CREATE question

app.post('/', _middleware.required, function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body, title, description, icon, q, savedQuestion;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log('Add new Question'); // const question = req.body;
            // question._id = +new Date();
            // question.user = req.user;
            // question.createdAt = new Date();
            // question.answers = [];
            // questions.push(question);

            _req$body = req.body, title = _req$body.title, description = _req$body.description, icon = _req$body.icon;
            q = {
              title: title,
              description: description,
              icon: icon,
              user: req.user._id
            };
            _context3.prev = 3;
            _context3.next = 6;
            return _dbApi.question.create(q);

          case 6:
            savedQuestion = _context3.sent;
            res.status(201).json(savedQuestion);
            _context3.next = 13;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](3);
            (0, _utils.handleError)(_context3.t0, res);

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 10]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()); // POST /api/questions/:id/answers
// CREATE answer

app.post('/:id/answers', _middleware.required, _middleware.questionMiddleware, function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var a, q, saveAnswer;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            a = req.body;
            q = req.question;
            a.createdAt = new Date();
            a.user = req.user._id; // a.user = new User(req.user);

            _context4.prev = 4;
            _context4.next = 7;
            return _dbApi.question.createAnswer(q, a);

          case 7:
            saveAnswer = _context4.sent;
            res.status(201).json(saveAnswer);
            _context4.next = 14;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](4);
            (0, _utils.handleError)(_context4.t0, res);

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[4, 11]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
var _default = app;
exports["default"] = _default;