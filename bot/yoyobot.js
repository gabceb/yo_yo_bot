//
//  Bot
//  class for performing Yo Yo twitter operations
//
var Twit = require('twit'),
    Helper = require('./helper'),
    _s = require('underscore.string');

var helper = new Helper();

var YoYoBot = module.exports = function(config) {
  this.config = config;

  this.twit = new Twit(this.config.twitter);
};

//
//  Checks if a user has Yo Yo'd this person too many times and enforces the abuse limit
//
YoYoBot.prototype.checkAbuse = function(callback) {
  if (this.config.check_abuse) {
    console.log("CHECKING FOR ABUSE");
  }
};

//
//  Replies with the instructions tweet
//
YoYoBot.prototype.replyWithInstructions = function(to, callback) {
  var instructionsTweet = helper.formatTwitterHandle(to) + " Yo Yo a friend by tweeting at me with the person's handle.";
  var extendedInstructionsTweet = instructionsTweet + " Don't add the @ to keep the suprise factor!";

  // If we can feet the long instructions then let's add it
  if (extendedInstructionsTweet.length <= 140) {
    instructionsTweet = extendedInstructionsTweet;
  };

  if (typeof callback == 'undefined') {
    callback = function(err, data, response) {
      helper.log("Tweeted instructions to " + to + "\nResponse: " + data);
    }
  };

  this.twit.post('statuses/update', { status: instructionsTweet }, callback);
};

//
//  Replies with invalid yo yo tweet
//
YoYoBot.prototype.replyWithInvalid = function(to, callback) {
  var invalidTweet = helper.formatTwitterHandle(to) + " Yo Yo, we could not parse your tweet.";
  var extendedInvalidTweet = invalidTweet + " Make sure you send the users you want to Yo Yo separated by commas"

  if (extendedInvalidTweet.length <= 140) {
    invalidTweet = extendedInvalidTweet;
  };

  if (typeof callback == 'undefined') {
    callback = function(err, data, response) {
      helper.log("Tweeted invalid tweet message to " + to + "\nResponse: " + data);
    }
  };

  this.twit.post('statuses/update', { status: invalidTweet }, callback);
};

//
//  Send a Yo Yo tweet
//
YoYoBot.prototype.replyWithYoYoTweet = function(to, from, callback) {
  var yoYoTweet = "Yo Yo " + helper.formatTwitterHandle(to) + " from " + helper.formatTwitterHandle(from);

  if (typeof callback == 'undefined') {
    callback = function(err, data, response) {
      helper.log("Tweeted Yo Yo to " + to + "\nResponse: " + data);
    }
  };

  this.twit.post('statuses/update', { status: yoYoTweet }, callback);
};

//
//  Send Multiple YoYo tweets
//
YoYoBot.prototype.replyWithMultipleYoYoTweet = function(users, from, callback) {

  if (users) {
    for(var i = 0; i < users.length; i++)
    {
      this.replyWithYoYoTweet(users[i], from);
    }
  };
};

//
//  Parse Mention
//
YoYoBot.prototype.parseMention = function(tweet_text, from) {
  recepients = tweet_text.split(',')

  yoYoUsers = [];

  // Keep a flag to know if we have hit a user that is invalid
  allUsersValid = true;

  for(var i = 0; i < recepients.length; i++) {
    // Separate in spaces to find more than one word
    users = _s.trim(recepients[i]).split(" ")

    // If we have only 1 word then push it to the yoYoUsers array to be mentioned
    if (users.length == 1) {
      yoYoUsers.push(users[0])
    } else {
      // We found a string that had more than one word fire the error callback, set the flag and break!
      allUsersValid = false;
      
      this.replyWithInvalid(from);

      break;
    };
  };

  if (allUsersValid && yoYoUsers.length != 0) {
    // We are done parsing the users, go do your thing
    this.replyWithMultipleYoYoTweet(yoYoUsers, from);
  };
};