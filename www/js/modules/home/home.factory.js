/**
 * Home Angular Octopus Home Factory.
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

    angular.module(moduleName).factory('HomeFactory', HomeFactory);

    /* @ngInject */
    function HomeFactory(HomeService) {

      var factory = this;

      // API Factory
      factory.getWorkflowInput = getWorkflowInput;
      factory.getTransactions = getTransactions;

      /**
       * Obtains workflow input.
       * @see HomeService.getTransactions
       * @returns {unresolved}
       */
      function getWorkflowInput() {
        return HomeService.getWorkflowInput();
      }
      /**
       * Obtains transactions
       * @see HomeService.getTransactions
       * @returns {unresolved}
       */
      function getTransactions() {
        return HomeService.getTransactions();
      }


      return factory;
    }
  });
})();
