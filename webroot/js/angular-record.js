(function(angular, undefined) {
	'use strict';
	/**
	 * ngRecord is an Backbone.Model inspired modellayer for AngularJS.
	 *
	 * Differences compared to Backbone:  
	 *  * Added fetch(id) and fetchAll() to the class.
	 *  * Stripped out functionality that is provided by angular)
	 *    * No getter/setter methods
	 *    * No event system.
	 *    * No dependancy on underscore
	 *    * No dependancy on jQuery
	 * 
	 * Goals / Features (compared to $resource)
	 *  * Extendable OOP designed models
	 *  * Enable parsing jsonData
	 *  * No spec/metadata in advance, the json-object from th rest api is the spec.
	 *  * Allow default values
	 *  * Allow alternative backends
	 *  * Allow alternative url schemes (like .json suffixed).
	 *  
	 */
	angular.module('ngRecord', ['ng']).factory('ngRecord', function($http, $q) {
		var Record = function Record (properties) {
			this.initialize.apply(this, arguments);
		};
		Record.prototype = {
			idAttribute: 'id',
			initialize: function (properties) {
				if (this.defaults) {
					angular.extend(this, this.defaults);
				}
				if (properties) {
					angular.extend(this, properties);
				}
			},
			fetch: function (options) {
	      		return this.sync('read', this, options);
			},
			save: function (values, options) {
				if (values) {
					angular.extend(this, values);
				}
				if (this[this.idAttribute]) {
					return this.sync('update', this, options);
				}
				return this.sync('create', this, options);
			},
			destroy: function (options) {
				return this.sync('delete', this, options);	
			},
			parse: function (response, options) {
				return response;
			},
			sync: function (operation, model, options) {
				return Record.sync.apply(this, arguments);
			},
			url: function() {
	      		if (typeof this[this.idAttribute] === 'undefined') {
	      			return this.urlRoot;
	      		}
	      		return this.urlRoot + (this.urlRoot.charAt(this.urlRoot.length - 1) === '/' ? '' : '/') + encodeURIComponent(this[this.idAttribute]);
	      		
	    	},
	    	/**
	    	 * Don't call this method directly, this method is used by JSON.stringify.
	    	 * Export the "public" properties for use in json.
	    	 */
	    	toJSON: function () {
	    		return this;
	    	}
		};

		Record.sync = function (operation, model, options) {
			var crudMapping = {
				create: 'POST',
				read: 'GET',
				update: 'PUT',
				delete: 'DELETE'
			};
			var options = {
				method: crudMapping[operation],
				url: model.url()
			};
			if (operation === 'create' || operation === 'update') {
				options.data = model;
			}
			var defer = $q.defer();
			var request = $http(options);
			return request.then(function (response) {
				if (response.data) {
					angular.extend(model, model.parse(response.data));
				}
				return model;
			});
		};

		Record.extend = function(protoProps, staticProps) {
	    	var parent = this;
	    	var child;
	 
		    if (protoProps && typeof protoProps.constructor === 'function') {
		      child = protoProps.constructor;
	    	} else {
		      child = function () { return parent.apply(this, arguments); };
		    }
		    angular.extend(child, parent, staticProps);
	    	var Surrogate = function () { this.constructor = child; };
	    	Surrogate.prototype = parent.prototype;
	    	child.prototype = new Surrogate;
		    if (protoProps) {
		    	angular.extend(child.prototype, protoProps); 
		    }
		    child.__super__ = parent.prototype;
	    	return child;
		};
		return Record;
	});
})(window.angular);