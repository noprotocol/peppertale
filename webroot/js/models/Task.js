app.factory('Task', function ($resource) {
	var Task = $resource(WEBROOT + 'api/tasks/:id', {id: '@id'}, {update: { method: 'PUT'}});

	// instance methods
	angular.extend(Task.prototype, {
		/**
		 * Return the estimate in hours
		 * @return {Number}
		 */
		estimateInHours: function () {
			var value = parseFloat(this.estimate);
			if (isNaN(value)) {
				return 0.0;
			}
			return value;
		},
		save: function (values) {
			if (values) {
				angular.extend(this, values);
			}
			if (this.id) {
				return this.$update();
			}
			return this.$save();
		}
	});
	// static methods
	angular.extend(Task, {

		/**
		 * Get the total estimated hours for the given tasks.
		 *
		 * @param {Array<Task>} tasks
		 * @return {Number} in hours
		 */
		totalEstimated: function (tasks) {
			var sum = 0;
			tasks.forEach(function (task) {
				sum += task.estimateInHours();
			});
			return sum;
		}
	});
	return Task;
});