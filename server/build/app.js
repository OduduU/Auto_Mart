"use strict";

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Set up the express app
var app = (0, _express["default"])();
var port = parseInt(process.env.PORT, 10) || 5000; // Log requests to the console.

app.use((0, _morgan["default"])('dev')); // Parse incoming requests data

app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
})); // Setup a default catch-all route that sends back a welcome message in JSON format.

app.get('', function (req, res) {
  return res.status(200).send({
    message: 'Welcome to the beginning of nothingness.'
  });
}); // Start the express server

app.listen(port, function () {
  return console.log("server running on port ".concat(port));
});