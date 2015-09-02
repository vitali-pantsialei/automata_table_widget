angular.module('tableModule', [])
	.controller('tableController', ['$scope','$compile', function ($scope, $compile) {
		var col = 1;
		var row = 1;

		var compileTemplate = function(templ, parent, scope) {
			($compile(templ)(scope)).fadeIn().appendTo(parent);
		}

		$scope.valObject = {};
		$scope.valObject.values = [];
		$scope.valObject.values[0] = [];
		$scope.valObject.values[0][0] = '';

		$scope.addRow = function() {
			var trLast = $('<tr></tr>').appendTo('table.automata-table');
			$scope.valObject.values[row] = [];

			for (var i = 0; i!=col; i++) {
				var td = $('<td></td>').appendTo(trLast);
				if (i == 0) {
					$scope.valObject.values[row][i] = false;
					compileTemplate('<input type="checkbox" ng-model="valObject.values[' + row +'][' + i + ']"/>q' + (row - 1) + '<br/>', td, $scope);
				}
				else {
					$scope.valObject.values[row][i] = "";
					compileTemplate('<input type="text" ng-model="valObject.values[' + row +'][' + i + ']"/>', td, $scope);
				}
			}

			row++;
		};

		$scope.addCol = function() {
			var trList = $('table.automata-table tr');

			for (var i = 0; i!=row; i++) {
				$scope.valObject.values[i][col] = "";
				compileTemplate('<td><input type="text" ng-model="valObject.values[' + i +'][' + col + ']"/></td>', trList[i], $scope);
			}

			col++;
		}

		$scope.delRow = function() {
			if (row > 1) {
				$('table.automata-table tr:last').remove();
				row--;
			}
		}

		$scope.delCol = function() {
			if (col > 1) {
				$('table.automata-table tr').each(function(index, el) {
					$(this).children().last().remove();
				});
				col--;
			}
		}

		$scope.sendValues = function() {
			$scope.valObject.col = col;
			$scope.valObject.row = row;
			console.log($scope.valObject);
		}
	}]);