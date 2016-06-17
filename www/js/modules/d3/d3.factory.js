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
      factory.render = render;
      factory.test1 = test1;
      factory.test2 = test2;

      function render(dataIn) {
        // d3.select('body')
        // .append('h1')
        // .text('Hello World! tika!')
        d3.select('body').selectAll('#div1').data(dataIn).text(function (d) {
          return d;
        });

        d3.selectAll('circle').style('fill', 'teal');

      }

      function test1() {

        d3.select('svg').append('rect').attr({
          x: 10,
          y: 10,
          width: 80,
          height: 80,
          fill: 'red'
        }).transition().delay(500).duration(2000).attr({
          x: 240,
          y: 80,
          width: 60,
          height: 60,
          fill: 'purple'
        }).transition().duration(2000).attr({
          width: 40,
          height: 40,
          x: 460,
          y: 10,
          fill: 'blue'
        });
      }

      function test2() {
        var svg = d3.select('#home').append('svg').attr({
          width: 450,
          height: 450
        });
        var label = svg.append('text').attr('x', 10).attr('y', 30);
        svg.on('mousemove', function () {
          var position = d3.mouse(svg.node());
          label.text('X=' + position[0] + ' , Y=' + position[1]);
        });
      }
      function xloc(d, i) {
        return i * (barWidth + barPadding);
      }
      function yloc(d) {
        return maxValue - d;
      }

      function translator(d, i) {
        return "translate(" + xloc(d, i) + "," + yloc(d) + ")";
      }
      return factory;
    }
  });
})();
