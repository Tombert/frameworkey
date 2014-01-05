var views = require('co-views');

// setup views mapping .ejs
// to the ejs template engine

module.exports = views(__dirname + '/../views', {
  map: { ejs: 'ejs' },
  ext: "ejs"
});