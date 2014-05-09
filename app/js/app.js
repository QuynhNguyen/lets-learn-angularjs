//Main App
var app = angular.module("LearnAngularApp", ['ngRoute', 'ngResource', 'ParseModule']).
	config(function($routeProvider, $httpProvider) {

		/*
		 * Please sign up at Parse.com to get your API and App Key
		 * Feel free to use mine for learning purpose only! 
		 */
		$httpProvider.defaults.headers.common['X-Parse-Application-Id'] = '';
		$httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = '';
		
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

//Directive
app.directive('sorted', [function () {
	return {
		scope: true,
		restrict: 'A',
		transclude: true,
		template: '<a class="btn btn-link" ng-click="do_sort()" ng-transclude></a>' +
            	  '<span ng-show="do_show(true)">' +
                  '<i class="glyphicon glyphicon-arrow-down"></i>' +
          		  '</span>' +
         		  '<span ng-show="do_show(false)">' +
                  '<i class="glyphicon glyphicon-arrow-up"></i>' +
                  '</span> ',
		controller: function ($scope, $element, $attrs) {
			$scope.sort_by = $attrs.sorted;

			$scope.do_sort = function() {
				$scope.sort($scope.sort_by);
			};

			$scope.do_show = function(is_desc) {
				return (is_desc != $scope.is_desc && $scope.sort_order == $scope.sort_by)
			}
		}
	};
}])

//Controller
var ListCtrl = function($scope, $location, Todo) {
	$scope.sort_order = "priority";
	$scope.is_desc = false;

	$scope.sortString = function(is_desc) {
		return is_desc ? "-" : "";
	}

	$scope.sort = function(col) {
		if ($scope.sort_order === col) {
			$scope.is_desc = !$scope.is_desc
		} else {
			$scope.is_desc = false;
			$scope.sort_order = col;
		}
		$scope.search($scope.is_desc);
	}

	$scope.search = function(is_desc) {
		var todoList = Todo.get({order: $scope.sortString(is_desc) + $scope.sort_order}, function() {
			$scope.items = todoList.results;
		})
	}

	$scope.search(false);

}



