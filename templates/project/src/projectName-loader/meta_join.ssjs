
var fs = require('fs'),
	 path = require('path');

// Get the loader module name
var pathItems = __dirname.split('/');
var loaderModule = pathItems[pathItems.length-1];

// Get the src directory
var srcDirectory = __dirname+'/../';

var meta_properties = {};

fs.readdir(srcDirectory, function(err, files) {
	files.forEach(function(f) {
		if(f != 'build.xml' && f != loaderModule) {
			
			var buildProperties = srcDirectory+f+'/build.properties';
			path.exists(buildProperties, function(exists) {  
			
				if(exists) {
				
					fs.readFile(buildProperties, function (err, data) {
			  			if (err) throw err;
			
						var lines = data.toString().split("\n");
						var componentName = null, requires = null;
						
						lines.forEach(function(line) {
							var m = line.match(/^\s*component\s*=\s*([^\n]*)/);
							if(m){
								componentName = m[1];
							}
							
							var m = line.match(/^\s*component.requires\s*=\s*([^\n]*)/);
							if(m){
								requires = m[1].split(',');
								for(var i = 0 ; i < requires.length ; i++) {
									requires[i] = requires[i].trim();
								}
							}
						});
						
						if( !componentName || !requires ) {
							console.log("Unable to parse build.properties in folder: "+buildProperties);
						}
						else {
							meta_properties[componentName] = {
									"path": componentName+"/"+componentName+".js",
									"requires": requires
							};
						}
			
					});
					
				}
				
			});
			
		}
	});
});


process.on('exit', function () {

	var str = "\n\
// Note: this file is auto-generated by meta_join.js. Don't Modify me !\n\
YUI().use(function(Y) {\n\
\n\
	/**\n\
 	* YUI 3 module metadata\n\
 	* @module "+loaderModule+"\n\
	 */\n\
	var CONFIG = {\n\
		groups: {\n\
			'<%= projectName %>': {\n\
				base: '../../../build/',\n\
				combine: false,\n\
				modules: "+JSON.stringify(meta_properties)+"\n\
			}\n\
		}\n\
	};\n\
\n\
	if(typeof YUI_config === 'undefined') { YUI_config = {}; }\n\
	Y.mix(YUI_config, CONFIG);\n\
\n\
});";

	fs.writeFileSync( __dirname+'/js/loader.js', str);
	
});
