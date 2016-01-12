myApp.service('facebookService', function($http, accountService, $locale, languageService, constantService, $flash, $filter) {
  var authResponse, isConnected, _this;
  this.facebookAppId;
  this.facebookAuthorization = 'public_profile,email';
  this.facebookAuthorizationForPublishing = 'manage_pages,publish_pages';
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
        console.log(response);
        if (response.status === 'connected') {
          authResponse = response.authResponse;
          isConnected = true;
          console.log('FB3:' + isConnected);
          return;
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
        scope: this.facebookAuthorization,
        auth_type: 'rerequest'
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
        scope: this.facebookAuthorization,
        auth_type: 'rerequest'
      });
    }
  };
  this.publish = function(publication, successCallback, callbackError) {
    var data, myself;
    data = {
      message: publication.title + "\n\n" + publication.description
    };
    if (publication.pictures.length > 0) {
      data.pictureLink = $filter('image')(publication.pictures[0]);
    }
    myself = accountService.model.myself;
    console.log(data);
    console.log('share 0 : ' + (myself.type === 'BUSINESS') + '/' + (myself.facebookPageToPublish != null) + '/' + isConnected);
    console.log('share 0 : ' + isConnected);
    if (myself.type === 'BUSINESS' && (myself.facebookPageToPublish != null) && isConnected) {
      console.log('share 1');
      return FB.api('/' + myself.facebookPageToPublish, 'get', {}, function(response) {
        var pageId;
        console.log('share 2');
        pageId = response.id;
        return FB.login(function(response) {
          console.log('share 4.1');
          console.log(response);
          return FB.api('/me/accounts', 'get', {}, function(response) {
            var a, token, _i, _len, _ref, _results;
            console.log('share 3');
            _ref = response.data;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              a = _ref[_i];
              console.log('share 3.5:' + a.id + '/' + pageId);
              _results.push(a.id === pageId ? (console.log('share 4 !!!!! :' + a.access_token), token = a.access_token, data.pictureLink != null ? FB.api("/me/photos?access_token=" + token, "POST", {
                url: data.pictureLink,
                caption: data.message
              }, function(response) {
                console.log('share 5');
                return console.log(response);
              }) : (FB.api('/me/feed?access_token=' + token, 'get', 'post', data, function(response) {}), console.log('share 5'), console.log(response))) : void 0);
            }
            return _results;
          });
        }, {
          scope: 'manage_pages,publish_pages'
        });
      });
    }
  };
  this.isConnected = function() {
    return isConnected;
  };
  return;
});