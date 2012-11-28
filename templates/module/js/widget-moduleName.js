
/**
 * FIXME: Enter a description for the <%= moduleName %> module
 * @module <%= moduleName %>
 */

/**
 * FIXME: Enter a description for the <%= moduleName.camelize() %> class
 * @class <%= moduleName.camelize() %>
 * @extends Widget
 * @constructor
 */
var <%= moduleName.camelize() %> = Y.Base.create("<%= moduleName.camelize(true) %>", Y.Widget, [/*Y.WidgetParent*/], {

   
   initializer: function() {
      /*
       * initializer is part of the lifecycle introduced by 
       * the Base class. It is invoked during construction,
       * and can be used to setup instance specific state or publish events which
       * require special configuration (if they don't need custom configuration, 
       * events are published lazily only if there are subscribers).
       *
       * It does not need to invoke the superclass initializer. 
       * init() will call initializer() for all classes in the hierarchy.
      */

      // Get localized strings in the current language
      this.resources = Y.Intl.get("<%= moduleName %>");

      /*this.publish("myEvent", {
         defaultFn: this._defMyEventFn,
         bubbles:false
      });*/
   },

   destructor : function() {
      /*
       * destructor is part of the lifecycle introduced by 
       * the Widget class. It is invoked during destruction,
       * and can be used to cleanup instance specific state.
       *
       * Anything under the boundingBox will be cleaned up by the Widget base class
       * We only need to clean up nodes/events attached outside of the bounding Box
       *
       * It does not need to invoke the superclass destructor. 
       * destroy() will call initializer() for all classes in the hierarchy.
       */
   },

   renderUI : function() {
      /*
       * renderUI is part of the lifecycle introduced by the
       * Widget class. Widget's renderer method invokes:
       *
       *     renderUI()
       *     bindUI()
       *     syncUI()
       *
       * renderUI is intended to be used by the Widget subclass
       * to create or insert new elements into the DOM. 
       */

      // this._mynode = Node.create(Y.substitute(<%= moduleName.camelize() %>.MYNODE_TEMPLATE, {mynodeid: this.get("id") + "_mynode"})); 
   },

   bindUI : function() {
      /*
       * bindUI is intended to be used by the Widget subclass 
       * to bind any event listeners which will drive the Widget UI.
       * 
       * It will generally bind event listeners for attribute change
       * events, to update the state of the rendered UI in response 
       * to attribute value changes, and also attach any DOM events,
       * to activate the UI.
       */
       
      // this.after("attrAChange", this._afterAttrAChange);
   },

   syncUI : function() {
      /*
       * syncUI is intended to be used by the Widget subclass to
       * update the UI to reflect the initial state of the widget,
       * after renderUI. From there, the event listeners we bound above
       * will take over.
       */

      // this._uiSetAttrA(this.get("attrA"));
   } //,

   // Beyond this point is the <%= moduleName.camelize() %> specific application and rendering logic

   // Attribute state supporting methods (see attribute config above) 
  
   /*_defAttrAVal : function() {
      // this.get("id") + "foo";
   },

   _setAttrA : function(attrVal, attrName) {
      // return attrVal.toUpperCase();
   },

   _getAttrA : function(attrVal, attrName) {
      // return attrVal.toUpperCase();
   },

   _validateAttrA : function(attrVal, attrName) {
      // return Lang.isString(attrVal);
   },

   // Listeners, UI update methods

   _afterAttrAChange : function(e) {
      // Listens for changes in state, and asks for a UI update (controller). 

      // this._uiSetAttrA(e.newVal);
   },

   _uiSetAttrA : function(val) {
      // Update the state of attrA in the UI (view) 

      // this._mynode.set("innerHTML", val);
   },

   _defMyEventFn : function(e) {
      // The default behavior for the "myEvent" event.
   }*/

}, {

   //CSS_PREFIX: "<%= moduleName %>",

   ATTRS: {
      
      /*attrA : {
         value: "A",
         valueFn: "_defAttrAVal" ,
         setter: "_setAttrA",
         getter: "_getAttrA",
         validator: "_validateAttrA" ,
         readOnly: true ,
         writeOnce: true,
         lazyAdd: false ,
         broadcast: 1 
      }*/
   }
   
});

Y.<%= moduleName.camelize() %> = <%= moduleName.camelize() %>;
