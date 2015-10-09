/**
 * Created by bjedrzejewski on 05/10/2015.
 */

angular.module('blockListDirectives', []).directive('bitcoinPanel', function(){
    return {
        restrict: 'E',
        scope: {block: '='},
        templateUrl: '../app/list/bitcoin-panel.html'
    }
});
