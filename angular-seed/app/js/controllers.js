'use strict';

/* Controllers */


//seznam vsech stranek
function ViewCtrl($scope, $location, Book) {
    $scope.books = Book.index();
    $scope.remove = function(url) {
		Book.remove({url:url}, function(){
            $location.path('/books');
        });
	}
}

// Pridani nove knihy
function NewCtrl($scope, $location, Book) {
    $scope.book = {};
    $scope.create = function() {
        Book.create($scope.book, function(){
            $location.path('/books');
        });
    }
    $scope.close = function() {
        $location.path('/books');
    }
}