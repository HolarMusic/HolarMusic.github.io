var fs = require("fs"),
	xml = require("xml"),
	trackList = require("../js/tracks.js");

var baseURL = `https://holarmusic.github.io`,
	urlArr = [];

urlArr.push({
	loc: baseURL
});

trackList.forEach(
	(v, k) => urlArr.push({
		loc: baseURL + "#" + k,
		"image:image": {
			"image.loc": v.img
		}
	})
);

var xmlObj = {
	xml: [
		{
			_attr: {
				version: "1.0",
				encoding: "UTF-8"
			}
		},
		{
			urlset: [
				{
					_attr: {
						xmlns: `http://www.sitemaps.org/schemas/sitemap/0.9`,
						"xmlns:image": `http://www.google.com/schemas/sitemap-image/1.1`
					}
				},
				{
					url: urlArr
				}
			]
		}
	]
};


fs.writeFile('../sitemap.xml', xml(xmlObj), err => {
	if (err) throw err;
	console.log('Replaced!');
});
