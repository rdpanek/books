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
    $scope.options = {
        predicate: 'title', 
        type: {
            book: true,
            movie: false
        },
        typeFilter: ''
    }
    if( $scope.options.type.book === true ) {
        $scope.options.typeFilter = "book";
    } else {
        $scope.options.typeFilter = "movie";
    }
    $scope.setTypeFilter = function(type){
        $scope.options.typeFilter = type;
    
        if( type == "book" ) {
            $scope.options.type.book = true;
            $scope.options.type.movie = false;
        } else {
            $scope.options.type.book = false;
            $scope.options.type.movie = true;
        }
    }   
};

// Pridani nove knihy
function NewCtrl($scope, $location, Book) {
    $scope.book = {type:"movie"};
    $scope.create = function() {
        Book.create($scope.book, function(){
            $location.path('/books');
        });
    }
    $scope.close = function() {
        $location.path('/books');
    }
}