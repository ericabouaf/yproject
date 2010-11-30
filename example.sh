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
/bin/sh apidoc.sh

# Tests
node gen_tests_xml.js
/bin/sh instrument_code.sh

node server.js

open http://localhost:3000

#/bin/sh selenium_server.sh
#echo "Run the selenium server (cd scripts && ./selenium_server.sh)"
#echo "Run the selenium script (cd scripts && ./selenium.sh)"