myApp.service('facebookService', function($http, accountService, $locale, languageService, constantService, $flash) {
  var authResponse, isConnected, _this;
  this.facebookAppId;
  this.facebookAuthorization = 'public_profile,email';
  isConnected = false;
  authResponse = null;
  _this = this;
  this.ini = function() {
    FB.init({
      appId: this.facebookAppId,
      cookie: true,
      xfbml: true,
      version: 'v2.3'
    });
    return FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        isConnected = true;
        return authResponse = response.authResponse;
      }
    });
  };
  this.sharePublication = function(businessId, publicationId) {
    var obj, url;
    url = constantService.urlBase + '/business/' + businessId + '/publication/' + publicationId;
    obj = {
      method: 'share',
      href: url
    };
    return FB.ui(obj);
  };
  this.loginToServer = function(callbackSuccess, callbackError) {
    var access_token, user_id;
    access_token = authResponse.accessToken;
    user_id = authResponse.userID;
    return $http({
      'method': 'GET',
      'url': '/rest/login/facebook/' + access_token + '/' + user_id,
      'headers': 'Content-Type:application/json;charset=utf-8'
    }).success(function(data) {
      if ((data != null) !== '') {
        if (callbackSuccess != null) {
          return callbackSuccess(data);
        }
      }
    }).error(function(data, status) {
      $flash.error(data.message);
      if (callbackError != null) {
        return callbackError(data, status);
      }
    });
  };
  this.loginToServerSimple = function(accessToken, callbackSuccess, callbackError) {
    return $http({
      'method': 'GET',
      'url': '/rest/login/facebook/' + accessToken + '/null',
      'headers': 'Content-Type:application/json;charset=utf-8'
    }).success(function(data) {
      if ((data != null) !== '') {
        if (callbackSuccess != null) {
          return callbackSuccess(data);
        }
      }
    }).error(function(data, status) {
      $flash.error(data.message);
      if (callbackError != null) {
        return callbackError(data, status);
      }
    });
  };
  this.linkToAccount = function(accessToken, callbackSuccess, callbackError) {
    var linkFct;
    linkFct = function(accessTokenToLink) {
      return $http({
        'method': 'GET',
        'url': '/rest/facebook/link/' + accessTokenToLink + '/null',
        'headers': 'Content-Type:application/json;charset=utf-8'
      }).success(function(data) {
        if ((data != null) !== '') {
          if (callbackSuccess != null) {
            return callbackSuccess(data);
          }
        }
      }).error(function(data, status) {
        $flash.error(data.message);
        if (callbackError != null) {
          return callbackError(data, status);
        }
      });
    };
    if (accessToken != null) {
      authResponse = {
        accessToken: accessToken
      };
      isConnected = true;
      return linkFct(authResponse.accessToken);
    } else {
      if (isConnected) {
        return linkFct(authResponse.accessToken);
      } else {
        return FB.login(function(response) {
          if (response.status === 'connected') {
            authResponse = response.authResponse;
            isConnected = true;
            return linkFct(authResponse.accessToken);
          } else {
            if (callbackError != null) {
              return callbackError();
            }
          }
        }, {
          scope: this.facebookAuthorization
        });
      }
    }
  };
  this.login = function(successCallback, callbackError) {
    if (isConnected) {
      return this.loginToServer(successCallback, callbackError);
    } else {
      return FB.login(function(response) {
        if (response.status === 'connected') {
          authResponse = response.authResponse;
          _this.loginToServer(successCallback, callbackError);
          return isConnected = true;
        } else {
          if (callbackError != null) {
            return callbackError();
          }
        }
      }, {
        scope: this.facebookAuthorization
      });
    }
  };
  this.isConnected = function() {
    return isConnected;
  };
  return;
});