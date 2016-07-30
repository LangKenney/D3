
var myApp = angular.module('myApp',['ngMessages','ngResource']);

//Angular Controller
//Minifiable version
myApp.controller('mainController' , ['$scope', '$timeout','$filter','$http','$interval', function($scope, $timeout,$filter,$http,$interval){
    $scope.name = 'Everyone';
    $scope.characters = 5;
    
    $timeout(function(){
        $scope.name = 'Lang'
        
    }, 3000);
    
    var margin = {
        top: 30,
        right: 30,
        bottom: 40,
        left: 50
    }
    
    var height = 600 - margin.top - margin.bottom;
    var width = 1400 - margin.left - margin.right;
    
    
    var chart = d3.select('#chart').append('svg')
            .style('background', '#f4f4f4')
            .attr('width', width + margin.right + margin.left)
            .attr('height', height + margin.top + margin.bottom)
            
    // var chartData = [10, 25, 20, 15, 60, 23, 14, 54, 12, 44, 33, 76];

    var dataCount = 30;
    var dataMax = 100;
    
    $scope.chartData = [10, 25, 20, 15, 60, 23, 14, 54, 12, 44, 33, 76];
    $scope.start = function() {
        $scope.add();
            $scope.countDown = 10
            $interval(function(){ 
                $scope.add();
                $scope.$apply();
                $scope.countDown-- 
                
            }, 1000,0)
    }
    
    $scope.add = function() {
            if ($scope.chartData.length<dataCount){
                    $scope.added = Math.round(Math.random()*dataMax);
                    $scope.chartData.push($scope.added);
                } else {
                    $scope.chartData.shift()
                    $scope.added = Math.round(Math.random()*dataMax);
                    $scope.chartData.push($scope.added);
                }
                

        
        //$scope.chartData.push($scope.input);
            $scope.$watch('chartData',function(newValue, oldValue){
                console.info("Watched");
                console.log('Old:'+oldValue);
                console.log('New:'+newValue);
            })
            
            d3.selectAll('rect').remove()
            d3.selectAll('path').remove()
            d3.selectAll('line').remove()
            d3.selectAll('axis').remove()
            d3.selectAll('g').remove()
            
            		// Set Tooltip
        	var tooltip = d3.select('body').append('rect')
        		.style('position', 'absolute')
        		.style('background', 'white')
        		.style('opacity', '0')
        		.style('padding', '5px 15px')
        		.style('border', '1px #000 solid')
        		.style('border-radius', '5px')
            
            //         //Set color Scales
            // var colors = d3.scaleLinear()
            //     .domain([0,$scope.chartData.length])
            //     .range(['#6ba6d8','#1e405d'])
            
            //Set Y Scale
            var yScale = d3.scaleLinear()
                    .domain([0, d3.max($scope.chartData)])
                    .range([0, height])
        
            //Set X Scale
            var xScale = d3.scaleBand()
                    .domain(d3.range(0, $scope.chartData.length))
                    .range([0, width])
        
            var thisChart = chart.append('g')
                    // .append('svg')
                    // .style('background', '#f4f4f4')
                    // .attr('width', width + margin.right + margin.left)
                    // .attr('height', height + margin.top + margin.bottom)
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                .selectAll('rect')
                .data($scope.chartData)
                .enter().append('rect')
                .style('fill','#0000b3')
                .attr('width', xScale.bandwidth())
                .attr('height', function (d) {
                    return yScale(d);
                })
                .attr('x', function (d, i) {
                    return xScale(i);
                })
                .attr('y', function (d) {
                    return height - yScale(d);
                })
            
            //Line
            // create a simple data array that we'll plot with a line (this array represents only the Y values, X will just be the index location)
    		var data = [3, 6, 2, 7, 5, 2, 0, 3, 8, 9, 2, 5, 9, 3, 6, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 2, 7];
    
    		// X scale will fit all values from data[] within pixels 0-w
    		var x = d3.scale.linear().domain([0, data.length]).range([0, w]);
    		// Y scale will fit values from 0-10 within pixels h-0 (Note the inverted domain for the y-scale: bigger is up!)
    		var y = d3.scale.linear().domain([0, 10]).range([h, 0]);
    			// automatically determining max range can work something like this
    			// var y = d3.scale.linear().domain([0, d3.max(data)]).range([h, 0]);
    
    		// create a line function that can convert data[] into x and y points
    		var line = d3.svg.line()
			// assign the X function to plot our line as we wish
			.x(function(d,i) { 
				// verbose logging to show what's actually being done
				console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(i) + ' using our xScale.');
				// return the X coordinate where we want to plot this datapoint
				return x(i); 
			})
			.y(function(d) { 
				// verbose logging to show what's actually being done
				console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + " using our yScale.");
				// return the Y coordinate where we want to plot this datapoint
				return y(d); 
			})
			//--Line--
			
            //Set Vertical Scale
            var vScale = d3.scaleLinear()
                    .domain([0, d3.max($scope.chartData)])
                    .range([height, 0])
        
            //Set Horizontal Scale
            var hScale = d3.scaleBand()
                    .domain(d3.range(0, $scope.chartData.length))
                    .range([0, width], 0.2)
        
            //Verticle axis
            var vAxis = d3.axisLeft()
                    .scale(vScale)
                    .ticks(5)
                    .tickPadding(5)
                    .tickSize(5)
        
            var vGuide = d3.select('svg')
                    .append('g')
            vAxis(vGuide)
            vGuide.attr('transform', 'translate(' + margin.left + ',' + margin.right + ')')
            vGuide.selectAll('path')
                    .style('fill', 'none')
                    .style('stroke', 'black')
            vGuide.selectAll('line')
                    .style('stroke', 'black')
        
            //Hoizontal axis
            var hAxis = d3.axisBottom()
                    .scale(hScale)
                    .tickValues(hScale.domain().filter(function (d, i) {
                        return !(i % ($scope.chartData.length / $scope.chartData.length))
                    }))
        
            var hGuide = d3.select('svg')
                    .append('g')
            hAxis(hGuide)
            hGuide.attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')
            hGuide.selectAll('path')
                    .style('fill', 'none')
                    .style('stroke', 'black')
            hGuide.selectAll('line')
                    .style('stroke', 'black')
                    
        thisChart.on('click', function(d){
            alert(d)
        });        
            thisChart.on('mouseover', function(d){
                tooltip.transition()
                    .style('opacity', 1);
    			tooltip.html(d)
    				.style('left', (d3.event.pageX)+'px')
    				.style('top', (d3.event.pageY)+'px')
                barColor = this.style.fill;
                d3.select(this)
                    .style('opacity', 0.8)
                    .style('fill', 'green')
            });
            thisChart.on('mouseout', function(){
                tooltip.transition()
                    .style('opacity', 0);
                d3.select(this)
                    .style('opacity', 1)
                    .style('fill', '#0000b3')
            });
    };  
    
    $scope.remove = function() {
            d3.selectAll('rect').remove()
            d3.selectAll('path').remove()
            d3.selectAll('line').remove()
            d3.selectAll('axis').remove()
            d3.selectAll('g').remove()
            thisChart.remove()
            //d3.axisLeft().remove()
    };
}]);

