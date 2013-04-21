app.directive('burndownChart', function ($parse) {

	return {
		restrict: 'E',
		link: function ($scope, iElement, attrs) {
			googleReady.done(function () {
				var chart = new google.visualization.LineChart(iElement[0]);
				$scope.$watch(attrs.ngModel, function (data) {
					chart.draw(google.visualization.arrayToDataTable(data), { title: attrs.title });
				}, true);
			});
		}
	};
});