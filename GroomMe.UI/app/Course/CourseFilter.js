(function() {
        var app = angular.module("mainModule");

        app.filter("courseFilter", function (courseFilterService) {

           return function(input, filterModel) {
                var result = [];
                
                angular.forEach(input, function(item) {

                    if (filterModel.isNofilter == true) {
                        //No Filters applied
                        return result = input;
                    } else {

                        var isFilterDateValid = false;
                        var isCourseStatusFilterValid = false;
                        var isFilterTagsValid = false;
                        var isFilterPrecentageValid = false;

                        if (moment(filterModel.startDate).isValid() && moment(filterModel.endDate).isValid()) {
                            if (courseFilterService.IsValidItemForDateFilter(item, filterModel.startDate, filterModel.endDate)) {
                                isFilterDateValid = true;
                            }
                        } else {
                            //No Date filer selected.
                            isFilterDateValid = true;
                        }

                        if (filterModel.filterStatues.length == 0) {
                            isCourseStatusFilterValid = true;
                        }else {
                            isCourseStatusFilterValid = courseFilterService.IsValidItemForCourseStatus(item, filterModel.filterStatues);
                        }

                        if (filterModel.tags.length == 0) {
                            isFilterTagsValid = true;
                        } else {
                            isFilterTagsValid = courseFilterService.IsValidItemForCourseTags(item, filterModel.tags);
                        }
                        if (filterModel.precentage == 0) {
                            isFilterPrecentageValid = true;
                        } else {
                            isFilterPrecentageValid = courseFilterService.IsValidItemForCoursePrecentage(item, filterModel.precentage);
                        }

                        if (isFilterDateValid && isCourseStatusFilterValid && isFilterTagsValid && isFilterPrecentageValid)
                        {
                            result.push(item);
                        }
                    }
                });
                filterModel.totalItems = result.length;
                return result;
            };
        });
    }
)();