# yproject

yproject is a command-line utility to scaffold projects and components using the YUI3 library and the [YUI Build Tool](http://yuilibrary.com/projects/builder)

It contains a project template and a module template to quickly bootstrap your project enforcing best practices from the start.

## Features

 * command to scaffold a project
 * command to scaffold a new module
 * command to scaffold a widget (with intl and skin files)

The generated projects include :

 * default loader module to generate the YUI3 modules metadata with building script
 * development HTTP server using express.js to run tests

Through YUI Builder 

 * ANT based build system YUI uses
 * Declare module dependencies for the YUI loader
 * Code checking with JSlint
 * code & assets minification with YUI Compressor
 
Through YUI Doc

 * Documentation: customizable script to generate the API documentation
 
Through YUI Test

 * Test Driven Development (TDD) : YUI Test, Selenium
 * YUI Test instrumentation script => Test coverage !
 * Selenium scripts to launch the tests
 * easy Continuous Integration with Hudson
 
 * Think there's too much? The generated project is delete-key friendly. :)

## Installation

    npm install yproject

Or install it as a developer :

    git clone git://github.com/neyric/yproject.git
    cd yproject
    npm link .


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
          myproject-loader/

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

### Adding a widget

Go to your project directory and type :

    yproject widget my-widget

This will create the following structure in src/ :

    my-widget/
       assets/
          my-widget-core.css
          skins/
             sam/
                my-widget-skin.css
       build.xml
       build.properties
       lang/
          my-widget.js
          my-widget_fr.js
       src/
          my-widget.js
       tests/
          index.html

The generated widget is skinable and internationalizable by default.

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


### Local server

    cd scripts
    node server.js

### Testing

If you're not familiar with YUI Test, I suggest you take a look at those videos :

 * http://developer.yahoo.com/yui/theater/video.php?v=adams-yuiconf2009-testing
 * http://developer.yahoo.com/yui/theater/video.php?v=yuiconf2010-yuitest

YUI Test

 * Write Tests using YUI test. 
 * The generated modules contains a default test, which uses the instrumented code

Selenium

 * run scripts/gen_tests_xml.js => generates the tests.xml file to launch selenium tests
 * Automatically save test results


## Full example

See example.sh to see a complete example

