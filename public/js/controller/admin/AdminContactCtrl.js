myApp.controller('AdminContactCtrl', function($scope, superAdminService, $flash) {
  $scope.dto = {
    subject: '',
    contact: ''
  };
  return $scope.send = function() {
    return superAdminService.getEmailToBusinesses($scope.dto, function() {
      return $flash.success('--.generic.success');
    });
  };
});