#!/usr/bin/env node

/*jshint node:true*/
"use strict";

var fs = require("fs"),
    ejs = require('ejs'),
    optimist = require('optimist');

var argv = optimist
    .usage('Create a YUI module or add missing directories')
    .options('f', {
        'alias' : 'file',
        'default' : 'test.js',
        'describe': 'file to execute in a node spawed process'
    })
    .options('d', {
        'alias' : 'demo',
        'default' : 'awesome',
        'describe': 'Here a small description'
    })
    .options('h', {
        'alias' : 'help',
        'describe': 'show this help'
    })
    .argv;


if (argv.help) {
    optimist.showHelp();
    process.exit(0);
}


if (argv._.length > 0) {
    // We are creating a module !
    console.log("TODO: create modules ", argv._);
}
else {
    // not creating a module
    console.log("TODO: try to check if we are within a YUI module");
    console.log("THEN, apply these options to the current module", argv);
}

// ymodule XXXX

// TODO: use optimist
// TODO: make lang optionnal
// TODO: make assets -
// TODO: make docs
// TODO: make tests

// TODO: recursive 

// cd XXXX
// ymodule --docs
// ymodule --tests