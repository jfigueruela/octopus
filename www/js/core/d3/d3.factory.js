/**
 * D3 Angular Octopus core Factory
 *
 * @param {type} angular
 * @author Jose Figueruela <jfigueruela@gmail.com>
 * @since v0.0.1 20160617
 */

(function () {
  define([
    './d3.module'
  ], function (moduleName) {
    'use strict';

    angular.module(moduleName).factory('D3Factory', D3Factory);

    /* @ngInject */
    function D3Factory() {

      var factory = this;
      factory.className = '[D3Factory]';

      // API Factory
      factory.renderWorkflow = renderWorkflow;

      /**
       *
       * @param {type} workflow
       * @returns {undefined}
       */
      function renderWorkflow(workflow) {

      }
      return factory;
    }
  });
})();
