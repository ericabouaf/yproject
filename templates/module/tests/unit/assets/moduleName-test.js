
YUI.add("<%= moduleName %>-test", function (Y) {

    var suite = new Y.Test.Suite({
        name: "<%= moduleName %> Test Suite"
    }),
        testCase = new Y.Test.Case({

            name: "<%= moduleName %> first test case",
            testGeneration: function () {

                Y.log("test",'debug');

                var instance = new Y.<%= moduleName.camelize() %>({
                });

                Y.Assert.isObject(instance);
        
            }
        });

    suite.add(testCase);
    Y.Test.Runner.add(suite);

}, "", {
    requires: ["test", "<%= moduleName %>"]
});