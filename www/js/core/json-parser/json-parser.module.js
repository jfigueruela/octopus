/**
 * JSON Parser module AngularJS configuration.
 *
 * @param {type} angular
 * @returns {angular.module}
 * @author Jose Figueruela <jfigueruela@gmail.com>
 * @since v0.0.1 20160617
 */

(function () {

  define([
    'angular'
  ], function (ng) {
    'use strict';

    var moduleName = 'app.core.jsonParser';
    ng.module(moduleName, []);

    return moduleName;
  });
})();
