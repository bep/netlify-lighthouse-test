const lhURL = function(path) {
	// Append preset to the URL to make it unique.
	// See https://github.com/GoogleChrome/lighthouse-ci/issues/138
	return `${process.env.BASE_URL}${path}?preset=${encodeURIComponent(process.env.LIGHTHOUSE_PRESET)}`;
};

var settings = {};

// The default is mobile (which does not have a preset name).
if (process.env.LIGHTHOUSE_PRESET === 'desktop') {
	settings.preset = process.env.LIGHTHOUSE_PRESET;
}

module.exports = {
	ci: {
		collect: {
			method: 'node',
			headful: false,
			additive: true,
			numberOfRuns: 1,
			puppeteerLaunchOptions: {
				args: [ '--disable-gpu', '--no-sandbox', '--no-zygote' ]
			},
			settings: settings,
			url: [ lhURL('/'), lhURL('/p1') ]
		},
		assert: {
			// These are just example assertions. Set to error to fail the build.
			assertions: {
				'categories:performance': [ 'warn', { minScore: 0.5 } ],
				'categories:accessibility': [ 'warn', { minScore: 0.95 } ],
				'categories:seo': [ 'warn', { minScore: 0.8 } ]
			}
		},
		upload: {
			// upload options here
		},
		server: {
			// server options here
		},
		wizard: {
			// wizard options here
		}
	}
};
