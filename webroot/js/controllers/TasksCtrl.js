
app.controller('TasksCtrl', function ($scope, Task) {
	'use strict';

	$scope.tasks = Task.query();

	// Add tasks automaticly (always show an empty row at the bottom, excel-style)
	$scope.$watch('tasks', function (tasks) {
		if (tasks.lenght === 0 || tasks[tasks.length - 1].title !== '') {
			tasks.push(new Task({
				title: '',
				estimate: ''
			}));
			// @todo recalc burndown?
			$scope.chartData.push(['2008', Math.random() * 1500, Math.random() * 1500]);
		}
	}, true);

	$scope.sum = function() {
		return Task.totalEstimated($scope.tasks);
	};

	$scope.sortStopped = function() {
		console.log($scope);
		// @todo update sortorder fields.
	};

	// @todo calculate chartdata based on timeline & estimates.
	$scope.chartData = [
		['Year', 'Dummy', 'Waarden'],
		['2004',  1000,	  400],
		['2005',  1170,	  460],
		['2006',  660,	   1120],
		['2007',  Math.random() * 1500,	  Math.random() * 1500]
	];
});