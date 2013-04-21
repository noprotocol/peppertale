
app.controller('TasksCtrl', function ($scope, Task) {
	'use strict';

    $scope.tasks = Task.query();

	$scope.sum = function() {
		return Task.totalEstimated($scope.tasks);
	}

	$scope.sortStopped = function() {
		console.log($scope);
		// @todo update sortorder fields.
	};

	// @todo Add tasks automaticly (always show an empty row at the bottom, excel-style)
	$scope.addTask = function () {
		$scope.tasks.push(new Task({
			title: 'Untitled',
			estimate: 0
		}));
		$scope.chartData.push(['2008', Math.random() * 1500, Math.random() * 1500]);
	};

	// @todo calculate chartdata based on timeline & estimates.
	$scope.chartData = [
		['Year', 'Dummy', 'Waarden'],
		['2004',  1000,      400],
   		['2005',  1170,      460],
   		['2006',  660,       1120],
   		['2007',  Math.random() * 1500,      Math.random() * 1500]
   	];
});