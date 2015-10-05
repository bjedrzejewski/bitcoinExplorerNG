/**
 * Created by bjedrzejewski on 05/10/2015.
 */

angular.module('bitcoinControllers', ['ngStorage']).controller('BitcoinDetailsCtrl', ['$routeParams', 'BitcoinBlock', 'BitcoinBlockByHeight', function ($routeParams, BitcoinBlock, BitcoinBlockByHeight) {
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

}]);