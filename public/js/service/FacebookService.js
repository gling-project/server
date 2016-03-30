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
    console.log('LOOOGIN ????');
    if (isConnected) {
      return this.loginToServer(successCallback, callbackError);
    } else {
      console.log('LOOOGIN');
      console.log(FB);
      return FB.login(function(response) {
        var r;
        if (response.status === 'connected') {
          r = '/oauth/access_token?grant_type=fb_exchange_token&client_id=1446672245627002&client_secret=20052ab259a900cdfe062d383fc0329b&fb_exchange_token=' + response.authResponse.accessToken;
          $http({
            'method': 'GET',
            'url': 'https://graph.facebook.com' + r,
            'headers': 'Content-Type:application/json;charset=utf-8'
          }).success(function(data, status) {
            console.log('success');
            console.log(data);
            return $http({
              'method': 'GET',
              'url': 'https://graph.facebook.com/v2.5/me/accounts?' + data,
              'headers': 'Content-Type:application/json;charset=utf-8'
            }).success(function(data, status) {
              console.log('permanent access ??');
              return console.log(data);
            });
          }).error(function(data, status) {
            console.log('error');
            return console.log(data);
          });
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
    var data, expectedAlbumName, myself;
    data = {
      message: publication.title + "\n\n" + publication.description
    };
    myself = accountService.model.myself;
    if (publication.pictures.length > 0) {
      if (myself.type === 'BUSINESS' && (myself.facebookPageToPublish != null) && isConnected) {
        expectedAlbumName = 'publication';
        return FB.api('/' + myself.facebookPageToPublish, 'get', {}, function(response) {
          var pageId;
          console.log('share 2');
          pageId = response.id;
          return FB.login(function(response) {
            var addPhotos;
            console.log('share 4.1');
            console.log(response);
            addPhotos = function(albumId, token) {
              var p, _i, _len, _ref, _results;
              _ref = publication.pictures;
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                p = _ref[_i];
                _results.push(FB.api("/" + albumId + "/photos?access_token=" + token, "POST", {
                  url: $filter('image')(p),
                  caption: data.message
                }, function(response) {
                  console.log('share 6');
                  return console.log(response);
                }));
              }
              return _results;
            };
            return FB.api('/me/accounts', 'get', {}, function(response) {
              var a, albumId, token, _i, _len, _ref, _results;
              console.log('share 3');
              _ref = response.data;
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                a = _ref[_i];
                console.log('share 3.5:' + a.id + '/' + pageId);
                _results.push(a.id === pageId ? (console.log('share 4 !!!!! :' + a.access_token), token = a.access_token, albumId = null, FB.api("/me/albums?access_token=" + token, "GET", {}, function(response) {
                  var d, _i, _len, _ref;
                  _ref = response.data;
                  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    d = _ref[_i];
                    if (d.name === expectedAlbumName) {
                      albumId = d.id;
                      addPhotos(albumId, token);
                      break;
                    }
                  }
                  if (!(albumId != null)) {
                    return FB.api("/me/albums?access_token=" + token, "POST", {
                      name: expectedAlbumName
                    }, function(albumResponse) {
                      console.log('share 5');
                      return addPhotos(albumResponse.id, token);
                    });
                  }
                })) : void 0);
              }
              return _results;
            });
          });
        });
      }
    } else {
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
                _results.push(a.id === pageId ? (console.log('share 4 !!!!! :' + a.access_token), token = a.access_token, FB.api('/me/feed?access_token=' + token, 'get', 'post', data, function(response) {}), console.log('share 5'), console.log(response)) : void 0);
              }
              return _results;
            });
          }, {
            scope: 'manage_pages,publish_pages'
          });
        });
      }
    }
  };
  this.isConnected = function() {
    return isConnected;
  };
  return;
});