myApp.directive('donutChartCtrl', function (directiveService, $timeout, generateId) {
    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/admin/donutChart/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                pre: function (scope) {
                    return scope.id = generateId.generate();
                },
                post: function (scope, element) {
                    directiveService.autoScopeImpl(scope);


                    scope.$watch('getInfo().data', function () {
                        var dataToDisplay;
                        if (scope.getInfo().data != null) {

                            //compute data
                            scope.data = [];

                            for (var key in  scope.getInfo().data) {
                                scope.data.push({
                                    name: key,
                                    y: scope.getInfo().data[key]
                                });
                            }

                            $("#" + scope.id).highcharts({

                                chart: {
                                    plotBackgroundColor: null,
                                    plotBorderWidth: null,
                                    plotShadow: false,
                                    type: 'pie'
                                },
                                title: {
                                    text: scope.getInfo().title
                                },
                                plotOptions: {
                                    pie: {
                                        allowPointSelect: true,
                                        cursor: 'pointer',
                                        dataLabels: {
                                            enabled: true,
                                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                            style: {
                                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                            }
                                        }
                                    }
                                },
                                series: [
                                    {
                                        name: 'name',
                                        data: scope.data
                                    }
                                ]
                            });
                        }
                    });
                }
            };
        }
    };

});