(function () {

    var app = angular.module("mainModule");

    app.directive('mySlider', function() {
        return {
            restrict: 'A',
            scope: {
                config: "=config",
                price: "=model",
            },
            link: function(scope, elem, attrs) {
                $(elem).slider({
                    range: "min",
                    min: scope.config.min,
                    max: scope.config.max,
                    step: scope.config.step,
                    slide: function(event, ui) {
                        scope.$apply(function() {
                            scope.price = ui.value;
                        });
                    }
                });

                $(elem).addClass("blue-slider");
               
                scope.$on('setSliderValue', function (event, value) {
                   $(elem).slider('value', value);
                });
            }
        };
    });

})();