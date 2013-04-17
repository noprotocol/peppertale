'use strict';
angular.module('peppertaleApp')
  .controller('TasksCtrl', function ($scope) {
    $scope.tasks = [{
		id: 1,
		title: 'First task',
		estimate: 4,
		sortorder: 8
	}, {
		id: 2,
		title: 'Second task',
		estimate: 2,
		sortorder: 4
	}];

	$scope.sum = function() {
		var sum = 0;
		$scope.tasks.forEach(function (task) {
			var value = parseFloat(task.estimate);
			if (!isNaN(value)) {
				sum += value				
			}
		});
		return sum;
	}

	$scope.sortStopped = function() {
		console.log($scope);
		// console.log($scope.tasks[1].title);
	};

	$scope.addTask = function () {
		$scope.tasks.push({
			title: 'Untitled',
			estimate: 0
		})
	};
  });
