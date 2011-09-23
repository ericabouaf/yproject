#!/bin/sh

YPROJECT_JARS=/usr/local/lib/node/.npm/yproject/active/package/lib/java

LIBS=$YPROJECT_JARS/yuitest-selenium-driver.jar:$YPROJECT_JARS/yuitest-coverage.jar:$YPROJECT_JARS/yuitest-coverage-report.jar:$YPROJECT_JARS/selenium-java-client-driver.jar

java -classpath $LIBS com.yahoo.platform.yuitest.selenium.YUITestSeleniumDriver -v --tests ../tests/tests.xml --browsers *safari --resultsdir ../tests/results --coveragedir ../tests/coverage
