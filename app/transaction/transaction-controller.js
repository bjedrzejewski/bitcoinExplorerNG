/**
 * Created by bjedrzejewski on 05/10/2015.
 */

angular.module('bitcoinTransactionControllers', ['txDirectives']).controller('TransactionCtrl', ['$routeParams', 'TxData', function ($routeParams, TxData) {
    var that = this;
    that.nodes = [];
    that.links = [];

    that.rparam = $routeParams.hash;
    that.reqFail = false;
    //unexpanded nodes - 2 arrays for processing
    that.uNodes = [];
    that.newUNodes = [];
    that.expanding = false;

    that.clickExpand = function (d) {
        if (that.expanding) {
            return;
        }
        that.expanding = true;
        prepareNodesArrays();

        for (var k = 0; k < that.uNodes.length; k++) {
            if (d.txid === that.uNodes[k].txid) {
                expandNode(k, function () {
                    that.expanding = false;
                });
            }
        }
    }

    //function that expands and updates nodes
    function prepareNodesArrays() {
        for (var k = 0; k < that.uNodes.length; ++k) {
            if (!that.uNodes[k].expanded) {
                that.newUNodes.push(that.uNodes[k]);
            }
        }
        that.uNodes = that.newUNodes;
        that.newUNodes = [];
    }

    that.expandNodes = function () {
        //will work because js is single threaded
        if (that.expanding) {
            return;
        }
        that.expanding = true;

        prepareNodesArrays();
        function asyncExpand(i1) {
            if (i1 >= that.uNodes.length) {
                that.expanding = false;
                //finishes
                return;
            } else {
                expandNode(i1, asyncExpand);
            }
        }

        asyncExpand(0);
    }

    that.autoExpand = function () {
        //will work because js is single threaded
        if (that.expanding) {
            return;
        }
        that.expanding = true;
        that.uNodes = that.newUNodes;
        that.newUNodes = [];

        function asyncExpandForever(i1) {
            if (i1 >= that.uNodes.length) {
                that.expanding = false;
                //runs forever
                that.autoExpand();
            } else {
                expandNode(i1, asyncExpandForever);
            }
        }

        asyncExpandForever(0);
    }

    function expandNode(i2, callback) {
        if (that.uNodes[i2].expanded) {
            callback(++i2);
        } else {
            asyncExpandInner(i2, 0);
        }
        function asyncExpandInner(i2, j) {
            if (j >= that.uNodes[i2].vin.length) {
                callback(++i2);
            }
            else {
                if (that.uNodes[i2].vin[j].txid)
                    TxData.get({hashValue: that.uNodes[i2].vin[j].txid}, function (newTx) {
                        var thisNumber = that.nodes.length;
                        var originNumber = that.uNodes[i2].oNumber;
                        that.uNodes[i2].expanded = true;
                        newTx.oNumber = thisNumber;
                        newTx.x = that.uNodes[i2].x;
                        newTx.y = that.uNodes[i2].y;
                        that.links.push({'target': newTx.oNumber, 'source': that.uNodes[i2].oNumber});
                        that.nodes.push(newTx);
                        that.newUNodes.push(newTx);
                        asyncExpandInner(i2, ++j);
                    }, function (errorResult) {
                        console.log('error: ' + errorResult);
                    });
                else {
                    console.log('bingo ended');
                    that.uNodes[i2].ended = true;
                    asyncExpandInner(i2, ++j);
                }
            }
        }
    }

    if (that.rparam.length === 64) {
        TxData.get({hashValue: that.rparam}, function (tx) {
            that.tx = tx;
            that.tx.oNumber = 0;
            that.tx.initNode = true;
            that.tx.x = 200;
            that.tx.y = 200;
            that.nodes.push(tx);
            that.newUNodes.push(tx);
        }, function (errorResult) {
            that.reqFail = true;
        });
    } else {
        that.reqFail = true;
    }

}]);