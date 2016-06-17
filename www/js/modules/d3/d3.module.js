/**
 * D3 Angular Octopus core Module
 * 
 * @param {type} angular
 * @returns {angular.module}
 * @author Jose Figueruela <jfigueruela@gmail.com>
 * @since
 */

(function() {
  
  define([
    'angular'
  ], function(ng) {
    'use strict';
    
    var moduleName = 'app.module.d3';
    ng.module(moduleName, []);
    
    return moduleName;
  });
})();
