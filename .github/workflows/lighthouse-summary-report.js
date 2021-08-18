module.exports = ({ manifest, core }) => {
	const formatResult = (res) => Math.round(res * 100);

	var rows = manifest.map((row) => {
		let urlParts = row.url.split('netlify.app');
		let path = urlParts[1];
		let parts = path.split('?preset=');
		let url = row.url.substring(0, row.url.indexOf('?'));

		return {
			preset: parts[1],
			url: url,
			path: parts[0],
			performance: formatResult(row.summary.performance),
			accessibility: formatResult(row.summary.accessibility),
			seo: formatResult(row.summary.seo)
		};
	});

	const byPreset = function(preset) {
		filtered = rows.filter((row) => {
			return row.preset === preset;
		});

		return filtered.map((row) => {
			return {
				path: row.path,
				url: row.url,
				performance: row.performance,
				accessibility: row.accessibility,
				seo: row.seo
			};
		});
	};

	const byPresetConsole = function(preset) {
		let filtered = byPreset(preset);

		return filtered.map((row) => {
			return {
				path: row.path,
				performance: row.performance,
				accessibility: row.accessibility,
				seo: row.seo
			};
		});
	};

	console.log('\n\n\u001b[32mSummary Results Desktop:\u001b[0m');
	console.table(byPresetConsole('desktop'));
	console.log('\n\n\u001b[32mSummary Results Mobile:\u001b[0m');
	console.table(byPresetConsole('mobile'));

	const score = (res) => (res >= 90 ? '🟢' : res >= 50 ? '🟠' : '🔴');

	const markdownTable = function(rows) {
		let mdLines = [ '| Link | Performance | Accessibility | SEO |', '| --- | --- | --- | --- |' ];

		rows.forEach((row) => {
			mdLines.push(
				`| [${row.path}](${row.url}) | ${score(row.performance)} ${row.performance} | ${score(
					row.accessibility
				)} ${row.accessibility} | ${score(row.seo)} ${row.seo} |`
			);
		});

		return mdLines;
	};

	let markdownDesktop = markdownTable(byPreset('desktop')).join('\n');
	let markdownMobile = markdownTable(byPreset('mobile')).join('\n');

	let comment = `### Lighthouse Desktop
${markdownDesktop}

### Lighthouse Mobile
${markdownMobile}

`;

	core.setOutput('comment', comment);
};
