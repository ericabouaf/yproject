#!/usr/bin/env node

/*jshint node:true*/
"use strict";

var path = require('path');
var yproject = require( path.join(__dirname, '..', 'lib', 'yproject' ) ).yproject;

if (process.argv.length != 3) {
   console.log("Usage:  yproject myproject");
   process.exit(0);
}

var projectName = process.argv[2];
yproject.createProject(projectName);
