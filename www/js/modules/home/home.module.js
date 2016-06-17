/**
 * Home Angular module
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

    var moduleName = 'app.module.home';
    ng.module(moduleName, []);

    return moduleName;
  });
})();
