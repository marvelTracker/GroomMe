(function() {
    var app = angular.module("mainModule");

    var courseFilterService = function ($log) {

        var isValidItemForCourseStatus = function (item, statusFilters) {

            var isValid = false;

            statusFilters.forEach(function (value) {
                if (item.courseStatus == value) {
                                isValid = true;
                            };
            });

            return isValid;
        };

        var isValidItemForCourseTags = function (item, tagFilters) {

            var isValid = false;

            tagFilters.forEach(function (value) {
                
                item.tags.forEach(function (itemTag) {
                   if (itemTag.text.toLowerCase() == value.text.toLowerCase()) {
                        
                        isValid = true;
                    }
                });
            });

            return isValid;
        };

        var isValidItemForCoursePrecentage = function (item, precentage) {

            var isValid = false;

            if(item.precentage < precentage)
                isValid = true;

            return isValid;
        };

        var isValidItemForDateFilter = function (item, startDate, endDate) {
            var isValid = false;

             $log.info('Filter Model start Date' + startDate);
             $log.info('Filter Model end Date' + endDate);
             $log.info('item started Date' + item.startedDateTime);
             $log.info('item end Date ' + item.endDateTime);


            $log.info('item.startedDateTime > filterModel.startDate ' + moment(item.startedDateTime).isAfter(startDate));


             $log.info('item.endDateTime < filterModel.endDate ' + moment(item.endDateTime).isBefore(endDate));



                if (moment(item.startedDateTime).isAfter(startDate) && moment(item.endDateTime).isBefore(endDate)) {
                    isValid = true;
                };

            return isValid;

        };

        return {
            IsValidItemForDateFilter: isValidItemForDateFilter,
            IsValidItemForCourseStatus: isValidItemForCourseStatus,
            IsValidItemForCourseTags: isValidItemForCourseTags,
            IsValidItemForCoursePrecentage: isValidItemForCoursePrecentage
        };
    };


    app.factory("courseFilterService", courseFilterService);

})();
