
import path from 'path';
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
    let { scores } = body;
    scores = scores.map(score => parseInt(score));
    body['scores'] = scores;
    const bestFriend = this.findBestMatch(scores);
    users.push(body);
    res.status(200).json(bestFriend);
  }

  findBestMatch(scores) {
    const formAnswers = scores;
    const differences = users.map(user => {
      return user.scores.reduce((mem, val, idx) => {
        return mem + Math.abs(formAnswers[idx] - val);
      }, 0);
    });

    const indexOfBestMatch = differences.indexOf(Math.min(...differences));
    const bestMatch = users[indexOfBestMatch];
    const { name, photo } = bestMatch;
    return { name, photo };
  }

}

module.exports = new APIRoutes();
