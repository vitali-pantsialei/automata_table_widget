angular.module('tableModule', [])
	.controller('tableController', ['$scope','$compile', function ($scope, $compile) {
		var col = 1;
		var row = 1;

		var compileTemplate = function(templ, parent, scope) {
			($compile(templ)(scope)).appendTo(parent);
		}

		$scope.valObject = {"v0_0": ""};

		$scope.addRow = function() {
			var trLast = $('<tr></tr>').appendTo('table.automata-table');

			for (var i = 0; i!=col; i++) {
				var td = $('<td></td>').appendTo(trLast);
				if (i == 0) {
					var str = 'c' + row;
					$scope.valObject[str] = false;
					compileTemplate('<input type="checkbox" ng-model="valObject.' + str +'"/>q' + (row - 1) + '<br/>', td, $scope);
				}
				else {
					var str = 'v' + row + '_' + i;
					$scope.valObject[str] = "";
					compileTemplate('<input type="text" ng-model="valObject.' + str +'"/>', td, $scope);
				}
			}

			row++;
		};

		$scope.addCol = function() {
			var trList = $('table.automata-table tr');

			for (var i = 0; i!=row; i++) {
				var str = 'v' + i + '_' + col;
				$scope.valObject[str] = "";
				compileTemplate('<td><input type="text" ng-model="valObject.' + str +'"/></td>', trList[i], $scope);
			}

			col++;
		}

		$scope.delRow = function() {
			$('table.automata-table tr:last').remove();
			row--;
		}

		$scope.delCol = function() {
			$('table.automata-table tr').each(function(index, el) {
				$(this).children().last().remove();
			});
			col--;
		}

		$scope.sendValues = function() {
			$scope.valObject.col = col;
			$scope.valObject.row = row;
			console.log($scope.valObject);
		}
	}]);