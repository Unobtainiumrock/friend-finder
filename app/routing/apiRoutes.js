
const path = require('path');
const users = require(path.join(__dirname, '../data/friends'));

class APIRoutes {

  /**
   * attaches our routes to the express server
   * @param  {Object} app is the instance of our express server
   */
  attach(app) {
    app.get('/api/friends', this.grabFriends);
    app.post('/api/friends', this.handleSurvey.bind(this));
  }

  grabFriends(req, res) {
    const { body } = req;
    // console.log(body);
    res.status(200).json(users);
  }

  handleSurvey(req, res) {
    const { body } = req;
    const bestFriend = this.findBestMatch(body);
    res.status(200).json(bestFriend);
  }

  findBestMatch(body) {
    // Grab the values from the survey object as an array;
    const formAnswers = Object.values(body);
    // Evaluates to an array of 'differences' scores by mapping each user
    // and reducing the absolute value difference between the POST answers and the current stored user's
    // answers
    //  example: formAnswers [1,2,3,4,5,6,7,8,9,0] 
    //         stored user 1 [1,3,4,2,1,3,5,6,8,8]
    //         stored user 2 [1,1,1,1,1,1,1,1,1,1]
    //         stored user 3 [9,9,9,9,9,9,9,9,9,9]
    //  example output -> [24,37,45];
    const differences = users.map(user => {
      return user.scores.reduce((mem, val, idx) => {
        return mem + Math.abs(formAnswers[idx] - val);
      }, 0);
    });
    // Evaluates to the index of the lowest (best matching) score from the differences array
    const indexOfBestMatch = differences.indexOf(Math.min(...differences));
    // Use the index of the lowest score which is a one for one match to a user in the 
    // users array.
    const bestMatch = users[indexOfBestMatch];
    // Pull off only relevant info to send back to front-end
    // (we don't need to send back their survey results - only photo and name)
    const { name, photo } = bestMatch;
    return { name, photo };
  }

}

module.exports = new APIRoutes();
