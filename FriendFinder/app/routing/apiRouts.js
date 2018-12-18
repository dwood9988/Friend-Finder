// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on friend matches, your survey answers etc. 
// ===============================================================================

var friendsData = require("../data/friends.js");
var surveyData = require("../data/survey.html");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  app.get("/api/survey", function(req, res) {
    res.json(surveyData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the friendsData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
 
    if (friendsData.length < 5) {
      friendsData.push(req.body);
      res.json(true);
    }
    else {
      surveyData.push(req.body);
      res.json(false);
    }
  });

  // ---------------------------------------------------------------------------
  // empty the tables, both friends and survey answers, so you can start over

  app.post("/api/clear", function(req, res) {
    // Empty out the arrays of data
    friendsData.length = [];
    surveyData.length = [];

    res.json({ ok: true });
  });
};
