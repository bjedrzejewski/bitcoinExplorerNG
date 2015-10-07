'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['ngRoute', 'bitcoinControllers', 'bitcoinTransactionControllers', 'bitcoinDetailsControllers', 'bitcoinServices', 'myFilters', 'blockListDirectives']).
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
            when('/tx/:hash', {
                templateUrl: 'transaction/transaction-view.html',
                controller: 'TransactionCtrl',
                controllerAs: 'txCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }])//;

//angular.module('myAppTest', [])
    .controller('test', function() {
        this.hello = 'world';
    });
