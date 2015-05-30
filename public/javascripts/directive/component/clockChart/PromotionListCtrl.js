myApp.directive('clockChartCtrl', function (directiveService,generateId) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/component/clockChart/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                pre: function (scope) {
                    scope.id =generateId.generate();
                },
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    /**
                     * Get the current time
                     */
                    getNow = function() {
                        var now = new Date();

                        return {
                            hours: now.getHours() + now.getMinutes() / 60,
                            minutes: now.getMinutes() * 12 / 60 + now.getSeconds() * 12 / 3600
                        };
                    };

                    /**
                     * Pad numbers
                     */
                    pad = function(number, length) {
                        // Create an array of the remaining length + 1 and join it with 0's
                        return new Array((length || 2) + 1 - String(number).length).join(0) + number;
                    }

                    var now = getNow();

                    // Create the chart
                    $("#chart").highcharts({

                            chart: {
                                type: 'gauge',
                                plotBackgroundColor: null,
                                plotBackgroundImage: null,
                                plotBorderWidth: 0,
                                plotShadow: false,
                                height: 200,
                                backgroundColor: null
                            },
                            credits: {
                                enabled: false
                            },
                            yAxis: {

                                plotBands: [{
                                    from: 0,
                                    to: 12,
                                    color: '#55BF3B',
                                    thickness: '100%'
                                }],
                                labels: {
                                    distance: 15
                                },
                                min: 0,
                                max: 24,
                                lineWidth: 0,
                                showFirstLabel: true,
                                showLastLabel: false,

                                minorTickInterval: 'hour',
                                minorTickWidth: 1,
                                minorTickLength: 5,
                                minorTickPosition: 'inside',
                                minorGridLineWidth: 0,
                                minorTickColor: '#666',

                                tickInterval: 1,
                                tickWidth: 1,
                                tickPosition: 'inside',
                                tickLength: 20,
                                tickColor: '#900000'
                            },

                            tooltip: {
                                formatter: function () {
                                    return this.series.chart.tooltipText;
                                }
                            },
                            title:{
                                text:''
                            },
                            series: [{
                                data: [{
                                    id: 'hour',
                                    y: now.hours,
                                    dial: {
                                        radius: '60%',
                                        baseWidth: 4,
                                        baseLength: '95%',
                                        rearLength: 0
                                    }
                                }],
                                animation: false,
                                dataLabels: {
                                    enabled: false
                                }
                            }]
                        },

                        // Move
                        function (chart) {
                            setInterval(function () {

                                now = getNow();

                                var hour = chart.get('hour');

                                animation = now.seconds === 0 ?
                                    false :
                                {
                                    easing: 'easeOutElastic'
                                };


                                hour.update(now.hours, true, animation);

                            }, 1000);

                        });


                }
            }
        }
    }
})
;



// Extend jQuery with some easing (copied from jQuery UI)
$.extend($.easing, {
    easeOutElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    }
});