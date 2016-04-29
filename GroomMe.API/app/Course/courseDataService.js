(function () {
    var app = angular.module("mainModule");

    var courseDataService = function ($http, userDataService) {

        var baseUrl = "http://groomme.apphb.com/api/CourseData";
        //var baseUrl = "http://localhost:54052/api/CourseData";
        
        var getCourse = function (courseid) {
           return $http({
               url: baseUrl + "/" + courseid,
                method: "GET",
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json, text/plain, */*',
                    'Authorization': 'Bearer ' + userDataService.GetProfile().token
                },

            }).then(function (response) {
                return response.data;
            });

        };

        var getCourseData = function() {
            return $http({
                url: baseUrl,
                method: "GET",

                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json, text/plain, */*',
                    'Authorization': 'Bearer ' + userDataService.GetProfile().token
        },

            }).then(function (response) {
                return response.data;
            });
        };

        var saveNewCourse = function (course) {

         return $http({
             url: baseUrl,
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
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json, text/plain, */*',
                    'Authorization': 'Bearer ' + userDataService.GetProfile().token
                },

            }).then(function (response) {
                return response.data;
            });
        };

        var editCourse = function(course)
        {
            return $http({
                url: baseUrl + "/" + course.courseId,
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
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json, text/plain, */*',
                    'Authorization': 'Bearer ' + userDataService.GetProfile().token
                },

            }).then(function (response) {
                return response.data;
            });
        };

        var deleteCourse = function(courseId) {
            return $http({
                url: baseUrl + "/" + courseId,
                method: "DELETE",
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json, text/plain, */*',
                    'Authorization': 'Bearer ' + userDataService.GetProfile().token
                },
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