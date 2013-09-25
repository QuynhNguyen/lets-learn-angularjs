//Main App
var app = angular.module("LearnAngularApp", ['ngRoute', 'ngResource', 'ParseModule']).
	config(function($routeProvider, $httpProvider) {

		//Server Authentication
		$httpProvider.defaults.headers.common['X-Parse-Application-Id'] = 'Nr3Wg2Otho1E2Kh3tGx4ZsfXTA3NE0c190fovGyx';
		$httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = '4UFGOn9bDzrh3qQUMo7OStPUOmU6qjlNtIiQcPav';
		
		//Routing
		$routeProvider
			.when('/', {templateUrl: 'partials/list.html', controller: ListCtrl})
			.otherwise({redirectTo: '/'});
	});


//Factory
app.factory('Todo', function($resource, ParseSDK, $http){
	return $resource(ParseSDK.getApiUrl() + '/classes/todo/:id', { id: '@id' }, { update: { method: 'PUT', isArray: false } });
});


//Module
angular.module('ParseModule', []).
	factory('ParseSDK', function () {
		return {
			getApiUrl: function() {
				return "https://api.parse.com/1";
			}
		}
	});

//Controller
var ListCtrl = function($scope, $location, Todo) {
	var todoList = Todo.get(function() {
		$scope.items = todoList.results;
	})
}



