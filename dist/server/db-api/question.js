"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _debug = _interopRequireDefault(require("debug"));

var _models = require("../models");

var _mongoose = _interopRequireDefault(require("mongoose"));

var findAnswerById = function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(id) {
    var mongoId;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            mongoId = _mongoose["default"].mongo.ObjectId(id);
            _context.next = 3;
            return _models.Answer.findOne({
              _id: mongoId
            }).populate({
              path: 'user',
              select: '-password'
            });

          case 3:
            return _context.abrupt("return", _context.sent);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function findAnswerById(_x) {
    return _ref.apply(this, arguments);
  };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var debug = new _debug["default"]('platzioverflowbe:db-api:question');
var _default = {
  findAll: function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var sort,
          _args2 = arguments;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              sort = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : '-createdAt';
              _context2.next = 3;
              return _models.Question.find().populate('answers').sort(sort);

            case 3:
              return _context2.abrupt("return", _context2.sent);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function findAll() {
      return _ref2.apply(this, arguments);
    };
  }(),
  findById: function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(id) {
      var mongoId;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              mongoId = _mongoose["default"].mongo.ObjectId(id);
              _context3.next = 3;
              return _models.Question.findOne({
                _id: mongoId
              }).populate({
                path: 'user',
                select: '-password'
              }).populate({
                path: 'answers',
                options: {
                  sort: '-createdAt'
                },
                populate: {
                  path: 'user',
                  model: 'User',
                  select: '-password'
                }
              });

            case 3:
              return _context3.abrupt("return", _context3.sent);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function findById(_x2) {
      return _ref3.apply(this, arguments);
    };
  }(),
  create: function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(q) {
      var question;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              question = new _models.Question(q);
              return _context4.abrupt("return", question.save());

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function create(_x3) {
      return _ref4.apply(this, arguments);
    };
  }(),
  createAnswer: function () {
    var _ref5 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(q, a) {
      var answer, savedAnswer;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              answer = new _models.Answer(a);
              _context5.next = 3;
              return answer.save();

            case 3:
              savedAnswer = _context5.sent;
              q.answers.push(answer);
              _context5.next = 7;
              return q.save();

            case 7:
              _context5.next = 9;
              return findAnswerById(savedAnswer._id);

            case 9:
              return _context5.abrupt("return", _context5.sent);

            case 10:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function createAnswer(_x4, _x5) {
      return _ref5.apply(this, arguments);
    };
  }()
};
exports["default"] = _default;