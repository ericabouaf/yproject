#!/bin/sh

# Create the project
yproject mytest

# Create some modules
cd mytest/src
ymodule hellomodule dummy

# Build Everything
shifter --walk

# Build the doc
cd ..
yuidoc src

# Documentation for the project
selleck --out docs

# Testing with coverage
yeti src/*/tests/unit/*.html --server --query 'filter=coverage'
