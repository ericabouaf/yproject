/*jshint node:true*/

"use strict";

var fs = require("fs"),
    ejs = require('ejs'),
    colors = require('colors'),
    path = require('path');

var yproject = {

   colors: {
      info: {
         level: 'white',
         msg: 'green'
      },
      err: {
         level: 'red',
         msg: 'red'
      }
   },

   log: function(level, msg) {
      var c = yproject.colors[level];
      console.log("yproject".magenta + " " + ("[" + level + "]")[c.level] + " " + msg[c.msg]);
   },

   /**
    * Create command to create a project from templates/project
    */
   createProject: function(projectName) {
      yproject.log('info', "Creating project " + projectName);
      var templatePath = path.join(__dirname, '..', 'templates', 'project');
      yproject.copyDirSyncRecursive( templatePath, projectName, {projectName: projectName});
   },

   /**
    * Create command to create a module from templates/module
    */
   createModule: function(moduleName, options) {
      yproject.log('info', "Creating module " + moduleName);
      yproject.log('info', "Options " + JSON.stringify(options) );

      var templatePath = path.join(__dirname, '..', 'templates', 'module');
      var destPath = moduleName;

      // Creating module directory
      yproject.mkdir(destPath);

      // TODO: autodetect projectName
      var projectName = 'mytest';

      var locals = {projectName: projectName, moduleName: moduleName};

      if (options.assets) {
        yproject.copyDirSyncRecursive( path.join(templatePath, 'assets'), path.join(destPath, 'assets'), locals);
      }

      if (options.docs) {
        yproject.copyDirSyncRecursive( path.join(templatePath, 'docs'), path.join(destPath, 'docs'), locals);
      }

      if (options.lang) {
        yproject.copyDirSyncRecursive( path.join(templatePath, 'lang'), path.join(destPath, 'lang'), locals);
      }

      if (options.tests) {
        yproject.copyDirSyncRecursive( path.join(templatePath, 'tests'), path.join(destPath, 'tests'), locals);
      }

      // README.md
      var readmePath = path.join(destPath, 'README.md');
      if (!fs.existsSync(readmePath)) {
        fs.writeFileSync(readmePath, "# " + moduleName + " Module");
      }

      // build.json
      var buildJsonPath = path.join(destPath, 'build.json');
      if (!fs.existsSync(buildJsonPath)) {
        var buildObj = {
          "name": moduleName,
          "builds": {}
        };
        buildObj.builds[moduleName] = {
            "jsfiles": [
                moduleName + ".js"
            ]
        };
        fs.writeFileSync(buildJsonPath, JSON.stringify(buildObj, null, 3) );
      }

      // js
      var jsPath = path.join(destPath, 'js');
      if (!fs.existsSync(jsPath)) {
        fs.mkdirSync(jsPath);

        // js file
        var srcFile = path.join(templatePath, 'js', options.widget ? 'widget-moduleName.js' : 'moduleName.js');
        yproject.template(srcFile, moduleName+'.js', jsPath, locals);
      }

      // meta
      var metaPath = path.join(destPath, 'meta');
      if (!fs.existsSync(metaPath)) {
        fs.mkdirSync(metaPath);

        var metaFilePath = path.join(metaPath, moduleName+'.json');
        if (!fs.existsSync(metaFilePath)) {
          var metaStruct = {};
          metaStruct[moduleName] =  {
            "requires": []
          };
          if (options.assets) {
            metaStruct[moduleName].skinnable = true;
          }
          if (options.lang) {
            metaStruct[moduleName].requires.push('intl');
            metaStruct[moduleName].lang = ['en'];
          }
          if (options.widget) {
            metaStruct[moduleName].requires.push('widget');
            metaStruct[moduleName].requires.push('base');
          }
          fs.writeFileSync(metaFilePath, JSON.stringify(metaStruct, null, 3) );
        }
      }

   },


   

   /**
    * Retrieve the project config, if it exists
    */
   /*getProjectConfig: function () {
      var config;

      try {
         config = fs.readFileSync('package.json');
         config = JSON.parse(config);
      }
      catch (e) {
         console.log('Error reading project config... continue anyway');
         config = {};
      }

      return config;
   },*/


   mkdir: function(path) {
      // Creating directory
      yproject.log('info', 'Creating directory ' + path);
      try {
         fs.mkdirSync(path);
      } catch(ex) {
         if (ex.code === 'EEXIST') {
            yproject.log('info', 'Already exists');
         }
         else {
            yproject.log('err', ex.message);
            process.exit(0);
         }
      }
   },

   template: function(origFile, fName, newDirLocation, locals) {
      yproject.log('info', 'Rendering template ' + origFile);

       var tpl = fs.readFileSync(origFile).toString();
       var contents = ejs.render(tpl, {locals: locals});

       for(var k in locals) {
          fName = fName.replace(k,locals[k]);
       }
       var f = path.join(newDirLocation, fName);

       yproject.log('info', 'Writing file ' + f);
       fs.writeFileSync(f, contents);
   },

   copyDirSyncRecursive: function(sourceDir, newLocation, locals) {
   
      var newDirLocation = newLocation;
      for(var k in locals) {
         newDirLocation = newDirLocation.replace(k,locals[k]);
      }
      
      // Creating directory
      yproject.mkdir(newDirLocation);

      // iterating through files
      var files = fs.readdirSync(sourceDir);

      for(var i = 0; i < files.length; i++) {

         var currFile = fs.statSync(path.join(sourceDir, files[i]) );
         var origFile = path.join(sourceDir, files[i]);

           if(currFile.isDirectory()) {
               this.copyDirSyncRecursive(origFile, path.join(newDirLocation, files[i]), locals);
           } else {
                
              var fName = files[i];
              yproject.template(origFile, fName, newDirLocation, locals);
          }
       }
   }
   
};

exports.yproject = yproject;



// "widget-parent".camelize() -> "WidgetParent"
if(!String.prototype.camelize) {
   String.prototype.camelize = function (lowFirstLetter) {
      var str = this.toLowerCase(),
          str_path = str.split('/');

      for (var i=0; i < str_path.length; i++) {
         var str_arr = str_path[i].split('-'),
             initX   = ((lowFirstLetter&&i+1==str_path.length)?(1):(0));

         for (var x = initX; x < str_arr.length; x++) {
            str_arr[x] = str_arr[x].charAt(0).toUpperCase() + str_arr[x].substring(1);
         }
         str_path[i] = str_arr.join('');
      }
      str = str_path.join('::');
      return str;
   };
}