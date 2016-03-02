(function () {

      var app = angular.module('fireBaseChat').controller('userController', function($location,$scope) {
      $scope.onSubmit = function() {
      $location.url('/chat/' + $scope.username);
  };
});

}())