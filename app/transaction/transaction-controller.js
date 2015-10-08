/**
 * Created by bjedrzejewski on 05/10/2015.
 */

angular.module('bitcoinTransactionControllers', ['txDirectives']).controller('TransactionCtrl', ['$routeParams', 'TxData', function ($routeParams, TxData) {
    var that = this;
    this.nodes = [];
    this.links = [];

    that.rparam = $routeParams.hash;
    that.reqFail = false;
    //unexpanded nodes - 2 arrays for processing
    that.uNodes = [];
    that.newUNodes = [];

    //function that expands and updates nodes
    that.expandNodes = function () {
        //needs handling for this being repeatedly called
        that.uNodes = that.newUNodes;
        that.newUNodes = [];
        for (var i = 0; i < that.uNodes.length; i++) {
            //coinbase existing means the end, so should stop looking
            if (that.uNodes[i].vin && !that.uNodes[i].vin[0].coinbase) {
                //iterating via transaction
                for (var j = 0; j < that.uNodes[i].vin.length; j++) {
                    //I need immediate function to create a closure and get i and j stored
                    (function () {
                        var _i = i;
                        var _j = j;
                        TxData.get({hashValue: that.uNodes[_i].vin[_j].txid}, function (newTx) {
                            var thisNumber = that.nodes.length;
                            var originNumber = that.uNodes[_i].oNumber;
                            newTx.oNumber = thisNumber;
                            that.links.push({'target': newTx.oNumber, 'source': that.uNodes[_i].oNumber});
                            that.nodes.push(newTx);
                            that.newUNodes.push(newTx);


                        }, function (errorResult) {
                            console.log('error: ' + errorResult);
                        });
                    }());
                }
            }
        }
    }

    if (that.rparam.length === 64) {
        TxData.get({hashValue: that.rparam}, function (tx) {
            that.tx = tx;
            that.tx.oNumber = 0;
            that.nodes.push({});
            that.newUNodes.push(tx);
        }, function (errorResult) {
            that.reqFail = true;
        });
    } else {
        that.reqFail = true;
    }

}]);