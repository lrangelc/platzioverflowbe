"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.port = exports.mongoUrl = exports.secret = void 0;
var secret = process.env.SECRET || 'miclavesecreta';
exports.secret = secret;
var mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost/platzi-overflow2';
exports.mongoUrl = mongoUrl;
var port = process.env.PORT || 3000;
exports.port = port;