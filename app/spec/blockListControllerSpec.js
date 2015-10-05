'use strict';

describe('Block list controller', function () {

    beforeEach(function(){
        module('bitcoinControllers');
    });

    beforeEach(function(){
        module('bitcoinControllers');
    });

    var scope, controller;

    beforeEach(function() {
        inject(function ($controller, $rootScope) { //,
            scope = $rootScope.$new();
            controller = $controller('BitcoinListCtrl as blockCtrl', {
                $scope: scope
            });
        });
    });

    it('check how many length options are available', function () {
        expect(scope.blockCtrl.lengthOptions.length).toEqual(4);
    });

});