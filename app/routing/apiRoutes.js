
const path = require('path');
const users = require(path.join(__dirname, '../data/friends'));

class APIRoutes {

  attach(app) {
    app.get('/api/friends', this.grabFriends);
    app.post('/api/friends', this.handleSurvey.bind(this));
  }

  grabFriends(req, res) {
    const { body } = req;
    res.status(200).json(users);
  }

  handleSurvey(req, res) {
    const { body } = req;
    const bestFriend = this.findBestMatch(body);
    users.push(body);
    res.status(200).json(bestFriend);
  }

  findBestMatch(body) {
    const formAnswers = body.scores;
    const differences = users.map(user => {
      return user.scores.reduce((mem, val, idx) => {
        return mem + Math.abs(formAnswers[idx] - val);
      }, 0);
    });

    const indexOfBestMatch = differences.indexOf(Math.min(...differences));
    const bestMatch = users[indexOfBestMatch];
    const { name, photo } = bestMatch;
    
    // users.push()
    return { name, photo };
  }

}

module.exports = new APIRoutes();
