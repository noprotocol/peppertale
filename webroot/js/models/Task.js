app.factory('Task', function (ActiveRecord) {
	'use strict';

	return ActiveRecord.extend({

		$urlRoot: WEBROOT + 'api/tasks',

		$defaults: {
			title: '',
			estimate: ''
		},

		/**
		 * @contructor
		 * @param {Object} properties
		 */
		$constructor: function Task(properties) {
			this.$initialize.apply(this, arguments);
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
		}

	});
});