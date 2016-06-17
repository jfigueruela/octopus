/**
 * Home Angular Octopus Home Service.
 * @param {type} angular
 * @author Jose Figueruela <jfigueruela@gmail.com>
 * @since v0.0.1 20160617
 */

(function () {
  define([
    './home.module'
  ], function (moduleName) {
    'use strict';

    angular.module(moduleName).service('HomeService', HomeService);

    /* @ngInject */
    function HomeService($log) {
      var service = this;

      // Service API
      service.getWorkflowInput = getWorkflowInput;
      service.getTransactions = getTransactions;

      /**
       * Gets mocked input wotkflow
       */
      function getWorkflowInput() {
        // TODO @jfigueruela: here future backend service connection.
        var mockWorkflow = {
          "containers": [
            "b1", "b2", "b3", "b4", "d1"
          ],
          "connections": [
            [
              "start", "b1"
            ], [
              "b1", "b2"
            ], [
              "b2", "d1"
            ], [
              "d1", "b3"
            ], [
              "d1", "b4"
            ], [
              "b3", "end"
            ], [
              "b4", "end"
            ]
          ]
        }
        return mockWorkflow;
      }

      /**
       * Gets mocked transactions.
       */
      function getTransactions() {
        // TODO @jfigueruela: here future backend service connection.
        var mockTransactionsArray = [];
        mockTransactionsArray.push({"amount": "10", "message": "OK", "status": "SUCCESS",
          "currency": "GBP", "country": "GB", "steps": ["start", "b1", "b2", "d1", "b3", "end"
          ]
        });
        mockTransactionsArray.push({"amount": "45", "message": "wrong card number", "status": "ERROR",
          "currency": "EUR", "country": "GB", "steps": ["start", "b1", "b2", "d1", "b4", "end"]});

        return mockTransactionsArray;
      }
      return service;
    }
  });
})();
