/**
 * Created by bjedrzejewski on 05/10/2015.
 */

angular.module('myFilters', []).filter('fromDate', ['$filter', function($filter) {
    return function(input) {
        return moment($filter('date')(input * 1000,'yyyy-MM-dd hhmmss'), 'YYYY-MM-DD hhmmss').fromNow();
    };
}]);