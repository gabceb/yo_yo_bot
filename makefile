dev:
	supervisor yoyo.js

production:
	NODE_ENV=production node yoyo.js

.PHONY: test yoyo
