'use strict';


// Declare app level module which depends on filters, and services
angular.module('books', ['booksServices']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view', {templateUrl: 'partials/view.html', controller: ViewCtrl});
    $routeProvider.when('/new', {templateUrl: 'partials/new.html', controller: NewCtrl});
    $routeProvider.otherwise({redirectTo: '/view'});
  }]);
