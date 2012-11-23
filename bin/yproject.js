#!/usr/bin/env node

var fs     = require("fs"),
    ejs    = require('ejs'),
    xml2js = require('xml2js');

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


var argv = process.argv.slice(2),
    arg = "",
    conf = {},
    key,
    arglist = [],
    command,
    flagsDone;

yproject = {
   
   commands: {
      
      /**
       * Create command to create project from templates/project
       */
      create: function(arglist) {
         var projectName = arglist[0];
         if(!projectName) {
            console.log("ERR: Missing project name");
            this.help();
            return;
         }
         yproject.copyDirSyncRecursive( __dirname+'/../templates/project', projectName, {projectName: projectName});
      },
      
      /**
       * Create command to create a widget from templates/widget
       */
      widget: function(arglist) {
         var moduleName = arglist[0];
         if(!moduleName) {
            console.log("ERR: Missing module name");
            this.help();
            return;
         }
         // Retrieve the project name:
         var data = fs.readFileSync('src/build.xml', encoding="utf8");
         
         var parser = new xml2js.Parser();
         parser.addListener('end', function(result) {
            var projectName = result["@"]["name"];
            yproject.copyDirSyncRecursive( __dirname+'/../templates/widget', 'src/'+moduleName, {projectName: projectName, moduleName: moduleName});
            
            console.log("Done !");
            console.log("Now edit the build.properties file to set the correct path to the builder");
            
         });
         parser.parseString(data);
         
      },
      
      /**
       * Create command to create a module from templates/module
       */
      module: function(arglist) {
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
      },
      
      help: function(arglist) {
         console.log("Usage:");
         console.log("\t'yproject create myproject'\tCreate a project from scratch");
         console.log("\t'yproject module mymodule' \tAdd a module to the current project");
         console.log("\t'yproject widget my-widget'\tAdd a widget module to the current project");
      }
      
   },

   /**
    * Retrieve the project config, if it exists
    */
   getProjectConfig: function () {
      var config;

      try {
         config = fs.readFileSync('package.json', encoding="utf8");
         config = JSON.parse(config);
      }
      catch (e) {
         console.log('Error reading project config... continue anyway');
         config = {};
      }

      return config;
   },
   
   copyDirSyncRecursive: function(sourceDir, newLocation, locals) {

      var checkDir = fs.statSync(sourceDir);
   
      var newDirLocation = newLocation;
      for(var k in locals) {
         newDirLocation = newDirLocation.replace(k,locals[k]);
      }
      
      fs.mkdirSync(newDirLocation, checkDir.mode);
      console.log("Create "+newDirLocation);

      var files = fs.readdirSync(sourceDir);

      for(var i = 0; i < files.length; i++) {
         var currFile = fs.statSync(sourceDir + "/" + files[i]);
         
         var origFile = sourceDir + "/" + files[i];

           if(currFile.isDirectory()) {
               this.copyDirSyncRecursive(origFile, newDirLocation + "/" + files[i], locals);
           } else {
               var tpl = fs.readFileSync(origFile, encoding="utf8");
   
               var contents = ejs.render(tpl,{locals:locals   });
   
               var fName = files[i];
               for(var k in locals) {
                  fName = fName.replace(k,locals[k]);
               }
               var f = newDirLocation + "/" + fName;
               fs.writeFileSync(f, contents, encoding="utf8");
               console.log("Created "+f);
          }
       }
   }
   
};


while (arg = argv.shift()) {
  if (!key && (arg.match(/^-+[h?]$/i) || arg.match(/^-+help$/i))) arg = "--usage";
  if (!command && (yproject.commands.hasOwnProperty(arg))) {
    if (key) {
      conf[key] = true;
      key = null;
    }
    command = arg;
  } else if (!flagsDone && arg.substr(0, 2) === "--") {
    if (key) conf[key] = true;
    key = arg.substr(2);
    if (key === "usage") conf[key] = true, key = null;
    flagsDone = (key === "");
  } else if (key) {
    conf[key] = arg;
    key = null;
  } else arglist.push(arg);
}
if (key) conf[key] = true;

process.on("uncaughtException", function(e) {
   console.log("A bad exception occured :");
   console.trace();
   console.log(e);
});

if (!command) conf.usage = true;

if (conf.usage && command !== "help") {
  arglist.unshift(command)
  command = "help"
}

yproject.commands[command](arglist);
