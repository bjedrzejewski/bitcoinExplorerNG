
angular.module('bitcoinControllers', [])
    .controller('BitcoinListCtrl', ['BitcoinBlock', 'LastBlockHash', function (BitcoinBlock, LastBlockHash) {
        var that = this;
        that.blocks = [];

        LastBlockHash.get({}, function (json) {
            var lengthLimit = 10;
            blockRetriever(json.lastblockhash, that.blocks, lengthLimit);
        });

        var blockRetriever = function (hash, arr, lengthLimit) {
            BitcoinBlock.get({hashValue: hash}, function (bitcoinBlock) {
                arr.push(bitcoinBlock);
                if (arr.length < lengthLimit) {
                    blockRetriever(bitcoinBlock.previousblockhash, arr, lengthLimit)
                }
            });
        }

    }]).controller('BitcoinDetailsCtrl', ['$routeParams', 'BitcoinBlock', function ($routeParams, BitcoinBlock) {
        var that = this;
        this.block = {};

        BitcoinBlock.get({hashValue: $routeParams.hash}, function (bitcoinBlock) {
            that.block = bitcoinBlock;
        });

    }]).controller('BitcoinSearchCtrl', ['$routeParams', '$location', function ($routeParams, $location) {
        var that = this;
        this.target = '';

        this.navigate = function(){
            console.log('Navigating to '+that.target);
            $location.path('/block/'+that.target);
        }


    }]);