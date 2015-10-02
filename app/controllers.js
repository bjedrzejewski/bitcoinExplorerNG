angular.module('bitcoinControllers', [])
    .controller('BitcoinListCtrl', ['BitcoinBlock', 'LastBlockHash', function (BitcoinBlock, LastBlockHash) {
        var that = this;
        that.blocks = [];
        that.lengthOptions = [
            10,12,24,48
        ];
        that.progressValue = 0;

        this.loadVals = function(){LastBlockHash.get({}, function (json) {
            that.blocks = [];
            that.blockRetriever(json.lastblockhash, that.blocks, that.lengthLimit);
        })};

        this.loadVals();

        this.showPrevious = function () {
            var lastBlock = that.blocks[that.blocks.length - 1].hash;
            that.blocks = [];
            that.blockRetriever(lastBlock, that.blocks, that.lengthLimit);
        }

        this.blockRetriever = function (hash, arr, lengthLimit) {
            BitcoinBlock.get({hashValue: hash}, function (bitcoinBlock) {
                arr.push(bitcoinBlock);
                if (arr.length < lengthLimit) {
                    that.progressValue = 100 * (arr.length / lengthLimit);
                    that.blockRetriever(bitcoinBlock.previousblockhash, arr, lengthLimit)
                } else {
                    that.progressValue = 100;
                }
            });
        }

    }]).controller('BitcoinDetailsCtrl', ['$routeParams', 'BitcoinBlock', 'BitcoinBlockByHeight', function ($routeParams, BitcoinBlock, BitcoinBlockByHeight) {
        var that = this;
        that.rparam = $routeParams.hash;
        that.reqFail = false;


        if (that.rparam.length === 64) {
            BitcoinBlock.get({hashValue: that.rparam}, function (bitcoinBlock) {
                that.block = bitcoinBlock;
            }, function (errorResult) {
                that.reqFail = true;
            });
        } else {
            BitcoinBlockByHeight.get({height: that.rparam}, function (json) {
                that.rparam = json.blockHash;
                BitcoinBlock.get({hashValue: that.rparam}, function (bitcoinBlock) {
                    that.block = bitcoinBlock;
                }, function (errorResult) {
                    that.reqFail = true;
                });
            }, function (errorResult) {
                that.reqFail = true;
            });
        }

    }]).controller('BitcoinSearchCtrl', ['$routeParams', '$location', function ($routeParams, $location) {
        var that = this;
        this.target = '';

        this.navigate = function () {
            console.log('Navigating to ' + that.target);
            $location.path('/block/' + that.target);
        }


    }]);