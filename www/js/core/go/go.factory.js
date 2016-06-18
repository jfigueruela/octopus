/**
 * D3 Angular Octopus core Factory
 *
 * @param {type} angular
 * @author Jose Figueruela <jfigueruela@gmail.com>
 * @since v0.0.1 20160617
 */

(function () {
  define([
    './go.module'
  ], function (moduleName) {
    'use strict';

    angular.module(moduleName).factory('GoFactory', GoFactory);

    /* @ngInject */
    function GoFactory() {

      var factory = this;
      factory.className = '[GoFactory]';


      return factory;
    }
  });
})();
