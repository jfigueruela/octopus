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
//        var mockWorkflow = {
//          "containers": [
//            "b1", "b2", "d1", "b3", "b4",
//          ],
//          "connections": [
//            ["start", "b1"], ["b1", "b2"], ["b2", "d1"], ["d1", "b3"], ["d1", "b4"], ["b3", "end"], ["b4", "end"]
//          ]
//        }
//        return mockWorkflow;

        return 	{"class": "go.GraphLinksModel",
          "nodeDataArray": [
            {"category": "Start", "text": "Start", "key": -1, "loc": "-86 -319"},
            {"text": "B1", "key": -2, "loc": "-86 -233"},
            {"text": "B2", "key": -3, "loc": "-86 -150"},
            {"text": "D1", "figure": "Diamond", "key": -4, "loc": "-86 -57"},
            {"text": "B3", "key": -5, "loc": "-218 43"},
            {"text": "B4", "key": -6, "loc": "35 41"},
            {"category": "End", "text": "End", "key": -7, "loc": "-85 218"}
          ],
          "linkDataArray": [
            {"from": -1, "to": -2, "points": [-86, -294.23282552319904, -86, -284.23282552319904, -86,
                -271.8342632559843, -86, -271.8342632559843, -86, -259.43570098876955, -86, -249.43570098876953]},
            {"from": -2, "to": -3, "points": [-86, -216.56429901123045, -86, -206.56429901123045, -86, -191.5, -86,
                -191.5, -86, -176.43570098876953, -86, -166.43570098876953]},
            {"from": -3, "to": -4, "points": [-86, -133.56429901123045, -86, -123.56429901123045, -86,
                -111.46785049438475, -86, -111.46785049438475, -86, -99.37140197753907, -86, -89.37140197753907]},
            {"from": -4, "to": -5, "visible": true, "points": [-121.23538208007812, -57, -131.23538208007812, -57,
                -160.68384552001953, -57, -160.68384552001953, 43, -190.13230895996094, 43, -200.13230895996094, 43],
              "text": ""},
            {"from": -4, "to": -6, "visible": true, "points": [-50.764617919921875, -57, -40.764617919921875, -57,
                -16.81615447998047, -57, -16.81615447998047, 41, 7.1323089599609375, 41, 17.132308959960938, 41],
              "text": ""},
            {"from": -6, "to": -7, "points": [35, 57.43570098876953, 35, 67.43570098876953, 35, 127.40940312230309,
                -85, 127.40940312230309, -85, 187.38310525583665, -85, 197.38310525583665]},
            {"from": -5, "to": -7, "points": [-218, 59.43570098876953, -218, 69.43570098876953, -218,
                128.4094031223031, -85, 128.4094031223031, -85, 187.38310525583665, -85, 197.38310525583665]}
          ]}
      }

      /**
       * Gets mocked transactions.
       */
      function getTransactions() {
        // TODO @jfigueruela: here future backend service connection.
        var mockTransactionsArray = [];
        mockTransactionsArray.push({"amount": "10", "message": "OK", "status": "SUCCESS",
          "currency": "GBP", "country": "GB", "steps": ["start", "B1", "B2", "D1", "B3", "end"
          ]
        });
        mockTransactionsArray.push({"amount": "45", "message": "wrong card number", "status": "ERROR",
          "currency": "EUR", "country": "GB", "steps": ["start", "B1", "B2", "D1", "B4", "end"]});

        return mockTransactionsArray;

      }
      return service;
    }
  });
})();
