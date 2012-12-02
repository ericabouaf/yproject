# yproject

yproject is a command-line utility to scaffold YUI3 projects and modules.

It contains a project template and a module template to quickly bootstrap your project enforcing best practices from the start.


## Installation

    $ [sudo] npm install -g yproject

Or install it as a developer :

    $ git clone git://github.com/neyric/yproject.git
    $ cd yproject
    $ [sudo] npm link


## Usage

### Create a new project

    $ yproject myproject
    
This will create the following structure :

    myproject/
       README.md
       package.json
       yuidoc.json
       src/
          common/
          myproject-loader/


 * yuidoc.json is used to generate the API documentation using yuidocjs
 * src/myproject-loader is a module which will generate a YUI3 seed file for using the YUI3 loader
 * src/common contains a simple documentation template to use with selleck

### Creating a new module

Go to your project directory and type :

    $ ymodule mymodule

This will create the following structure in src/ :

    mymodule/
       build.json
       README.md
       js/
          mymodule.js
       meta/
          mymodule.json


#### Assets

By default, ymodule will also create an 'assets' folder containing a 'sam' skin.

It will also mark the module as skinnable in the meta file.

To disable the assets generation, use the --no-assets (or --no-a) option :

    $ ymodule mymodule --no-assets


#### Docs

By default, ymodule will generate a 'docs' folder containing two pages for the module description and a basic example.

It will later be used by the selleck documentation rendering.

To disable the docs generation, use the --no-docs (or --no-d) option :

    $ ymodule mymodule --no-docs


#### Lang (I18n, intl)

By default, ymodule will create a 'lang' folder containing a 'en' localization file.

It will also require the 'intl' module in the meta file.

To disable it, use the --no-lang (or --no-l) option :

    $ ymodule mymodule --no-lang


#### Tests

By default, ymodule will create a 'tests' folder with a basic test case.

To disable it, use the --no-tests (or --no-t) option :

    $ ymodule mymodule --no-tests


#### Widget

By using the --widget option (or -w), ymodule will use a widget template for the generated javascript file :

    $ ymodule mywidget -w


### Updating an existing module

If you already have a working module, you can add some options to it.

Assuming you have a very basic module 'mymodule', with just the js/, meta/, and build.json files :

    $ cd mymodule
    $ ymodule --no-docs

This command will generate assets/, tests/, and lang/ folders if they don't exist yet.
Il will also add the missing dependencies in the meta.json file.



### Default loader module

A special module is created when you create a new project (ex: "myproject-loader"), which adds your module definitions to the YUI loader utility.

This module is auto-generated, so you won't have to touch anything in it.

You may want to edit the template/meta.js file to tweek some loader options.

This module has to be re-built everytime you add a new module to the project, or when you change a meta file description in any module.

    $ cd src/myproject-loader
    $ shifter



## Building modules

<p>We use <a href="http://davglass.github.com/shifter/">shifter</a> to build YUI modules.</p>

<p>To install shifter :</p>

```terminal
$ [sudo] npm install -g shifter
```

<p>To build the 'container' module :</p>

```terminal
$ cd src/container
$ shifter
```

<p>To build all modules at once :</p>

```terminal
$ cd src
$ shifter --walk
```

## Building user guides and examples pages

<p>We are using <a href="http://rgrove.github.com/selleck/">selleck</a> to build the examples and user guide pages.</p>


<p>To install selleck :</p>

```terminal
$ [sudo] npm install -g selleck
```

<p>To build all docs :</p>

```terminal
$ selleck --out docs
```

## Building the API documentation

<p>The API documentation is build using <a href="https://github.com/yui/yuidoc">YUIDocJS</a>.</p>


<p>To install YUIDocJS :</p>

```terminal
$ [sudo] npm install -g yuidocjs
```

<p>From the main directory, type :</p>

```terminal
$ yuidoc
```

<p>It should generate the doc in the api/ folder.</p>


## How to run the tests

<p>Tests are executed with <a href="https://github.com/yui/yeti">Yeti</a>.</p>


<p>To install Yeti :</p>

```terminal
$ [sudo] npm install -g yeti
```

<p>From the main directory, type :</p>

```terminal
$ yeti src/*/tests/unit/*.html
```

<p>This command creates a one shot server and return you an adress which you have to connect a browser in order to run the tests. You can also invoke the same command with "--server" in order to have a persistent server  </p>

```terminal
$ yeti src/*/tests/unit/*.html --server
```

<p>Testing with coverage :</p>

```terminal
$ yeti src/*/tests/unit/*.html --server --query 'filter=coverage'
```


## Full example

See example.sh to see a complete example

