myApp.controller('BusinessCtrl', function($rootScope, $scope, modalService, businessService, $routeParams, accountService, $window, addressService, geolocationService, translationService, $flash, $timeout, contactService, $filter, constantService) {
  if ($routeParams.publicationId !== null) {
    $scope.publicationIdToGo = $routeParams.publicationId;
  }
  $scope.displayError = false;
  $scope.loading = true;
  $scope.business = null;
  $scope.edit = false;
  $scope.myBusiness = false;
  $scope.businessId = $routeParams.businessId;
  $scope.descriptionLimitBase = 200;
  $scope.descriptionLimit = $scope.descriptionLimitBase;
  if (accountService.model.myself != null) {
    $scope.myself = accountService.model.myself;
  } else {
    $scope.$watch(function() {
      return accountService.model;
    }, function(n) {
      if ((n != null) && accountService.model.myself) {
        return $scope.myself = accountService.model.myself;
      }
    }, true);
  }
  $scope.publicationOptions = [
    {
      key: 'BASIC',
      value: '--.business.publication.basic'
    }, {
      key: 'ARCHIVE',
      value: '--.business.publication.archive'
    }
  ];
  $scope.googleMapParams = {
    staticMap: true
  };
  $scope.displayEditMode = function() {
    return $scope.myBusiness === true || ((accountService.getMyself() != null) && accountService.getMyself().role === 'SUPERADMIN');
  };
  $scope.publicationListParam = {
    scrollTo: $scope.publicationIdToGo,
    displayRemoveIcon: $scope.edit,
    type: 'BASIC',
    businessId: $routeParams.businessId
  };
  $scope.$watch('edit', function() {
    return $scope.publicationListParam.displayRemoveIcon = $scope.edit;
  });
  businessService.getBusiness($routeParams.businessId, function(data) {
    $scope.loading = false;
    $scope.business = data;
    $scope.publicationListParam.business = $scope.business;
    $scope.$watch('business.businessStatus', function() {
      if ((accountService.getMyself() != null) && constantService.compareNumber(accountService.getMyself().businessId, $routeParams.businessId)) {
        if ($scope.business.businessStatus !== 'WAITING_CONFIRMATION') {
          $scope.edit = true;
        }
        $scope.myBusiness = true;
      }
      if ($scope.myBusiness) {
        return $scope.publicationOptions.push({
          key: 'PREVISUALIZATION',
          value: '--.business.publication.previsualization'
        });
      }
    });
    $scope.computeDistance = function() {
      if ($scope.business.address != null) {
        addressService.distance($scope.business.address.id, function(data) {
          $scope.business.distance = data.distance;
          return;
        });
      }
      return;
    };
    $scope.computeDistance();
    $scope.$on('POSITION_CHANGED', function() {
      return $scope.computeDistance();
    });
    $scope.publish = function() {
      return modalService.messageModal('--.business.page.askPublication.window.title', '--.business.page.askPublication.window.message', function(close) {
        businessService.publishBusiness();
        close();
        $flash.info(translationService.get('--.business.page.askPublication.window.flash'));
        return $scope.business.businessStatus = 'WAITING_CONFIRMATION';
      });
    };
    $scope.cancelPublishRequest = function() {
      return modalService.messageModal('--.business.page.cancelPublishRequest.window.title', '--.business.page.cancelPublishRequest.window.message', function(close) {
        businessService.cancelPublishRequest();
        close();
        $flash.info(translationService.get('--.business.page.cancelPublishRequest.window.flash'));
        return $scope.business.businessStatus = 'NOT_PUBLISHED';
      });
    };
    $scope.stopPublish = function() {
      return modalService.messageModal('--.business.page.stopPublication.window.title', '--.business.page.stopPublication.window.message', function(close) {
        businessService.stopPublication();
        close();
        $flash.info(translationService.get('--.business.page.stopPublication.window.flash'));
        return $scope.business.businessStatus = 'NOT_PUBLISHED';
      });
    };
    $scope.editbusiness = function() {
      var business;
      business = angular.copy($scope.business);
      return modalService.basicModal('--.business.edit.data.modal.title', 'business-form-ctrl', {
        dto: business,
        status: business.businessStatus
      }, function(close, setLoading) {
        return businessService.edit(business, (function(data) {
          $scope.business.name = data.name;
          $scope.business.description = data.description;
          $scope.business.phone = data.phone;
          $scope.business.website = data.website;
          $scope.business.email = data.email;
          return close();
        }), function() {
          return setLoading(false);
        });
      });
    };
    $scope.editIllustration = function() {
      var business;
      business = angular.copy($scope.business);
      return modalService.basicModal('--.business.edit.illustration.modal.title', 'image-form-ctrl', {
        dto: business,
        target: 'business_illustration',
        fieldName: 'illustration',
        details: '--.business.logo.edit.modal.description'
      }, function(close, setLoading) {
        return businessService.editIllustration(business.id, business.illustration, (function() {
          $scope.business.illustration = business.illustration;
          close();
          return;
        }), function() {
          return setLoading(false);
        });
      });
    };
    $scope.editLandscape = function() {
      var business;
      business = angular.copy($scope.business);
      return modalService.basicModal('--.business.edit.landscape.modal.title', 'image-form-ctrl', {
        dto: business,
        target: 'business_landscape',
        fieldName: 'landscape',
        details: '--.business.landscape.edit.modal.description'
      }, function(close, setLoading) {
        return businessService.editLandscape(business.id, business.landscape, (function() {
          $scope.business.landscape = business.landscape;
          return close();
        }), function() {
          return setLoading(false);
        });
      });
    };
    $scope.googleMapParams.address = $scope.business.address;
    $timeout((function() {
      if ($scope.business.address != null) {
        return $scope.googleMapParams.refreshNow();
      }
    }), 1);
    $scope.editAddress = function() {
      var address;
      if ($scope.business.businessStatus === 'PUBLISHED') {
        return $flash.success($filter('translateText')('--.business.error.editAddress.wrongStatus'));
      } else {
        address = angular.copy($scope.business.address);
        if (!(address != null)) {
          address = {};
        }
        return modalService.basicModal('--.business.edit.address.modal.title', 'address-form-ctrl', {
          dto: address,
          addName: false
        }, function(close, setLoading) {
          return businessService.editAddress($scope.business.id, address, function(data) {
            $scope.business.address = data;
            $scope.googleMapParams.address = data;
            return close();
          }, function() {
            return setLoading(false);
          });
        });
      }
    };
    $scope.categoryLineParams = {
      categories: $scope.business.categories
    };
    $scope.editCategory = function() {
      var catList, k, k2, k3, lev2, lev3, lev4, _ref;
      catList = [];
      _ref = $scope.business.categories;
      for (k in _ref) {
        lev2 = _ref[k];
        for (k2 in lev2) {
          lev3 = lev2[k2];
          for (k3 in lev3) {
            lev4 = lev3[k3];
            catList.push(lev4);
          }
        }
      }
      return modalService.basicModal('--.business.edit.category.modal.title', 'business-category-form-ctrl', {
        value: catList
      }, function(close, setLoading) {
        return businessService.editBusinessCategory($scope.business.id, catList, function(data) {
          $scope.business.categories = data.categories;
          $scope.categoryLineParams.categories = $scope.business.categories;
          return close();
        }, function() {
          return setLoading(false);
        });
      });
    };
    $scope.editSchedule = function() {
      var schedules;
      schedules = angular.copy($scope.business.schedules);
      return modalService.basicModal('--.business.edit.schedule.modal.title', 'schedule-form-ctrl', {
        dto: schedules,
        disabled: false
      }, function(close, setLoading) {
        return businessService.createSchedule($scope.business.id, {
          schedules: schedules
        }, function(data) {
          $scope.business.schedules = schedules;
          return close();
        }, function() {
          return setLoading(false);
        });
      });
    };
    $scope.editGallery = function() {
      var business;
      business = angular.copy($scope.business);
      return modalService.basicModal('--.business.edit.address.modal.title', 'dir-field-image-mutiple', {
        fieldTitle: '--.business.modal.gallery.title',
        validationMessage: '--.error.validation.image',
        help: '--.business.gallery.download.help',
        details: '--gallery.maximumImage',
        field: business,
        maxImage: 10,
        multiple: true,
        target: 'galley_picture',
        fieldName: 'galleryPictures'
      }, function(close, setLoading) {
        return businessService.editGallery($scope.business.id, {
          list: business.galleryPictures
        }, function(data) {
          $scope.business.galleryPictures = data;
          return close();
        }, function() {
          return setLoading(false);
        });
      });
    };
    $scope.editSocialNetwork = function() {
      var socialNetwork;
      socialNetwork = angular.copy($scope.business.socialNetwork);
      if (!(socialNetwork != null)) {
        socialNetwork = {};
      }
      return modalService.basicModal('--.business.edit.socialNetwork.modal.title', 'business-social-network-ctrl', {
        dto: socialNetwork
      }, function(close, setLoading) {
        return businessService.editSocialNetwork($scope.business.id, socialNetwork, function(data) {
          $scope.business.socialNetwork = socialNetwork;
          accountService.getMyself().facebookPageToPublish = $scope.business.socialNetwork.facebookLink;
          return close();
        }, function() {
          return setLoading(false);
        });
      });
    };
    $scope.createPromotion = function() {
      return modalService.openPromotionModal(null, $scope.business, function() {
        return $scope.$broadcast('RELOAD_PUBLICATION');
      });
    };
    $scope.createNotification = function() {
      return modalService.openBusinessNotificationModal(null, $scope.business, function() {
        return $scope.$broadcast('RELOAD_PUBLICATION');
      });
    };
    $scope.$on('POSITION_CHANGED', function() {
      $scope.$broadcast('RELOAD_PUBLICATION');
      return;
    });
    $scope.$watch('publicationListParam.type', function(o, n) {
      if (o !== n) {
        return $scope.$broadcast('RELOAD_PUBLICATION');
      }
    });
    $scope.refreshPublications = function() {
      return $scope.$broadcast('RELOAD_PUBLICATION');
    };
    $scope.$on('RELOAD_PUBLICATION', function() {
      return $scope.publicationListParam.refresh($scope.publicationListParam.type);
    });
    $scope.numberCategories = function() {
      return Object.keys($scope.business.categories).length;
    };
    if (geolocationService.currentPosition != null) {
      $scope.$broadcast('RELOAD_PUBLICATION');
    }
    $scope.displaySchedule = function() {
      var key;
      for (key in $scope.business.schedules) {
        if ($scope.business.schedules[key].length > 0) {
          return true;
        }
      }
      return false;
    };
    $scope.displaySocialNetwork = function() {
      var s;
      s = $scope.business.socialNetwork;
      if (!(s != null)) {
        return false;
      }
      return (s.facebookLink != null) || (s.twitterLink != null) || (s.instagramLink != null) || (s.deliveryLink != null) || (s.opinionLink != null) || (s.reservationLink != null) || (s.pinterestLink != null) || (s.googlePlusLink != null);
    };
    $scope.computeProgression = function() {
      var total;
      total = 0;
      if ($scope.business.address != null) {
        total++;
      }
      if ($scope.numberCategories() > 0) {
        total++;
      }
      if ($scope.business.description != null) {
        total++;
      }
      if ($scope.business.illustration != null) {
        total++;
      }
      if ($scope.business.landscape != null) {
        total++;
      }
      if ($scope.business.galleryPictures.length > 0) {
        total++;
      }
      if ($scope.displaySocialNetwork()) {
        total++;
      }
      if ($scope.displaySchedule()) {
        total++;
      }
      return total;
    };
    $scope.getProgressionStyle = function() {
      return 'width:' + 300 * $scope.computeProgression() / 5 + 'px';
    };
    $scope.tryClaimBusiness = function() {
      if (accountService.getMyself() != null) {
        return $scope.claimBusiness();
      } else {
        return modalService.openLoginModal($scope.claimBusiness, null, '--.loginModal.help.claimBusiness');
      }
    };
    $scope.claimBusiness = function() {
      var dto;
      dto = {};
      return modalService.basicModal('--.business.claim.modal.title', 'claim-business-ctrl', {
        dto: dto
      }, function(close, setLoading) {
        return businessService.claimBusiness($scope.business.id, dto.phone, dto.vta, function() {
          $flash.success($filter('translateText')('--.business.claim.modal.success'));
          close();
          accountService.model.myself.claimedBusinessId = $scope.business.id;
          $scope.myself.claimedBusinessId = $scope.business.id;
          return setLoading(false);
        }, function() {
          return setLoading(false);
        });
      });
    };
    return $scope.openContact = function() {
      var dto;
      dto = {
        target: 'HELP'
      };
      return modalService.basicModal('--.contactForm.modal.title', 'contact-form-ctrl', {
        dto: dto
      }, function(close, setLoading) {
        return contactService.contact(dto, function() {
          $flash.success($filter('translateText')('--.contactForm.send.success'));
          close();
          return setLoading(false);
        }, function() {
          return setLoading(false);
        });
      });
    };
  }, function() {
    $scope.loading = false;
    return $scope.displayError = true;
  });
  $(window).scrollTop(0);
  return $rootScope.$broadcast('PROGRESS_BAR_STOP');
});