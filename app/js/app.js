//Main App
var app = angular.module("LearnAngularApp", ['ngRoute', 'ngResource', 'ParseModule']).
	config(function($routeProvider) {
		$routeProvider
			.when('/', {templateUrl: 'partials/list.html', controller: ListCtrl})
			.otherwise({redirectTo: '/'});
	}).
	run(function(ParseSDK){});


//Factory

//Module
angular.module('ParseModule', []).
	factory('ParseSDK', function () {
		Parse.initialize("Nr3Wg2Otho1E2Kh3tGx4ZsfXTA3NE0c190fovGyx", "sgbPpmB2OnU45fNA35FTZzSh4EOuMJHeApFCHC4q");
	});

//Controller
var ListCtrl = function($scope, $location) {
	var Todo = Parse.Object.extend("todo");
	var query = new Parse.Query(Todo);
	query.find({
		success: function(result) {
			console.log(result);
			$scope.$apply(function() {
				$scope.items = result;
			});
			console.log($scope.items);
		},
		error: function(error) {
			alert("ListCtrl error: " + error.message);
		}
	});
}



