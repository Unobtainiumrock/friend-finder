'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var path = require('path');
var users = require(path.join(__dirname, '../data/friends'));

var APIRoutes = function () {
  function APIRoutes() {
    _classCallCheck(this, APIRoutes);
  }

  _createClass(APIRoutes, [{
    key: 'attach',
    value: function attach(app) {
      app.get('/api/friends', this.grabFriends);
      app.post('/api/friends', this.handleSurvey.bind(this));
    }
  }, {
    key: 'grabFriends',
    value: function grabFriends(req, res) {
      var body = req.body;

      res.status(200).json(users);
    }
  }, {
    key: 'handleSurvey',
    value: function handleSurvey(req, res) {
      var body = req.body;

      var bestFriend = this.findBestMatch(body);
      users.push(body);
      res.status(200).json(bestFriend);
    }
  }, {
    key: 'findBestMatch',
    value: function findBestMatch(body) {
      var formAnswers = body.scores;
      var differences = users.map(function (user) {
        return user.scores.reduce(function (mem, val, idx) {
          return mem + Math.abs(formAnswers[idx] - val);
        }, 0);
      });

      var indexOfBestMatch = differences.indexOf(Math.min.apply(Math, _toConsumableArray(differences)));
      var bestMatch = users[indexOfBestMatch];
      var name = bestMatch.name,
          photo = bestMatch.photo;

      // users.push()

      return { name: name, photo: photo };
    }
  }]);

  return APIRoutes;
}();

module.exports = new APIRoutes();