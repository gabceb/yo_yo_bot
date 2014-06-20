module.exports = function(){
  var config = {};

  switch(process.env.NODE_ENV)
  {
  	case 'production':
		config = {
  			tweet_interval: 60000,
        abuse_interval: 60000,
        check_abuse: true,
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
  			tweet_interval: 60000,
        abuse_interval: 60000,
        check_abuse: true,
        bot_handle: "@Yo_Yo_bot",
        mongodb_user: 'PRODUCTION_S3_SECRET',
        mongodb_password: 'PRODUCTION_BUCKET',
        mongodb_url: '',
        twitter: {
          consumer_key: 'jFS6tZI6ItMNDaGDkQyDe3zXE',
          consumer_secret: 'Qs39dpodJ7wjv1Wy9R3PejTjsKB0G4EIgTxf14jEqpikR5JfIf',
          access_token: '2576365741-DHqgrObYQg7BRTiHHX75RHhdWmlE3Y0nlmz71Zt',
          access_token_secret: 'LLMI1mzBFBM2dIsPPiYODbCU2j5srWhT9AygeKdxqpKU1'
        }
  		};
  		break;
  	default:
  		throw "Environment not defined on config.js file";
  }

  return config;
}