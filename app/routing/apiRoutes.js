
const path = require('path');
const data = require(path.join(__dirname,'../data/friends'));

class APIRoutes {
  
  /**
   * attaches our routes to the express server
   * @param  {Object} app is the instance of our express server
   */
  attach(app) {
    app.get('/api/friends',this.grabFriends);
    app.post('/api/friends',this.sendSurvey);
  }

  grabFriends(req,res) {
    let { body } = req;
    console.log(body);
    res.status(200).send('FUCK!');
  }

  sendSurvey(req,res) {
    let { body } = req;
    console.log(body);
    res.status(200).send();
  }

}

module.exports = new APIRoutes();
