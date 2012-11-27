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
    * Create command to create project from templates/project
    */
   createProject: function(projectName) {
      yproject.log('info', "Creating project " + projectName);
      var templatePath = path.join(__dirname, '..', 'templates', 'project');
      yproject.copyDirSyncRecursive( templatePath, projectName, {projectName: projectName});
   },


   /**
    * Create command to create a module from templates/module
    */
   /*module: function(arglist) {
      var moduleName = arglist[0],
          project = yproject.getProjectConfig();

      if(!moduleName) {
         console.log("ERR: Missing module name");
         this.help();
         return;
      }

      yproject.copyDirSyncRecursive(__dirname+'/../templates/module', 'src/'+moduleName, {projectName: project.name, moduleName: moduleName});

      console.log("Done !");
      console.log("Now edit the build.properties file to set the correct path to the builder");
   },*/
   
   

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

   
   copyDirSyncRecursive: function(sourceDir, newLocation, locals) {

      var checkDir = fs.statSync(sourceDir),
          k;
   
      var newDirLocation = newLocation;
      for(k in locals) {
         newDirLocation = newDirLocation.replace(k,locals[k]);
      }
      
      // Creating directory
      yproject.log('info', 'Creating directory ' + newDirLocation);
      try {
         fs.mkdirSync(newDirLocation, checkDir.mode);
      } catch(ex) {
         if (ex.code === 'EEXIST') {
            yproject.log('info', 'Already exists');
         }
         else {
            yproject.log('err', ex.message);
            process.exit(0);
         }
      }

      var files = fs.readdirSync(sourceDir);
      for(var i = 0; i < files.length; i++) {

         var currFile = fs.statSync(sourceDir + "/" + files[i]);
         var origFile = sourceDir + "/" + files[i];

           if(currFile.isDirectory()) {
               this.copyDirSyncRecursive(origFile, newDirLocation + "/" + files[i], locals);
           } else {

               yproject.log('info', 'Rendering template ' + origFile);

               var tpl = fs.readFileSync(origFile).toString();
               var contents = ejs.render(tpl, {locals: locals});
   
               var fName = files[i];
               for(k in locals) {
                  fName = fName.replace(k,locals[k]);
               }
               var f = path.join(newDirLocation, fName);

               yproject.log('info', 'Writing file ' + f);
               fs.writeFileSync(f, contents);
          }
       }
   }
   
};

exports.yproject = yproject;



// "widget-parent".camelize() -> "WidgetParent"
/*if(!String.prototype.camelize) {
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
}*/