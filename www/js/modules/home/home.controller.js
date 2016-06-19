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
      // Controller API
      vm.diagramDivId = "myDiagramDiv";
      vm.loadWorkFlow = loadWorkFlow;
      vm.exportWorkFlow = exportWorkFlow;
      vm.renderTransaction = renderTransaction;
      vm.cleanTransaction = cleanTransaction;
      // Controller Public attibutes.
      vm.workFlowJSON;
      vm.transactionResult = null;
      activate();
      /**
       * Controller activation.
       * @returns {undefined}
       */
      function activate() {
        GoFactory.init(vm.diagramDivId);
        vm.transactions = HomeFactory.getTransactions()
      }

      /**
       * Load workflow action.
       * @returns {undefined}
       */
      function loadWorkFlow() {
        GoFactory.load(HomeFactory.getWorkflowInput());
      }

      /**
       * Exports workflow action.
       * @returns {undefined}
       */
      function exportWorkFlow() {
        vm.workFlowJSON = GoFactory.exportWorkFlow();
      }

      /**
       * View transaction action.
       * @param {type} transaction
       * @returns {undefined}
       */
      function renderTransaction(transaction) {
        vm.transactionResult = GoFactory.renderTransactionInWorkFlow(transaction);
      }

      function cleanTransaction() {
        GoFactory.cleanTransaction();
        vm.transactionResult = null;
      }
    }
  });
})();
