angular.module('ngCountup', []).directive('countUp', ['$compile',function($compile,$timeout) {
return {
  restrict: 'E',
  replace: false,
  scope: {
    countFrom: "=countFrom",
    countTo: "=countTo",
    interval: '=interval'
  },
  controller: ['$scope', '$element', '$attrs', '$timeout', function ($scope, $element, $attrs, $timeout) {
    $scope.millis = $scope.countFrom;
    if ($element.html().trim().length === 0) {
      $element.append($compile('<span>{{millis | number}}</span>')($scope));
    } else {
      $element.append($compile($element.contents())($scope));
    }

    var i=0;
    function timeloop () {
      setTimeout(function () {
        $scope.millis++;
        $scope.$digest();
        i++;
        if (i<$scope.countTo) {
          timeloop();
        }
      }, $scope.interval)
    }
    timeloop();
  }]
}}]);

// html syntax - <count-up count-from="7219789" count-to="9999999" interval="3000"></count-up>