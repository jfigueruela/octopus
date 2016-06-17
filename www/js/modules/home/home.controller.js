/**
 * Home controller.
 * 
 * @param {type} angular
 * @author Jose Figueruela <jfigueruela@gmail.com>
 */

(function() {
  define([
    './home.module'
  ], function(moduleName) {
    'use strict';
    
    angular.module(moduleName).controller('HomeController', HomeController);
    
    /* @ngInject */
    function HomeController($scope,$log) {
      var vm = this;
      
      // Controller attributes
      vm.name = d3.version;
      // Public methods
      vm.sayHello = sayHello;
      
      function sayHello(name) {
        console.log("Hello: " + name + " to " + vm.name);
      }
    }
  });
})();
