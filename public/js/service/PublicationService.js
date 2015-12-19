myApp.service('publicationService', function($http, $flash, geolocationService) {
  this["delete"] = function(dto, callbackSuccess, callbackError) {
    return $http({
      'method': 'DELETE',
      'url': '/rest/publication/' + dto.id,
      'headers': 'Content-Type:application/json;charset=utf-8'
    }).success(function(data, status) {
      if (callbackSuccess != null) {
        return callbackSuccess(data);
      }
    }).error(function(data, status) {
      $flash.error(data.message);
      if (callbackError != null) {
        return callbackError(data, status);
      }
    });
  };
  this.loadByIds = function(listId, callbackSuccess, callbackError) {
    return $http({
      'method': 'POST',
      'url': '/rest/publication/ids/' + listId,
      'headers': 'Content-Type:application/json;charset=utf-8',
      'data': geolocationService.getPositionWithoutNull()
    }).success(function(data, status) {
      if (callbackSuccess != null) {
        return callbackSuccess(data.list);
      }
    }).error(function(data, status) {
      console.log('ERROR');
      $flash.error(data.message);
      if (callbackError != null) {
        return callbackError(data, status);
      }
    });
  };
  return;
});