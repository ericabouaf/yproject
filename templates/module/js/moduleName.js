
/**
 * Enter a description for the <%= moduleName %> module
 * @module <%= moduleName %>
 */

/**
 * Enter a description for the <%= moduleName %> class
 * @class <%= moduleName %>
 * @constructor
 */
var <%= moduleName.camelize() %> = function() {};

<%= moduleName.camelize() %>.prototype = {

   /**
    * Just a dummy method
     * @method someFunc
    */
   someFunc: function() {
         return true;
   }
   
};

Y.<%= moduleName.camelize() %> = <%= moduleName.camelize() %>;