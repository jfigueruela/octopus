/**
 * Application structure bootstraping.
 * 
 * @param {type} angular
 * @returns {unresolved}
 * @author Jose Figueruela <jfigueruela@gmail.com>
 * @since
 */
(function() {
  define([
      'angular', 'uiRouter', 'ngSanitize', 'ngAnimate', 'd3',
      // Here application modules index files references for RequireJS.
      './modules/main'
  
  ], function(angular,ngCordova) {
    'use strict';
    var overlookApp = angular.module('app', [
        'ui.router', 'ngSanitize', 'ngAnimate', 'app.modules'
    
    ]);
    overlookApp.config(config);
    
    /* @ngInject */
    function config() {
    }
    
    // Function needed to handle the response to custom URLs.
    
    return overlookApp;
  });
  
})();
