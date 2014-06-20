module.exports = function(){
  var config = {};

  switch(process.env.NODE_ENV)
  {
  	case 'production':
		config = {
  			restart_stream_after: 60000,
        abuse_interval: 60000,
        check_abuse: false,
        bot_handle: "@Yo_Yo_bot",
  			mongodb_user: 'PRODUCTION_S3_SECRET',
  			mongodb_password: 'PRODUCTION_BUCKET',
        mongodb_url: '',
        twitter: {
          consumer_key: '',
          consumer_secret: '',
          access_token: '',
          access_token_secret: ''
        }
  		};
  		break;
    case 'development':
    	config = {
  			restart_stream_after: 60000,
        abuse_interval: 60000,
        check_abuse: false,
        bot_handle: "@Yo_Yo_bot",
        mongodb_user: 'PRODUCTION_S3_SECRET',
        mongodb_password: 'PRODUCTION_BUCKET',
        mongodb_url: '',
        twitter: {
          consumer_key: '',
          consumer_secret: '',
          access_token: '',
          access_token_secret: ''
        }
  		};
  		break;
  	default:
  		throw "Environment not defined on config.js file";
  }

  return config;
}