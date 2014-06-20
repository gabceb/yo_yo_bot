var Helper = module.exports = function() {
	
};

Helper.prototype.log = function(message) {
	console.log("Yo Yo bot: " + message);
};

Helper.prototype.error = function(message) {
	console.error("Yo Yo bot: [ERROR] " + message);
};

Helper.prototype.formatTwitterHandle = function(twitter_handle) {
	if (twitter_handle[0] != "@") {
		twitter_handle = "@" + twitter_handle;
	};

	return twitter_handle;
};

Helper.prototype.removeHandlerFromTweet = function(twitter_handle, text) {
	// Make sure the handle is removed correctly
	twitter_handle = this.formatTwitterHandle(twitter_handle);

	// Create the handle regex
	handle_regex = new RegExp(twitter_handle, 'g');

	// Remove the handle from the tweet
	return text.replace(handle_regex, "");
};