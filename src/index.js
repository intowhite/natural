require('../scss/main.scss');
import angular from 'angular';
import jquery from 'jquery';
var _ = require('lodash');
var wins_json = require('./wins.json');
var solutions_json = require('./solutions.json');


var categories = [
	{
		display: 'solution',
		data: solutions_json,
		mode: 'solutions'
	},
	{
		display: 'solution win',
		data: wins_json,
		mode: 'wins'
	}
];

var natdemo = angular.module('natdemo',[]);
natdemo.controller('natController',['$scope',
	function($scope) {
		// CATEGORIES
		$scope.categories = categories;
		$scope.categories.isShown = false;
		$scope.select_click = function(select){
			$scope.categories.isShown = !$scope.categories.isShown;
		};
		$scope.checked_category = $scope.categories[0];
		$scope.category_click = function(cat){
			$scope.checked_category = cat;
			set_industry(cat,$scope);
			set_product(cat,$scope);
		};


		// INDUSTRIES
		function set_industry(checked_category,$scope) {
			$scope.industries = checked_category.data
			$scope.industries.unshift({
				industry:
				"any industry"
			});
			$scope.industries = _.uniqBy($scope.industries,'industry');
			$scope.checked_industry = $scope.industries[0];

			$scope.industries.isShown = false;
			$scope.industries_click = function(select){
				$scope.industries.isShown = !$scope.industries.isShown;
			};

			$scope.checked_industry = $scope.industries[0];
			$scope.industry_click = function(industry){
				$scope.checked_industry = industry;
				set_product($scope.checked_category,$scope,$scope.checked_industry.industry);
			};
		}
		set_industry($scope.checked_category,$scope);

		// PRODUCTS
		function set_product(checked_category,$scope,filter) {
			$scope.products = checked_category.data

			if(filter){
				$scope.products = $scope.products.filter(function(product){
					if(product.industry == filter || filter == 'any industry') {
						return product;
					}
				});
			}

			$scope.products.unshift({
				product:
				"any product"
			});
			$scope.products = _.uniqBy($scope.products,'product');
			$scope.checked_product = $scope.products[0];

			$scope.products.isShown = false;
			$scope.products_click = function(select){
				$scope.products.isShown = !$scope.products.isShown;
			};

			$scope.checked_product = $scope.products[0];
			$scope.product_click = function(product){
				$scope.checked_product = product;
			};
		}
		set_product($scope.checked_category,$scope);

		$scope.get_results = function() {
			var data = $scope.checked_category.data;
			$scope.mode = $scope.checked_category.mode;
			if($scope.checked_industry.industry != 'any industry')
			{
				data = data.filter(function(item){
					if(item.industry == $scope.checked_industry.industry)
					{
						return item;
					}
				});
			} else {
				data = data.filter(function(item){
					if(item.industry != 'any industry') {
						return item;
					}
				});
			}
			if($scope.checked_product.product != 'any product')
			{
				data = data.filter(function(item){
					if(item.product == $scope.checked_product.product)
					{
						return item;
					}
				});
			} else {
				data = data.filter(function(item){
					if(item.product != 'any product') {
						return item;
					}
				});
			}
			data.map(function(item){
				// create clean urls
				item.id = item.name.replace(' ','-').toLowerCase();
				item.industry_id = item.industry.replace(' ','-').toLowerCase();
				item.product_id = item.product.replace(' ','-').toLowerCase();
			});
			$scope.results = data;

			// workaround to reset the animation
			$scope.results_show = false;
			var w = jquery('.results');
			$scope.results_show = true;
			w.removeClass('show');
			setTimeout(function(){
				w.addClass('show');
			},300);
		}
		$scope.results = [];
	}]);