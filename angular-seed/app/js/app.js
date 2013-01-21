'use strict';

var book = angular.module('books', ['booksServices']); 

// Declare app level module which depends on filters, and services
book.config(function($routeProvider) {
    $routeProvider.when('/view', {templateUrl: 'partials/view.html', controller: ViewCtrl});
    $routeProvider.when('/new', {templateUrl: 'partials/new.html', controller: NewCtrl});
    $routeProvider.otherwise({redirectTo: '/view'});
  });

    
book.config(function($locationProvider) {
  $locationProvider.html5Mode(true)
});