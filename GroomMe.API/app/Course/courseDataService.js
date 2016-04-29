(function () {
    var app = angular.module("mainModule");

    var courseDataService = function ($http) {
        
        var getCourse = function (courseid) {
           return $http({
               url: '/api/CourseData' + "/" + courseid,
                method: "GET",
                dataType: 'json'
           }).then(function (response) {
                return response.data;
            });

        };

        var getCourseData = function() {
            return $http({
                url: '/api/CourseData',
                method: "GET"
            }).then(function (response) {
                return response.data;
            });
        };

        var saveNewCourse = function (course) {

         return $http({
             url: '/api/CourseData',
                method: "POST",
                data: "name=" + course.courseName + 
                    "&author=" + course.author +
                    "&courseId=" + 0 +
                    "&starteddatetime=" + course.startDate.toJSON() +
                    "&enddatetime=" + course.endDate.toJSON() + 
                    "&description=" + course.description +
                    "&courseStatus=" + course.courseStatus +
                    "&precentage=" + course.precentage +
                    "&tags=" + JSON.stringify(course.tags), 
                dataType: 'json'
            }).then(function (response) {
                return response.data;
            });
        };

        var editCourse = function(course)
        {
            return $http({
                url: '/api/CourseData' + "/" + course.courseId,
                method: "PUT",
                data: "name=" + course.name +
                    "&author=" + course.author +
                    "&courseId=" + course.courseId +
                    "&starteddatetime=" + course.startDate.toJSON() +
                    "&enddatetime=" + course.endDate.toJSON() +
                    "&description=" + course.description +
                    "&courseStatus=" + course.courseStatus +
                    "&precentage=" + course.precentage +
                    "&tags=" + JSON.stringify(course.tags),
                dataType: 'json'

            }).then(function (response) {
                return response.data;
            });
        };

        var deleteCourse = function(courseId) {
            return $http({
                url: '/api/CourseData' + "/" + courseId,
                method: "DELETE",
                dataType: 'json'
            }).then(function (response) {
                return response.data;
            });
        };

        return {
            GetCourse: getCourse,
            GetCourseData: getCourseData,
            SaveNewCourse: saveNewCourse,
            EditCourse: editCourse,
            DeleteCourse: deleteCourse,
        };

    };
     
    app.factory("courseDataService", courseDataService);    

})();