app.controller('ProjectCtrl', function ($scope, Project, Task) {
	'use strict';

	$scope.estimated = '...';
	Project.fetchOne(1).then(function (project) {
		$scope.project = project;
		// Add tasks automaticly (always show an empty row at the bottom, excel-style)
		$scope.$watch('project.tasks', function (tasks) {
			if (tasks.length === 0 || tasks[tasks.length - 1].title !== '') {
				tasks.push(new Task());
				// @todo recalc burndown?
				// $scope.chartData.push(['2008', Math.random() * 1500, Math.random() * 1500]);
			}
			angular.forEach(tasks, function (task, i) {
				task.sortorder = i + 1;
			});
			$scope.estimated = $scope.project.getEstimated();
		}, true);
	});

	// @todo calculate chartdata based on timeline & estimates.
	$scope.chartData = [
		['Year', 'Dummy', 'Waarden'],
		['2004',  1000,	  400],
		['2005',  1170,	  460],
		['2006',  660,	   1120],
		['2007',  Math.random() * 1500,	  Math.random() * 1500]
	];
});