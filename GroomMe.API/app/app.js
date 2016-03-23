(function () {
    var app = angular.module("mainModule", ['ngAnimate', "ngRoute", "ui.bootstrap", 'ngTagsInput', 'angularSpinner']);
    
    app.config(['$routeProvider', '$httpProvider', 'usSpinnerConfigProvider', function ($routeProvider, $httpProvider, usSpinnerConfigProvider) {

        usSpinnerConfigProvider.setDefaults({ color: 'Blue', lines: 9, length: 8, radius: 4 });

             $routeProvider.when("/", {
            templateUrl :"Dashboard.html",
            controller: "courseController"
        })
            .when("/register", {
                templateUrl: "User/UserRegister.html",
                controller: "userController"
            })
            .when("/login", {
                templateUrl: "User/UserLogin.html",
                controller: "userController"
            })
            .when("/viewcourse:actionType", {
                templateUrl: "Course/ViewCourse.html",
                controller: "courseController"
            }).when("/editcourse:actionType/courseid/:courseid", {
                templateUrl: "Course/EditCourse.html",
                controller: "courseController"
            }).when("/addcourse:actionType", {
                templateUrl: "Course/AddCourse.html",
                controller: "courseController"
            }).when("/viewtag:actionType", {
                templateUrl: "Tag/viewTag.html",
                controller: "TagController"
            }).when("/addtag:actionType", {
                templateUrl: "Tag/AddTag.html",
                controller: "TagController"
            }).otherwise({ redirectTo: "/" });
 }]);

   
})();