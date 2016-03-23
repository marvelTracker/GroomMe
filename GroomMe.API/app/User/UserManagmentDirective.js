(function() {
    var app = angular.module("mainModule");

    app.directive('userManagement', function () {
        return {
            templateUrl: "User/userManagement.html",
            restrict: "E",
            scope: {
                isRegisterForm: "@register"
            },

            controller: function ($scope, $log, $location, userDataService, usSpinnerService, messagePanelService) {
                $scope.user = '';
                $scope.user.UserName = '';
                $scope.user.Email = '';
                $scope.user.Password = '';
                $scope.user.ConfirmPassword = '';
                $scope.errors = '';
                $scope.message = '';
                $scope.token = '';
                $scope.user.grant_type = "password";
                $scope.registerForm = false;
                $scope.user.isRemember = false;

                $scope.startSpin = function () {
                    usSpinnerService.spin('spinner-1');
                };

                $scope.stopSpin = function () {
                    usSpinnerService.stop('spinner-1');
                };

                $scope.registerForm = ($scope.isRegisterForm === "true");

                var onUserDataLoad = function (data) {
                    $log.info('User data ' + data);

                    $scope.stopSpin();

                    $scope.token = data.access_token;

                    userDataService.SetProfile($scope.user.UserName, data.access_token, $scope.user.isRemember);

                    $log.info('Token :' + $scope.token);

                    $location.path("/viewcourse");

                };

                var onRegisterDataLoad = function (data) {
                    $log.info('User data ' + data);
                    $scope.stopSpin();
                    $scope.Login();

                };

                var onError = function (reason) {
                    $scope.stopSpin();
                    messagePanelService.SendErrorMessage();
                    if (response.data.exceptionMessage)
                        $scope.message += response.data.exceptionMessage;

                    // Validation errors
                    if (response.data.modelState) {
                        for (var key in response.data.modelState) {
                            $scope.message += response.data.modelState[key] + "\r\n";
                        }
                    }

                    $log.error('Failed Error ' + $scope.message);
                    

                };

                $scope.Login = function () {
                    $scope.startSpin();
                    userDataService.UserLogin($scope.user).then(onUserDataLoad, onError);
                };

                $scope.Register = function () {
                    $scope.startSpin();
                    userDataService.RegisterUser($scope.user).then(onRegisterDataLoad, onError);
                };
            }
        };
    });

    app.directive('userNavBar', function() {
        return {
            templateUrl: "User/usernavbar.html",
            restrict: "E",
            controller: function ($scope, $location, userDataService) {
                $scope.logIn = function () {
                    $location.path("/login");
                };
                $scope.register = function () {
                    $location.path("/register");
                };
                $scope.logOut = function () {
                    userDataService.LogOut();
                    $location.path("/login");
                };
            }
        };
    });

})();