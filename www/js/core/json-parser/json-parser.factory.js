/**
 * JSON Parser Angular Octopus.
 *
 * @param {type} angular
 * @author Jose Figueruela <jfigueruela@gmail.com>
 * @since v0.0.1 20160617
 */

(function () {
  define([
    './json-parser.module'
  ], function (moduleName) {
    'use strict';

    angular.module(moduleName).factory('JsonParserFactory', JsonParserFactory);

    /* @ngInject */
    function JsonParserFactory() {

      var factory = this;

      // API Factory
      factory.parseWorkflow = parseWorkflow;

      function parseWorkflow(workflow) {
        var result = {
          data: [],
          positions: [],
          connections: []
        };

        result.data.push({"name": "start", "size": 20});
        angular.forEach(workflow.containers, function (container, i) {
          result.data.push({'name': container, "size": 10});
        });
        result.data.push({"name": "end", "size": 20});

        result.positions.push({'name': 'start', 'x': 10, 'y': 1, size: 5});
        angular.forEach(workflow.containers, function (container, i) {
          result.positions.push({'name': container, "x": 10, "y": 10 * (i + 1), size: i});
        });
        result.positions.push({'name': 'end', 'x': 10, 'y': result.positions.length * 10, size: 5});

        angular.forEach(workflow.connections, function (connector, i) {
          result.connections.push({'source': connector[0], 'target': connector[1]});
        });

        console.log(result)
        return result;
      }

      return factory;
    }
  });
})();
