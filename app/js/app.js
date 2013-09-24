var app = angular.module("LearnAngularApp", ['ngRoute', 'ngResource']).
	config(function($routeProvider) {
		$routeProvider
			.when('/', {templateUrl: 'partials/list.html', controller: ListCtrl})
			.otherwise({redirectTo: '/'});
	});

var ListCtrl = function($scope, $location) {
	$scope.test = "testing";
}

