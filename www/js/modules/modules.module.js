/**
 * Widgets module AngularJS configuration.
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
    return ng.module('app.modules', [
        'app.module.d3', 'app.module.home'
    ]);
  });
})();
