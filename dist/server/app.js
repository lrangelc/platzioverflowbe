"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = require("./routes");

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.get('/', function (req, res) {
  return res.send('Hola desde Express!');
});

if (process.env.NODE_ENV === 'production') {
  // app.use(express.static(path.join(process.cwd(), 'dist/platzioverflowbe')));
  // app.use('/', express.static(path.join(process.cwd(), 'dist/platzioverflowbe')));
  app.use('/', _express["default"]["static"](process.cwd() + '/dist/platzioverflowbe'));
}

app.use('/api/questions', _routes.question);
app.use('/api/auth', _routes.auth);
var _default = app;
exports["default"] = _default;