#!/bin/sh

YPROJECT_JARS=/usr/local/lib/node/.npm/yproject/active/package/lib/java

java -jar $YPROJECT_JARS/yuitest-coverage.jar -d -o ../tests/instrumented ../build
