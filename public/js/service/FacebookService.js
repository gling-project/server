myApp.service('facebookService', function($http, accountService, $locale, languageService, constantService, $flash, $filter) {
  var authResponse, isConnected, _this;
  this.facebookAppId;
  this.facebookAuthorization = 'public_profile,email';
  isConnected = false;
  authResponse = null;
  _this = this;
  this.ini = function() {
    window.fbAsyncInit = function() {
      FB.init({
        appId: _this.facebookAppId,
        cookie: true,
        xfbml: true,
        version: 'v2.5'
      });
      console.log('FB1');
      return FB.getLoginStatus(function(response) {
        console.log('FB2');
        if (response.status === 'connected') {
          console.log('FB3');
          return isConnected = true;
        }
      });
    };
    return (function(d, s, id) {
      var fjs, js;
      js = void 0;
      fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
      return;
    })(document, 'script', 'facebook-jssdk');
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
    console.log("response");
    console.log(access_token + '/' + user_id);
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
  this.linkToAccount = function(callbackSuccess, callbackError) {
    var linkFct;
    linkFct = function(accessTokenToLink, facebookId) {
      return $http({
        'method': 'GET',
        'url': '/rest/login/facebook/' + accessTokenToLink + '/' + facebookId,
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
    if (isConnected) {
      return linkFct(authResponse.accessToken, authResponse.userID);
    } else {
      return FB.login(function(response) {
        if (response.status === 'connected') {
          authResponse = response.authResponse;
          isConnected = true;
          return linkFct(authResponse.accessToken, authResponse.userID);
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
  this.login = function(successCallback, callbackError) {
    if (isConnected) {
      return this.loginToServer(successCallback, callbackError);
    } else {
      console.log('LOOOGIN');
      console.log(FB);
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
  this.publish = function(publication, successCallback, callbackError) {
    return this.sharePublication(publication.businessId, publication.id);
  };
  this.isConnected = function() {
    return isConnected;
  };
  return;
});