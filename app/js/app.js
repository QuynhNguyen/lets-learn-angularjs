//Main App
var app = angular.module("LearnAngularApp", ['ngRoute', 'ngResource', 'ParseModule']).
	config(function($routeProvider) {
		$routeProvider
			.when('/', {templateUrl: 'partials/list.html', controller: ListCtrl})
			.otherwise({redirectTo: '/'});
	}).
	run(function(ParseSDK){
		ParseSDK.initApiKey();
	});


//Factory
app.factory('Todo', function(){
	var Todo = Parse.Object.extend("todo");
	var query = new Parse.Query(Todo);
	return query;
});

//Module
angular.module('ParseModule', []).
	factory('ParseSDK', function () {
		return {
			initApiKey: function() {
				Parse.initialize("Nr3Wg2Otho1E2Kh3tGx4ZsfXTA3NE0c190fovGyx", "sgbPpmB2OnU45fNA35FTZzSh4EOuMJHeApFCHC4q");
			}
		}
	});

//Controller
var ListCtrl = function($scope, $location, Todo) {
	Todo.find({
		success: function(result) {
			$scope.$apply(function() {
				$scope.items = result;
			});
		},
		error: function(error) {
			alert("ListCtrl error: " + error.message);
		}
	});
}



