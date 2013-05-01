'use strict';

var app = angular.module('peppertaleApp', ['ui' , 'ngRecord'])
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
