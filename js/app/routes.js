(function () {
  'use strict';

  var app = angular.module('apawviewer');

  app.config(function ($stateProvider, $urlRouterProvider) {

    /* routing */

    // default route
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('home', {
      url: '/',
      templateUrl: 'partials/home.html',
      controller: 'mainController'
    })
    .state('routing', {
      url: '/:route',
      templateUrl: 'partials/home.html',
      controller: 'mainController'
    })
    .state('paging', {
      url: '/:route/:from',
      templateUrl: 'partials/home.html',
      controller: 'mainController'
    })
    .state('search', {
      url: '/:route/:from/:search',
      templateUrl: 'partials/home.html',
      controller: 'mainController'
    });

  });

}());
