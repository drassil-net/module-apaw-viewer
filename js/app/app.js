(function() {
  'use strict';

  var app = angular.module('apawviewer', ['ui.router', 'ui.bootstrap', 'chieffancypants.loadingBar', 'ngAnimate', 'tableSort']);

  app.controller('mainController', function($rootScope, $scope, $http, $stateParams, $location) {

    $scope.normalizeColName = function(str) {
      var ret= str.charAt(0).toUpperCase() + str.substring(1);
      return ret.replace(new RegExp('_', 'g'), ' ');
    };

    $scope.classes = function(column) {

      var cssClass = "";

      switch (column) {
        case 0:
          cssClass = "text-danger";
          break;
        case 1:
          cssClass = "text-primary";
          break;
        case 2:
          cssClass = "text-warning";
          break;
        case 3:
          cssClass = "text-info";
          break;
        default:
          cssClass = "text-success";
          break;
      }

      return cssClass;
    };

    $rootScope.route = $stateParams.route == null ? '' : $stateParams.route;
    $rootScope.from = $stateParams.from == null ? 0 : $stateParams.from;
    $rootScope.search = $stateParams.search == null ? '' : $stateParams.search;

    $rootScope.multiple_result = true;
    var baseUrl= $location.$$absUrl;
    
    $http.get("js/app/config/"+$rootScope.route+'.json').success(function(data, status, header, config) {
        $rootScope.title= data.title;
    });

    /* Retrieve table content */
    $http.get(app.api + $rootScope.route.replace(/-/g, "/") + "?from=" + $rootScope.from + "&search=" + $rootScope.search)
      .success(function(data, status, header, config) {
        if (Array.isArray(data)) {
          $scope.result = data;
          $rootScope.multiple_result = true;
        } else {
          $scope.result = [data];
          $rootScope.multiple_result = false;
        }
      })
      .error(function(data, status, header, config) {
        console.log("[ERROR] $http.get request failed!");
      });

  });

}());
