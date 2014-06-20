//
//  Yo Yo Twitter - Twitter bot that shares yo yo love around
//

// Set the NODE_ENV to development if not defined
process.env.NODE_ENV = process.env.NODE_ENV || "development"

var Bot = require('./bot/yoyobot'),
    config = require('./config')(),
    Helper = require('./bot/helper'),
    _s = require('underscore.string');

var bot = new Bot(config);
var helper = new Helper();

helper.log('Running....');

var interval = config.tweet_interval;

helper.log('Executing code every ' + interval/1000 + " seconds");
  
var stream = bot.twit.stream('user', { with: 'user' })

stream.on('connected', function (response) {
  helper.log("[CONNECTED] " + response);
})

stream.on('disconnect', function (disconnectMessage) {
  helper.log("[DISCONNECTED] " + disconnectMessage);
});

stream.on('tweet', function(tweet){
  var user = tweet.user;

  if (user) {
    var user_screen_name = user.screen_name;
    var tweet_text = helper.removeHandlerFromTweet(config.bot_handle, tweet.text);

    helper.log("Got tweet with text: " + tweet_text + ". From: " + user_screen_name);

    if (user_screen_name == config.bot_handle) {
      console.log("Received user from bot. Ignoring....");
      return;
    };

    // Trim dat tweet!
    tweet_text = _s.trim(tweet_text);

    // If the tweet text is help then reply with instructions
    if (tweet_text == 'help') {
      bot.replyWithInstructions(user_screen_name)
    }else {
      // If the tweet is valid then try to parse it
      bot.parseMention(tweet_text, user_screen_name);
    };
  };
});

function handleError(err) {
  console.error('response status:', err.statusCode);
  console.error('data:', err.data);
}
