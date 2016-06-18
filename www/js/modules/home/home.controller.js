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
    function HomeController(HomeFactory, GoFactory) {
      var vm = this;
      vm.diagramDivId = "myDiagramDiv";
      vm.loadWorkFlow = loadWorkFlow;

      activate();
      /**
       * Controller activation.
       * @returns {undefined}
       */
      function activate() {
        GoFactory.init(vm.diagramDivId);
      }

      /**
       * Load workflow action.
       * @returns {undefined}
       */
      function loadWorkFlow() {
        GoFactory.load(HomeFactory.getWorkflowInput());
      }
    }
  });
})();
