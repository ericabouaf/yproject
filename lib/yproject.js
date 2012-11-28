/*jshint node:true*/

"use strict";

var fs = require("fs"),
    ejs = require('ejs'),
    path = require('path');

require('colors');


var yproject = {

   colors: {
      log: {
         level: 'green',
         msg: 'white'
      },
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
   createProject: function (projectName, templatePath) {
      yproject.log('log', "Creating project " + projectName);

      if (!templatePath) {
        templatePath = path.join(__dirname, '..', 'templates', 'project');
      }

      yproject.copyDirSyncRecursive( templatePath, projectName, {projectName: projectName});
   },

   /**
    * Create command to create a module from templates/module
    */
   createModule: function(moduleName, options, templatePath) {
      yproject.log('log', "Creating module " + moduleName);

      // Lookup for project
      var projectInfos = yproject.projectLookup();
      if (projectInfos === false) {
         yproject.log('err', "Unable to find yuidoc.json or package.json in any parent directory !");
         yproject.log('err', "Cannot create module " + moduleName + ": project not found !");
         return;
      }

      var projectName = projectInfos.name;
      var destPath = path.join(projectInfos.path, 'src', moduleName);

      var locals = {projectName: projectName, moduleName: moduleName};

      if (!templatePath) {
         templatePath = path.join(__dirname, '..', 'templates', 'module');
      }

      // Creating module directory
      yproject.mkdir(destPath);

      // Optional folders
      ['assets', 'docs', 'lang', 'tests'].forEach(function (option) {
         if (options[option]) {
            var optionPath = path.join(destPath, option);
            if (fs.existsSync(optionPath)) {
               yproject.log('log', "Folder " + option + " already exists");
            }
            else {
               yproject.log('log', "Creating " + option + " folder");
               yproject.copyDirSyncRecursive( path.join(templatePath, option), optionPath, locals);
            }
         }
      });

      // README.md
      var readmePath = path.join(destPath, 'README.md');
      if (!fs.existsSync(readmePath)) {
         yproject.log('log', "Creating README.md");
         fs.writeFileSync(readmePath, "# " + moduleName + " Module");
      }

      // build.json
      var buildJsonPath = path.join(destPath, 'build.json');
      if (!fs.existsSync(buildJsonPath)) {
         yproject.log('log', "Creating build.json");

         var buildObj = {
            "name": moduleName,
            "builds": {}
         };
         buildObj.builds[moduleName] = {
            "jsfiles": [ moduleName + ".js" ]
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

      // meta folder
      var metaPath = path.join(destPath, 'meta');
      if (!fs.existsSync(metaPath)) {
         yproject.log('log', "Creating meta folder");
         fs.mkdirSync(metaPath);
      }

      // meta file
      var metaFilePath = path.join(metaPath, moduleName+'.json');
      var metaStruct;
      if (!fs.existsSync(metaFilePath)) {
         yproject.log('log', "Creating meta/" + moduleName + ".json");

         metaStruct = {};
         metaStruct[moduleName] =  {
            "requires": []
         };
      }
      else {
         yproject.log('log', "Updating meta/" + moduleName + ".json");
         metaStruct = JSON.parse(fs.readFileSync(metaFilePath).toString());
      }
      if (options.assets) {
         metaStruct[moduleName].skinnable = true;
      }
      if (options.lang) {
         if (metaStruct[moduleName].requires.indexOf('intl') === -1) {
            metaStruct[moduleName].requires.push('intl');
         }
         if (!metaStruct[moduleName].lang) {
            metaStruct[moduleName].lang = ['en'];
         }
      }
      if (options.widget) {
         if (metaStruct[moduleName].requires.indexOf('widget') === -1) {
            metaStruct[moduleName].requires.push('widget');
         }
         if (metaStruct[moduleName].requires.indexOf('base') === -1) {
            metaStruct[moduleName].requires.push('base');
         }
      }
      fs.writeFileSync(metaFilePath, JSON.stringify(metaStruct, null, 3) );

      yproject.log('log', "Done ! module " + moduleName);

   },


   // get project path & name
   projectLookup: function (lookupPath) {

      if (!lookupPath) {
         lookupPath = process.cwd();
      }

      var yuidocPath = path.join(lookupPath, 'yuidoc.json');
      if (fs.existsSync(yuidocPath)) {
         var docinfos = JSON.parse(fs.readFileSync(yuidocPath).toString());
         return {
            name: docinfos.name,
            path: lookupPath
         };
      }

      var packagePath = path.join(lookupPath, 'package.json');
      if (fs.existsSync(packagePath)) {
         var packageInfos = JSON.parse(fs.readFileSync(packagePath).toString());
         return {
            name: packageInfos.name,
            path: lookupPath
         };
      }

      // move up the folder hierarchy
      var parentPath = path.dirname(lookupPath);
      if (parentPath === lookupPath) {
         return false;
      }
      return yproject.projectLookup(parentPath);
   },

   // get module path & name   
   moduleLookup: function (lookupPath) {

      if (!lookupPath) {
         lookupPath = process.cwd();
      }

      var buildPath = path.join(lookupPath, 'build.json');
      if (fs.existsSync(buildPath)) {
         var moduleInfos = JSON.parse(fs.readFileSync(buildPath).toString());
         return {
            name: moduleInfos.name,
            path: lookupPath
         };
      }

      // move up the folder hierarchy
      var parentPath = path.dirname(lookupPath);
      if (parentPath === lookupPath) {
         return false;
      }
      return yproject.moduleLookup(parentPath);
   },


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
            yproject.template(origFile, files[i], newDirLocation, locals);
         }
      }

   }
   
};

exports.yproject = yproject;



// "widget-parent".camelize() -> "WidgetParent"
// used in templates
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