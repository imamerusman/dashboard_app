 //Linear Chart (d3)
 angular
        .module('app')
        .directive('linearChart', function($parse, $window){
   return{
      restrict:'EA',
      template:"<svg width='480' height='200'></svg>",
       link: function(scope, elem, attrs){
           var exp = $parse(attrs.chartData);

           var logsDataToPlot=exp(scope);
           var padding = 20;
           var pathClass="path";
           var xScale, yScale, xAxisGen, yAxisGen, lineFun;

           var d3 = $window.d3;
           var rawSvg=elem.find('svg');
           var svg = d3.select(rawSvg[0]);

           scope.$watchCollection(exp, function(newVal, oldVal){
               logsDataToPlot=newVal;
               redrawLineChart();
           });

           function setChartParameters(){

               xScale = d3.scale.linear()
                   .domain([logsDataToPlot[0].hour, logsDataToPlot[logsDataToPlot.length-1].hour])
                   .range([padding + 5, rawSvg.attr("width") - padding]);

               yScale = d3.scale.linear()
                   .domain([0, d3.max(logsDataToPlot, function (d) {
                       return d.err;
                   })])
                   .range([rawSvg.attr("height") - padding, 0]);

               xAxisGen = d3.svg.axis()
                   .scale(xScale)
                   .orient("bottom")
                   .ticks(logsDataToPlot.length - 1);

               yAxisGen = d3.svg.axis()
                   .scale(yScale)
                   .orient("left")
                   .ticks(5);

               lineFun = d3.svg.line()
                   .x(function (d) {
                       return xScale(d.hour);
                   })
                   .y(function (d) {
                       return yScale(d.err);
                   })
                   .interpolate("basis");
           }
         
         function drawLineChart() {

               setChartParameters();

               svg.append("svg:g")
                   .attr("class", "x axis")
                   .attr("transform", "translate(0,180)")
                   .call(xAxisGen);

               svg.append("svg:g")
                   .attr("class", "y axis")
                   .attr("transform", "translate(20,0)")
                   .call(yAxisGen);

               svg.append("svg:path")
                   .attr({
                       d: lineFun(logsDataToPlot),
                       "stroke": "#319A7D",
                       "stroke-width": 2,
                       "fill": "none",
                       "class": pathClass
                   });
           }

           function redrawLineChart() {

               setChartParameters();

               svg.selectAll("g.y.axis").call(yAxisGen);

               svg.selectAll("g.x.axis").call(xAxisGen);

               svg.selectAll("."+pathClass)
                   .attr({
                       d: lineFun(logsDataToPlot)
                   });
           }

           drawLineChart();
       }
   };
});


//Pie Chart
angular.module('app')
.directive('pieChart', function ($timeout) {
    return {
        restrict: 'EA',
        scope: {
            title: '@title',
            width: '@width',
            height: '@height',
            data: '=data',
            selectFn: '&select'
        },
        link: function ($scope, $elm, $attr) {

            // Create the data table and instantiate the chart
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Label');
            data.addColumn('number', 'Value');
            var chart = new google.visualization.PieChart($elm[0]);

            draw();

            // Watches, to refresh the chart when its data, title or dimensions change
            $scope.$watch('data', function () {
                draw();
            }, true); // true is for deep object equality checking
            $scope.$watch('title', function () {
                draw();
            });
            $scope.$watch('width', function () {
                draw();
            });
            $scope.$watch('height', function () {
                draw();
            });

            // Chart selection handler
            google.visualization.events.addListener(chart, 'select', function () {
                var selectedItem = chart.getSelection()[0];
                if (selectedItem) {
                    $scope.$apply(function () {
                        $scope.selectFn({
                            selectedRowIndex: selectedItem.row
                        });
                    });
                }
            });

            function draw() {
                if (!draw.triggered) {
                    draw.triggered = true;
                    $timeout(function () {
                        draw.triggered = false;
                        var label, value;
                        data.removeRows(0, data.getNumberOfRows());
                        angular.forEach($scope.data, function (row) {
                            label = row[0];
                            value = parseFloat(row[1], 10);
                            if (!isNaN(value)) {
                                data.addRow([row[0], value]);
                            }
                        });
                        var options = {
                            'title': $scope.title,
                                'width': $scope.width,
                                'height': $scope.height,
                                colors: ['#6ac3c9', '#e8e7e7']
                        };
                        chart.draw(data, options);
                        // No raw selected
                        $scope.selectFn({
                            selectedRowIndex: undefined
                        });
                    }, 0, true);
                }
            }
        }
    };
});