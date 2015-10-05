/**
 * Created by bjedrzejewski on 05/10/2015.
 */

angular.module('myFilters', []).filter('fromDate', function() {
    return function(input) {
        return moment(new Date(input * 1000)).fromNow();
    };
});