'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var path = require('path');
var data = require(path.join(__dirname, '../data/friends'));

var HTMLRoutes = function () {
  function HTMLRoutes() {
    _classCallCheck(this, HTMLRoutes);
  }

  _createClass(HTMLRoutes, [{
    key: 'attach',


    /**
     * attaches our routes to the express server
     * @param  {Object} app is the instance of our express server
     */
    value: function attach(app) {
      app.get('/view', this.nonSense);
      app.get('/survey', this.sendSurvey);
      app.get('/', this.home);
    }
  }, {
    key: 'sendSurvey',
    value: function sendSurvey(req, res) {
      var body = req.body;

      console.log(body);
      res.sendFile(path.join(__dirname, '../public/survey.html'));
    }
  }, {
    key: 'home',
    value: function home(req, res) {
      var body = req.body;

      res.sendFile(path.join(__dirname, '../public/home.html'));
    }
  }, {
    key: 'nonSense',
    value: function nonSense(req, res) {
      var body = req.body;

      console.log(body);
      res.sendFile(path.join(__dirname, '../public/potential-friends.html'));
    }
  }]);

  return HTMLRoutes;
}();

module.exports = new HTMLRoutes();