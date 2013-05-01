app.factory('Project', function (ngRecord, Task) {

	return ngRecord.extend({

		urlRoot: WEBROOT + 'api/projects',

		constructor: function Project(properties) {
			this.initialize.apply(this, arguments)
		},

		parse: function (data) {
			angular.forEach(data.tasks, function (task, i) {
				data.tasks[i] = new Task(task);
			});
			return data;
		},

		/**
		 * Get the total estimated hours for the given Projects.
		 * @return {Number} in hours
		 */
		getEstimated: function () {
			return this.tasks.reduce(function (sum, task) {
				return sum + task.estimateInHours();
			}, 0);
		}
	});
});