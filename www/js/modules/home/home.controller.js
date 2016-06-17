/**
 * Home controller.
 *
 * @param {type} angular
 * @author Jose Figueruela <jfigueruela@gmail.com>
 * @since v0.0.1 20160617
 */

(function () {
  define([
    './home.module'
  ], function (moduleName) {
    'use strict';

    angular.module(moduleName).controller('HomeController', HomeController);

    /* @ngInject */
    function HomeController($scope, $log, HomeFactory, D3Factory) {
      var vm = this;
      activate();
      function activate() {
        console.log(HomeFactory.getWorkflowInput())
        console.log(HomeFactory.getTransactions());
      }

    }
  });
})();
