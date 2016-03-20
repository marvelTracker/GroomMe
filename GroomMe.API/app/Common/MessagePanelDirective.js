(function () {
    var app = angular.module("mainModule");

    app.directive('messagePanel', ['$timeout', function ($timeout) {
        return {
            templateUrl: "Common/messagepanel.html",
            restrict: "E",
            scope: {
            },
            controller: function ($scope) {

                $scope.ResetMessagePanel = function () {
                    $scope.message = '';
                    $scope.isSuccess = false;
                    $scope.isError = false;
                    $scope.isCustom = false;
                };

                $scope.AutoCloseMessagePanel = function() {
                    $timeout(function () {
                        $scope.ResetMessagePanel();
                    }, 10000);
                };

                $scope.ResetMessagePanel();

                $scope.$on('sendDisplaySuccessMessage', function (event, message) {
                    $scope.isSuccess = true;
                    $scope.message = message;
                    $scope.AutoCloseMessagePanel();
                });

                $scope.$on('sendHideMessagePanel', function (event) {
                    $scope.ResetMessagePanel();
                });

                $scope.$on('sendDisplayErrorMessage', function (event, message) {
                    $scope.isError = true;
                    $scope.message = message;
                    $scope.AutoCloseMessagePanel();
                });
            },

            link: function ($scope, $elem, attrs) {
                //use $timeout
                $scope.test = '';
            }


        };
    }]);
})();