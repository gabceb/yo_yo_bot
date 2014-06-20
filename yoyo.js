//
//  Yo Yo Twitter - Twitter bot that shares yo yo love around
//

// Set the NODE_ENV to development if not defined
process.env.NODE_ENV = process.env.NODE_ENV || "development"

var Bot = require('./bot/yoyobot'),
    config = require('./config')(),
    Helper = require('./bot/helper'),
    _s = require('underscore.string'),
    express = require('express');

var bot = new Bot(config);
var helper = new Helper();
var app = express();

helper.log('Running....');

var stream = bot.twit.stream('user', { with: 'user' })

stream.on('connected', function (response) {
  helper.log("[CONNECTED] " + response);
})

stream.on('disconnect', function (disconnectMessage) {
  helper.log("[DISCONNECTED] " + disconnectMessage);

  // Let's reconnect to the stream after a certain time
  setTimeout(function(){
    helper.log("[CONNECTING] Connecting to stream");
    stream.start();

  }, config.restart_stream_after);

});

stream.on('tweet', function(tweet){
  var user = tweet.user;

  if (user) {
    var user_screen_name = helper.formatTwitterHandle(user.screen_name);
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

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Hello from Yo Yo!');
});

app.listen(app.get('port'), function() {
  helper.log("Yo Yo app is running at :" + app.get('port'));
});
