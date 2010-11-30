#!/usr/bin/node

var fs = require('fs'), path = require('path');

var srcDirectory = __dirname+'/../src/';
var tests = [];

fs.readdir(srcDirectory, function(err, files) {
	files.forEach(function(f) {
		var moduleName = f;
		if(f != "build.xml") {
			var testDir = srcDirectory+moduleName+'/tests';
			fs.readdir(testDir, function(err, files) {
				if(files) {
					files.forEach(function(f) {
						if(f.substr(f.length-5,5) == ".html") {
							tests.push(moduleName+"/tests/"+f);
						}
					});
				}
			});
		}
	});
});

process.on('exit', function () {
	var str="<?xml version=\"1.0\"?>\n\<yuitest version=\"3\">\n\    <tests base=\"http://localhost:8888/Projets/<%= projectName %>/src/\" timeout=\"30000\">\n";
	tests.forEach(function(f) {
		str +="      <url>"+f+"</url>\n";
	});
   str += "    </tests>\n</yuitest>";
	fs.writeFileSync( __dirname+'/../tests/tests.xml', str);
});
