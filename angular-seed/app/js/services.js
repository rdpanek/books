'use strict';

/* Services */

angular.module('booksServices', ['ngResource'])
    .factory('Book', function($resource){
        return $resource('/v1/api/books/:url', {url:'@url'}, {
            index: {method:'GET', isArray:true},
            create: {method:'POST'},
            update: {method:'PUT'},
            remove: {method:'DELETE'}
    });
});
