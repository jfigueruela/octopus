/**
 * Main application required dependencies.
 *
 * @author Jose Figueruela <jfigueruela@gmail.com>
 * @since v0.0.1 20160617
 */
(function () {
  // Hook to insert paths by a gulp task
  var paths;
  paths = {
    'angular': '../lib/angular/angular',
    'ngAnimate': '../lib/angular-animate/angular-animate.min',
    'ngSanitize': '../lib/angular-sanitize/angular-sanitize.min',
    'uiRouter': '../lib/angular-ui-router/release/angular-ui-router',
    'text': '../lib/requirejs-text/text',
    'd3': '../lib/d3/d3.min',
    'angularjs-nvd3-directives': '../lib/angularjs-nvd3-directives/dist/angularjs-nvd3-directives.min'
  }

  require.config({
    paths: paths,
    shim: {
      angular: {
        exports: 'angular'
      },
      ngAnimate: [
        'angular'
      ],
      ngSanitize: [
        'angular'
      ],
      uiRouter: [
        'angular'
      ]
        // ,
        // d3 : [
        // 'angular'
        // ],
    },
    priority: [
      'angular'
    ]
  });
  require([
    'angular', 'app'
  ], function (angular, app) {
    'use strict';
    app.run(run);
    angular.element(document).ready(function () {

      angular.bootstrap(document.body, [
        'app'
      ]);

    });
    /* @ngInject */
    function run($state) {
      $state.go('home');
    }
  });
})();
