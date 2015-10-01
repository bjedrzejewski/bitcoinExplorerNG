//var bitcoinControllers = angular.module('bitcoinControllers', []);

//bitcoinControllers.controller('BitcoinBlockCtrl', ['$scope', 'BitcoinBlock', function ($scope, BitcoinBlock) {
angular.module('bitcoinControllers', [])
    .controller('BitcoinDetailsCtrl', ['$scope', 'BitcoinBlock', 'LastBlockHash', function ($scope, BitcoinBlock, LastBlockHash) {
        var that = this;

        that.blocks = [];

        LastBlockHash.get({hashValue: '00000000000000000138bfc87bc7fdcfa4b6e7303c92e9b8ce67f934578c3601'}, function (json) {
            var lengthLimit = 10;
            blockRetriever(json.lastblockhash, that.blocks, lengthLimit);
        });

        var blockRetriever = function(hash, arr, lengthLimit){
            BitcoinBlock.get({hashValue: hash}, function (bitcoinBlock) {
                console.log(bitcoinBlock);
                arr.push(bitcoinBlock);
                if(arr.length < lengthLimit){
                    blockRetriever(bitcoinBlock.previousblockhash, arr, lengthLimit)
                }
            });
        }


    }]);