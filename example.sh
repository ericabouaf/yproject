#!/bin/sh

# remove previous test
rm -rf mytest

# Create the project
yproject mytest

# Create some modules
cd mytest

ymodule basic
ymodule dummy --no-assets --no-lang
ymodule myfirstwidget -w

# Build Everything
cd src
shifter --walk
cd ..

# Build the doc (will read yuidoc.json)
yuidoc

# Documentation for the project
selleck --out docs

# Open the home page in a browser
open docs/index.html

# Testing with coverage
#yeti src/*/tests/unit/*.html --server --query 'filter=coverage'
