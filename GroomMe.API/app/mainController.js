(function () {
    var app = angular.module("mainModule");

    var a = function ($scope, $http, $log, courseDataService, userDataService) {
       
        $scope.profile = userDataService.GetProfile();

    };

    app.controller("mainController", a);

})();