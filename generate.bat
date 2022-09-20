uglifyjs --compress --mangle -- p5.js ml5.js > bin\core.min.js
uglifyjs --compress --mangle -- effects.js sketch.js > bin\script.min.js
uglifycss style.css > bin\style.min.css