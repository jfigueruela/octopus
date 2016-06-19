/**
 * D3 Angular Octopus core Module
 *
 * @param {type} angular
 * @returns {angular.module}
 * @author Jose Figueruela <jfigueruela@gmail.com>
 * @since v0.0.1 20160617
 */

(function () {

  define([
    'angular',
    'd3', 'ngD3plus'
  ], function (ng) {
    'use strict';

    var moduleName = 'app.module.d3';
    ng.module(moduleName, []);

    return moduleName;
  });
})();
