app.factory('Task', function (ngRecord) {

	return ngRecord.extend({

		urlRoot: WEBROOT + 'api/tasks',

		defaults: {
			title: '',
			estimate: ''
		},

		constructor: function Task(properties) {
			this.initialize.apply(this, arguments)
		},

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

	});
});