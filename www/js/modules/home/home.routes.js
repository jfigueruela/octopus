/**
 * Home routes
 * @param {type} angular
 * @author Jose Figueruela <jfigueruela@gmail.com>
 * @since v0.0.1 20160617
 */

(function () {
  define([
    './home.module', 'text!./home.html'
  ], function (moduleName, homeTemplate) {
    'use strict';

    angular.module(moduleName).config(config);

    /* @ngInject */
    function config($stateProvider) {

      $stateProvider.state('home', {
        url: '/home',
        template: homeTemplate,
        controller: 'HomeController',
        controllerAs: 'homeCtrl',
        // onEnter : /* @ngInject */function() {
        // },
        // resolve : {
        //
        // }

      });

    }
  });
})();
