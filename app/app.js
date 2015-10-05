'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['ngRoute', 'bitcoinControllers', 'bitcoinServices', 'myFilters']).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'list/block-list.html',
                controller: 'BitcoinListCtrl',
                controllerAs: 'blockCtrl'
            }).
            when('/block/:hash', {
                templateUrl: 'detail/block-details.html',
                controller: 'BitcoinDetailsCtrl',
                controllerAs: 'bitcoinDetailsCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);
