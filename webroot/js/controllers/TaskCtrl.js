app.controller('TaskCtrl', function ($scope) {
	
	// Autosave changes in a Task
	var timer;
	$scope.$watch('task', function (task, old) {
		if (angular.equals(task, old) === false) {
			clearTimeout(timer);
			timer = setTimeout(function () {
				task.save();
			}, 1000);
		}
	}, true);
});