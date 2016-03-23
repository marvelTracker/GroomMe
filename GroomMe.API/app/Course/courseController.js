(function () {

    var app = angular.module("mainModule");

    var courseController = function ($scope, $http, $log, courseDataService, messagePanelService, $routeParams, $injector, usSpinnerService) {

        $scope.course = '';
        $scope.course.startDate = new Date();
        $scope.course.endDate = new Date();
        $scope.course.courseName = '';
        $scope.course.author = '';
        $scope.course.description = '';
        $scope.courseStatues = [
         { id: 0, name: 'NEW' },
          { id: 1, name: 'TO DO' },
          { id: 2, name: 'In Progress' },
        { id: 3, name: 'Done' }];

        $scope.course.tags = [];
        $scope.course.precentage = 0;

        $scope.editCourse = {};
        $scope.editCourse.sDate = new Date();
        $scope.editCourse.eDate = new Date();
        $scope.editCourse.precentage = 0;


        $scope.sliderConfig = {
            min: 0,
            max: 100,
            step: 5
        };

        $scope.filterSliderConfig = {
            min: 0,
            max: 100,
            step: 5
        };
        var setCheckBoxModel = function () {
            $scope.checkboxModel = {
                newCourse: { selected: false, id: 'C1', value: 0 },
                todoCourse: { selected: false, id: 'C2', value: 1 },
                inprogressCourse: { selected: false, id: 'C3', value: 2 },
                doneCourse: { selected: false, id: 'C4', value: 3 }
            };
        };

        $scope.setFilterStartDate = function (data) {
            $scope.filterDates.startDate = data;
        };

        $scope.setFilterEndDate = function (date) {
            $scope.filterDates.endDate = date;
        };

        $scope.startSpin = function() {
            usSpinnerService.spin('spinner-1');
        };

        $scope.stopSpin = function() {
            usSpinnerService.stop('spinner-1');
        };

        var initializeFilter = function () {
            $scope.filterCourse = {};
            $scope.filterCourse.isNofilter = true;
            $scope.filterCourse.filterStatues = [];
            $scope.filterCourse.startDate = '';
            $scope.filterCourse.endDate = '';

            $scope.filterDates = {};
            $scope.filterDates.startDate = new Date();
            $scope.filterDates.endDate = new Date();
            $scope.filterCourse.precentage = '';
            $scope.filterPrecentage = 0;

            var rScope = $injector.get('$rootScope');
            if (rScope) {
                rScope.$broadcast('setSliderValue', 0);
            }

            $scope.filterTags = {};
            $scope.filterTags.tags = [];
            $scope.filterCourse.tags = [];


            setCheckBoxModel();
        };

        initializeFilter();

        messagePanelService.ResetMessagePanel();

        $scope.setStartDate = function (data) {
            $scope.course.startDate = data;
        };

        $scope.setEditStartDate = function (data) {
            $scope.editCourse.startDate = data;
        };

        $scope.setEndDate = function (date) {
            $scope.course.endDate = date;
        };

        $scope.setEditEndDate = function (date) {
            $scope.editCourse.endDate = date;

        };

        var onGetCourseDataLoad = function (data) {
            $scope.stopSpin();
            $scope.courses = data;
        };

        var onEditCourseDataLoad = function (data) {
            $scope.editCourse.startDate = moment(data.startedDateTime);
            $scope.editCourse.endDate = moment(data.endDateTime);
            $scope.editCourse.sDate = $scope.editCourse.startDate;
            $scope.editCourse.eDate = $scope.editCourse.endDate;
            $scope.editCourse.name = data.name;
            $scope.editCourse.author = data.author;
            $scope.editCourse.description = data.description;
            $scope.editCourse.tags = data.tags;
            $scope.editCourse.precentage = data.precentage;
            $scope.editCourse.courseId = data.courseId;
            $scope.editCourse.courseStatus = data.courseStatus;

            var rScope = $injector.get('$rootScope');
            if (rScope) {
                rScope.$broadcast('setSliderValue', $scope.editCourse.precentage);
            }
        };

        $scope.getData = function () {
            $scope.startSpin();
            courseDataService.GetCourseData().then(onGetCourseDataLoad, function (error) {
                $scope.stopSpin();
                messagePanelService.SendErrorMessage();
            });
        };

        if ($routeParams.actionType == ':view') {
            $scope.getData();
        };

        if ($routeParams.actionType == ':edit') {
            var courseId = $routeParams.courseid.replace(':', '');

            courseDataService.GetCourse(courseId).then(onEditCourseDataLoad, function (error) {
                messagePanelService.SendErrorMessage();
            });;
        }

        $scope.submitCourse = function () {
            if (!$scope.addCourseForm.$valid)
                console.log('Fix the issue in ');
            else {
                $scope.startSpin();

                courseDataService.SaveNewCourse($scope.course).then(function (data) {
                    $log.info('Course data ' + data);
                    $scope.stopSpin();
                    messagePanelService.SendSuccessMessage();

                }, function (error) {
                    $log.info('error ' + error);
                    $scope.stopSpin();
                    messagePanelService.SendErrorMessage();
                });
            }
        };

        $scope.editCourseAndSave = function () {
            if (!$scope.editCourseForm.$valid)
                console.log('Fix the issue in ');
            else {
                $scope.startSpin();
                courseDataService.EditCourse($scope.editCourse).then(function (data) {
                    $scope.stopSpin();
                    messagePanelService.SendSuccessMessage();

                }, function (error) {
                    $scope.stopSpin();
                    messagePanelService.SendErrorMessage();
                });
            }
        };

        $scope.filterStatus = function (checkboxModel) {

            $scope.filterCourse.isNofilter = false;

            if (checkboxModel.selected) {
                //Todo: add filter value
                if (!_.contains($scope.filterCourse.filterStatues, checkboxModel.value)) {
                    $scope.filterCourse.filterStatues.push(checkboxModel.value);
                }
            } else {
                {
                    //todo:delete the filter value
                    if (_.contains($scope.filterCourse.filterStatues, checkboxModel.value)) {

                        var index = $scope.filterCourse.filterStatues.indexOf(checkboxModel.value);

                        if (index > -1) {
                            $scope.filterCourse.filterStatues.splice(index, 1);
                        }

                    }
                }
            }
        };

        $scope.filterByDate = function () {
            $scope.filterCourse.startDate = $scope.filterDates.startDate;
            $scope.filterCourse.endDate = $scope.filterDates.endDate;
            $scope.filterCourse.isNofilter = false;
        };

        $scope.filterByPrecentage = function () {
            $scope.filterCourse.precentage = $scope.filterPrecentage;
            $scope.filterCourse.isNofilter = false;
        };

        $scope.filterByTags = function () {
            $scope.filterCourse.tags = $scope.filterTags.tags;
            $scope.filterCourse.isNofilter = false;
        };

        $scope.clearFilter = function () {
            initializeFilter();
        };
    };

    app.controller("courseController", courseController);

})();