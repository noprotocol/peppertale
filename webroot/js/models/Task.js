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
		estimateInHours: function (tasks) {
	});
	return Task;
});