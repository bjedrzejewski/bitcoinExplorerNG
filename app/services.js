'use strict';

/* Services */

var bitcoinServices = angular.module('bitcoinServices', ['ngResource']);

bitcoinServices.factory('BitcoinBlock', ['$resource',
    function ($resource) {
        return $resource('https://blockexplorer.com/api/block/:hashValue.json', {}, {
            query: {method: 'GET', params: {hashValue: 'hashValue'}, isArray: false}
        });
    }]);


bitcoinServices.factory('LastBlockHash', ['$resource',
    function ($resource) {
        return $resource('https://blockexplorer.com/api/status?q=getLastBlockHash', {}, {
            query: {method: 'GET', params: {}, isArray: false}
        });
    }]);