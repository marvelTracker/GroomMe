(function() {
    var app = angular.module("mainModule");

    app.directive('courseviewInfoPanel', function () {
        return {
            templateUrl: "Course/CourseViewPanel.html",
            restrict: "E",
            scope: {
                model: "=course"
            },

            controller: function ($scope, $location) {

                $scope.edit = function() {
                    $location.path("/editcourse:edit/courseid/:" + $scope.model.courseId);
                };
            },
            link: function (scope, element) {
                //if (scope.model.courseStatus == 0) {
                //    element.find('#infoPanel').addClass('panel-danger');
                //}
                //if (scope.model.courseStatus == 1) {
                //    element.find('#infoPanel').addClass('panel-info');
                //}
                //if (scope.model.courseStatus == 2) {
                //    element.find('#infoPanel').addClass('panel-warning');
                //}
                //if (scope.model.courseStatus == 3) {
                //    element.find('#infoPanel').addClass('panel-success');
                //}
                
                element.find('#infoPanel').addClass('panel-info');
            }
        };
        });
    }
)();