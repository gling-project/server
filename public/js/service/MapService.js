myApp.service('mapService', function($http, $flash) {
  this.loadMapDataBusiness = function(callbackSuccess, callbackError) {
    return $http({
      'method': "GET",
      'url': "/rest/map/business",
      'headers': "Content-Type:application/json;charset=utf-8"
    }).success(function(data, status) {
      if (callbackSuccess != null) {
        return callbackSuccess(data.list);
      }
    }).error(function(data, status) {
      $flash.error(data.message);
      if (callbackError != null) {
        return callbackError(data, status);
      }
    });
  };
  return;
});