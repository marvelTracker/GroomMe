(function () {
    var app = angular.module("mainModule");

    var a = function ($scope, $http, $log, courseDataService, userDataService, $location) {
       $scope.profile = userDataService.GetProfile();
       if ($scope.profile.isLoggedIn) {
           $location.path("/viewcourse:view");
       } else {
           $location.path("/main");
       }

    };

    app.controller("mainController", a);

})();