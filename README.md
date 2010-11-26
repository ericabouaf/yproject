# yproject

yproject is a command-line utility to scaffold projects and components using the [YUI Build Tool](http://yuilibrary.com/projects/builder)

YUI Builder contains the component build tool, which is the ANT based build system YUI uses to generate the code in the YUI 2 and YUI 3 build directories, from the contents of the src directories for each component.

yproject contains a project template and a module template to quickly bootstrap your project.

## Features

 * command to create a project
 * command to add a new module
 * script to generate the API documentation using YUIdoc
 * default loader module to generate the YUI3 modules metadata

## Installation

    npm install yproject

## Usage

### Create a new project

    yproject create myproject
    
This will create the following structure :

    myproject/
       api/
       build/
       lib/
       README.md/
       scripts/
       src/
          loader/

### Adding a module

Go to your project directory and type :

    yproject module mymodule 

This will create the following structure in src/ :

    mymodule/
       build.xml
       build.properties
       src/
          mymodule.js
       tests/
          index.html

### Building

You will need the [YUI Build Tool](http://yuilibrary.com/projects/builder) (which itself requires java & ant)

To build a specific module :

    cd src/mymodule
    ant all

To build all modules :

    cd src
    ant all

### Default loader module

A special module is created when you create a new project (ex: "myproject-loader"), which adds your module definitions to the YUI loader utility.

The YUI 3 component uses a [python script](https://github.com/yui/yui3/blob/master/src/loader/meta_join.py) to generate the JSON metadata from the src/*/meta/*.json files. 

However, I noticed that in most projects or librairies, we can generate directly generate this JSON from the build.properties file.

The generated module contains a meta_join.ssjs script, which is called by the build.xml file.
It requires node.js.

(Note: the ssjs extension is to prevent YUI Doc to include this file in the API documentation)

### Documentation

To build the documentation, you will need [YUI Doc](http://developer.yahoo.com/yui/yuidoc/)

A script is installed into the project directory (scripts/apidoc.sh)

 * it expects YUI Doc to be found at the same directory level as your project.
 * it defaults to the "Dana" theme template, also expected at the same directory level

You can change those, as well as other options (such as the project's version, name, url, ...) by editing the scripts/apidoc.sh file.

(Note: I suggest you use the webpro fork of the Dana theme, which fixes some bugs https://github.com/webpro/yuidoc-theme-dana )

(Note: make sure that the template directory isn't a git repository, because YUI Doc doesn't like that. rm -rf .git)

## Full example


    # Create the project
    yproject create mytest
    cd mytest
    
    # Create some modules
    yproject module hellomodule
    yproject module dummy
    
    # Build Everything
    cd src
    ant all

    # Build the doc (don't forget to clean before to remove build_tmp files)
    ant clean
    cd ..
    cd scripts
    chmod u+x apidoc.sh
    ./apidoc.sh
    
    

## TODO

 * YUItest instrumentation script
 * selenium scripts to launch the tests    
 
 