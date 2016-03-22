(function() {
    var app = angular.module("mainModule");

    app.filter("dateFilter", function() {

        return function(input) {
            return  moment(input).format('YYYY-MM-DD');
        };
    });
})();