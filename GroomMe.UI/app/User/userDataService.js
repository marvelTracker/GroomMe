(function () {
    var app = angular.module("mainModule");

    var userDataService = function ($http) {

        var profile = {
            isLoggedIn: false,
            userName: "",
            token: ""
        };

        var setProfile = function(username, token, isRemember) {
            profile.userName = username;
            profile.token = token;
            profile.isLoggedIn = true;

            if (isRemember) {
                localStorage['Access-Token'] = token;
                localStorage['User-Name'] = username;
            }
        };

        var logOut = function() {
            profile.isLoggedIn = false;
                profile.userName = "";
            profile.token = "";
        };

        var getProfile = function () {

            var token = localStorage['Access-Token'];
            var userName = localStorage['User-Name'];

            if (token) {
                profile.userName = userName;
                profile.isLoggedIn = true;
                profile.token = token;
            }

            return profile;
        };

        var userLogin = function (user) {
            return $http({
                url: "http://localhost:54052/token",
                method: "POST",
                data: "userName=" + user.UserName + "&password=" + user.Password + 
              "&grant_type=password",

                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json, text/plain, */*'
                },               

            }).then(function (response) {
                return response.data;
            });
        };

        var registerUser = function (user) {
           return $http({
                url: "http://localhost:54052/api/Account/Register",
                method: "POST",
                data: { 'UserName': user.UserName, 'Email':user.Email, 'Password': user.Password, 'ConfirmPassword': user.ConfirmPassword },

                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Accept': 'application/json, text/plain, */*'
                
               }

            }).then(function (response) {
                return response.data;
            });
        };
        return {
            UserLogin: userLogin,
            RegisterUser: registerUser,
            SetProfile: setProfile,
            GetProfile: getProfile,
            LogOut: logOut,
    };

        };

    app.factory("userDataService", userDataService);

})();