#!/bin/sh

# Create the project
yproject mytest

# Create some modules
cd mytest/src

ymodule basic
ymodule dummy --no-assets --no-lang
ymodule myfirstwidget -w

# Build Everything
shifter --walk

# Build the doc
cd ..
yuidoc

# Documentation for the project
selleck --out docs

# Open the home page in a browser
open docs/index.html

# Testing with coverage
#yeti src/*/tests/unit/*.html --server --query 'filter=coverage'
