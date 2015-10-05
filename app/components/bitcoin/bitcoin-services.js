(function() {
    'use strict';

/* Services */

var bitcoinServices = angular.module('bitcoinServices', ['ngResource']);

bitcoinServices.factory('BitcoinBlock', ['$resource',
    function ($resource) {
        return $resource('https://blockexplorer.com/api/block/:hashValue.json', {id: '@hashValue'}, {
            get: {method: 'GET', cache: true}
        });
    }]);

bitcoinServices.factory('BitcoinBlockByHeight', ['$resource',
    function ($resource) {
        return $resource('https://blockexplorer.com/api/block-index/:height.json', {id: '@height'}, {
            get: {method: 'GET', cache: true}
        });
    }]);

bitcoinServices.factory('LastBlockHash', ['$resource',
    function ($resource) {
        return $resource('https://blockexplorer.com/api/status?q=getLastBlockHash', {}, {
            get: {method: 'GET'}
        });
    }]);

})();