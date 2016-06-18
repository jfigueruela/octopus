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
    function HomeController($scope, $log, HomeFactory, D3Factory, JsonParserFactory) {
      var vm = this;
      activate();
      function activate() {
//        console.log(HomeFactory.getWorkflowInput());
//        console.log(HomeFactory.getTransactions());


        var workFlow = JsonParserFactory.parseWorkflow(HomeFactory.getWorkflowInput());
        // instantiate d3plus

        var visualization = d3plus.viz()
          .container("#home")
          .type("network")
//          .data(workFlow.data)
          .nodes(workFlow.positions)
          .edges(workFlow.connections)
          .edges({"arrows": true})
          .size("value")
//          .font({"size": 10})//to change font size
//          .color("growth")
          .shape("square")
          .id("name")
          .mouse({'click': function (d, viz) {
              console.log();
            }})
          .draw();


      }

    }
  });
})();
