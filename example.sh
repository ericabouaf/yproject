#!/bin/sh

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