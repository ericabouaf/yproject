
/**
 * Enter a description for the <%= moduleName %> module
 * @module <%= moduleName %>
 */

/**
 * Enter a description for the <%= moduleName %> class
 * @class <%= moduleName %>
 * @constructor
 */
<%= moduleName %> = function() {};

<%= moduleName %>.prototype = {

	/**
	 * Just a dummy method
	 */
	someFunc: function() {
			return true;
	}
	
};

Y.<%= moduleName %> = <%= moduleName %>;