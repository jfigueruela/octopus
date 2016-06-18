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
    function HomeController($scope, $log, HomeFactory, GoFactory, JsonParserFactory) {
      var vm = this;
      GoFactory.init("myDiagramDiv");
      GoFactory.load();
    }
  });
})();
