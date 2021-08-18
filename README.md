

A test setup for Lighthouse tests of Netlify PR previews.

Some notes:

* It tests Mobile and Desktop by doing two runs with `additive: true` and the preset appended to every URL (see https://github.com/GoogleChrome/lighthouse-ci/issues/138). This is not pretty, but I think it's the only current way.
* It reports the summary result as a PR comment (2 markdown tables).