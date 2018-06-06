
const path = require('path');
const data = require(path.join(__dirname,'../data/friends'));

class HTMLRoutes {
  
  /**
   * attaches our routes to the express server
   * @param  {Object} app is the instance of our express server
   */
  attach(app) {
    app.get('/view',this.nonSense);
    app.get('/survey',this.sendSurvey);
    app.get('/',this.home);
  }

  sendSurvey(req,res) {
    let { body } = req;
    console.log(body);
    res.sendFile(path.join(__dirname,'../../app/public/survey.html'));
  }

  home(req,res) {
    let { body } = req;
    res.sendFile(path.join(__dirname,'../../app/public/home.html'));
  }

  nonSense(req,res) {
    let { body } = req;
    console.log(body);
    res.sendFile(path.join(__dirname,'../../app/public/potential-friends.html'));
  }

}

module.exports = new HTMLRoutes();
