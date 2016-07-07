require('../scss/main.scss');
import angular from 'angular';
var _ = require('lodash');
var wins_json = require('./wins.json');
var solutions_json = require('./solutions.json');


var categories = [
	{
		display: 'solution',
		data: solutions_json
	},
	{
		display: 'solution win',
		data: wins_json
	}];

var natdemo = angular.module('natdemo',[]);

natdemo.controller('natController',['$scope',
	function($scope) {
		$scope.isShown = false;
		$scope.select_click = function(){
			$scope.isShown = !$scope.isShown;
		};
		$scope.categories = categories;
		$scope.checked = categories[0];
		$scope.category_click = function(cat){
			$scope.checked = cat;
		};
	}]);
// var appname = angular.module('appname', []);
// appname.controller('appCtrl', ['$scope',
//   function($scope) {
//     $scope.greeting = { text: 'Hello' };
// }]);