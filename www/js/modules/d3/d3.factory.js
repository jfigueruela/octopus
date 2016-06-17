/**
 * D3 Angular Octopus core Factory
 * 
 * @param {type} angular
 * @author Jose Figueruela <jfigueruela@gmail.com>
 * @since
 */

(function() {
  define([
    './d3.module'
  ], function(moduleName) {
    'use strict';
    
    angular.module(moduleName).factory('D3Factory', D3Factory);
    
    /* @ngInject */
    function D3Factory() {
      
      var factory = this;
      factory.className = '[D3Factory]';
      
      return factory;
    }
  });
})();
