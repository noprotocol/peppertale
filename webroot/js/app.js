(function () {
  'use strict';
  /**
   * Create the app global.
   */
  window.app = angular.module('peppertaleApp', ['ui' , 'ActiveRecord'])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/project.html',
          controller: 'ProjectCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    });
})();