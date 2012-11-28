#!/usr/bin/env node

/*jshint node:true*/
"use strict";

var path = require('path');
var yproject = require( path.join(__dirname, '..', 'lib', 'yproject' ) ).yproject;

var optimist = require('optimist');

var argv = optimist
    .usage('Create a YUI module or add missing directories')
    .options('a', {
        'alias' : 'assets',
        'default' : true,
        'describe': 'create the assets/ directory, and make module skinnable'
    })
    .options('d', {
        'alias' : 'docs',
        'default' : true,
        'describe': 'create the docs/ directory for selleck'
    })
    .options('l', {
        'alias' : 'lang',
        'default' : true,
        'describe': 'create the lang/ directory, and add module meta for intl'
    })
    .options('t', {
        'alias' : 'tests',
        'default' : true,
        'describe': 'create the tests/ directory if true'
    })
    .options('w', {
        'alias' : 'widget',
        'default' : false,
        'describe': 'use the widget template for the js file'
    })
    .options('h', {
        'alias' : 'help',
        'describe': 'show this help'
    })
    .argv;

// TODO: add an option --jsstamp (true by default)
//       if false, render the template with the YUI.add statement + "shifter": {"jsstamp": false } in build.json

if (argv.help) {
    optimist.showHelp();
    process.exit(0);
}


if (argv._.length > 0) {
    // We are creating a module !
    
    for (var i = 0; i < argv._.length; i++) {
        var moduleName = argv._[i];
        yproject.createModule(moduleName, argv);
    }

}
else {
    // TODO: existing module
    // not creating a module
    console.log("TODO: try to check if we are within a YUI module (if we have a build.json file)");
    console.log("THEN, apply these options to the current module", argv);
}
