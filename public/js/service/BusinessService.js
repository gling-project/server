myApp.service('businessService', function($flash, $http, accountService, geolocationService) {
  this.loadLastBusiness = function(businessNb, callbackSuccess, callbackError) {
    return $http({
      'method': 'POST',
      'url': '/rest/business/last/' + businessNb,
      'headers': 'Content-Type:application/json;charset=utf-8',
      'data': geolocationService.getPositionWithoutNull()
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
  this.createBusiness = function(accountId, businessName, callbackSuccess, callbackError) {
    return $http({
      'method': 'POST',
      'url': '/rest/createBusiness',
      'headers': 'Content-Type:application/json;charset=utf-8',
      data: {
        accountId: accountId,
        businessName: businessName
      }
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
  this.importBusinessFormFacebook = function(urlFacebook, callbackSuccess, callbackError) {
    return $http({
      'method': 'GET',
      'url': '/rest/createBusinessFromFacebook/' + urlFacebook,
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
  this.getBusiness = function(id, callbackSuccess, callbackError) {
    return $http({
      'method': 'GET',
      'url': '/rest/business/' + id,
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
  this.getFollowedBusinesses = function(callbackSuccess, callbackError) {
    return $http({
      'method': 'GET',
      'url': '/rest/business/followed',
      'headers': 'Content-Type:application/json;charset=utf-8'
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
  this.edit = function(dto, callbackSuccess, callbackError) {
    return $http({
      'method': 'PUT',
      'url': '/rest/business/' + dto.id,
      'headers': 'Content-Type:application/json;charset=utf-8',
      'data': dto
    }).success(function(data, status) {
      accountService.getMyself().business = data;
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
  this.editSocialNetwork = function(businessId, dto, callbackSuccess, callbackError) {
    return $http({
      'method': 'PUT',
      'url': '/rest/business/' + businessId + '/social_network',
      'headers': 'Content-Type:application/json;charset=utf-8',
      'data': dto
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
  this.editBusinessCategory = function(businessId, dto, callbackSuccess, callbackError) {
    return $http({
      'method': 'PUT',
      'url': '/rest/business/' + businessId + '/category',
      'headers': 'Content-Type:application/json;charset=utf-8',
      'data': {
        list: dto
      }
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
  this.publishBusiness = function(callbackSuccess, callbackError) {
    return $http({
      'method': 'POST',
      'url': '/rest/business/ask_publication',
      'headers': 'Content-Type:application/json;charset=utf-8',
      'data': {}
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
  this.cancelPublishRequest = function(callbackSuccess, callbackError) {
    return $http({
      'method': 'POST',
      'url': '/rest/business/cancel_publication_request',
      'headers': 'Content-Type:application/json;charset=utf-8',
      'data': {}
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
  this.stopPublication = function(callbackSuccess, callbackError) {
    return $http({
      'method': 'POST',
      'url': '/rest/business/stop_publish',
      'headers': 'Content-Type:application/json;charset=utf-8',
      'data': {}
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
  this.editIllustration = function(businessId, dto, callbackSuccess, callbackError) {
    return $http({
      'method': 'PUT',
      'url': '/rest/business/' + businessId + '/illustration',
      'headers': 'Content-Type:application/json;charset=utf-8',
      'data': dto
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
  this.editLandscape = function(businessId, dto, callbackSuccess, callbackError) {
    return $http({
      'method': 'PUT',
      'url': '/rest/business/' + businessId + '/landscape',
      'headers': 'Content-Type:application/json;charset=utf-8',
      'data': dto
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
  this.editAddress = function(businessId, dto, callbackSuccess, callbackError) {
    return $http({
      'method': 'PUT',
      'url': '/rest/business/' + businessId + '/address',
      'headers': 'Content-Type:application/json;charset=utf-8',
      'data': dto
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
  this.createSchedule = function(businessId, dto, callbackSuccess, callbackError) {
    return $http({
      'method': 'POST',
      'url': '/rest/business/' + businessId + '/schedule',
      'headers': 'Content-Type:application/json;charset=utf-8',
      'data': dto
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
  this.editGallery = function(businessId, dto, callbackSuccess, callbackError) {
    return $http({
      'method': 'POST',
      'url': '/rest/business/' + businessId + '/edit/gallery',
      'headers': 'Content-Type:application/json;charset=utf-8',
      'data': dto
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
  this.getInterests = function(callbackSuccess, callbackError) {
    return $http({
      'method': 'GET',
      'url': '/rest/business/interests',
      'headers': 'Content-Type:application/json;charset=utf-8'
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
  this.claimBusiness = function(businessId, phone, vta, callbackSuccess, callbackError) {
    return $http({
      'method': 'POST',
      'url': '/rest/business/claim',
      'headers': 'Content-Type:application/json;charset=utf-8',
      'data': {
        phone: phone,
        vta: vta,
        businessId: businessId
      }
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
  return;
});