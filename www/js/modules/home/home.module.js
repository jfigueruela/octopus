/**
 * Home Angular module
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
    
    var moduleName = 'app.module.home';
    ng.module(moduleName, []);
    
    return moduleName;
  });
})();
