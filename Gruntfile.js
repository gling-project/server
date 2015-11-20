module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cssmin: {
            generated: {
                files: [
                    {
                        dest: 'public/dist/styleDependencies.min.css',
                        src: ['public/dist/styleDependencies.css']
                    },
                    {
                        dest: 'public/dist/styleTown.min.css',
                        src: ['public/dist/styleTown.css']
                    },
                    {
                        dest: 'public/dist/styleMobile.min.css',
                        src: ['public/dist/styleMobile.css']
                    }
                ]
            }
        },
        concat: {
            generated: {
                files: [
                    {
                        dest: 'public/dist/dependencies.js',

                        src: [
                            'public/components/jquery/dist/jquery.min.js',
                            'public/components/angular/angular.min.js',
                            'public/components/angular-route/angular-route.min.js',
                            'public/components/bootstrap/dist/js/bootstrap.min.js',
                            'public/components/messenger/build/js/messenger.min.js',
                            'public/components/moment/min/moment.min.js',
                            //'public/components/angular-bootstrap/ui-bootstrap.min.js',
                            'public/components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                            'public/components/angucomplete/angucomplete.js',
                            'public/components/underscore/underscore-min.js',
                            //TODO remove ?
                            //'public/components/mathjs/dist/math.min.js',
                            'public/components/angular-bootstrap-datetimepicker/src/js/datetimepicker.js',
                            'public/components/angular-i18n/angular-locale_fr-fr.js',
                            'public/components/bootstrap/js/transition.js',
                            'public/components/bootstrap/js/collapse.js',
                            'public/components/ng-file-upload/angular-file-upload-all.min.js',
                            'public/components/ng-file-upload/angular-file-upload-shim.min.js',
                            'public/components/ng-table/ng-table.min.js',
                            'public/components/angular-animate/angular-animate.min.js',
                            'public/components/angularjs-geolocation/dist/angularjs-geolocation.min.js',
                            //TODO useless ?
                            'public/components/angular-timer/dist/angular-timer.min.js',
                            'public/components/humanize-duration/humanize-duration.js',
                            //'public/components/highcharts/highcharts.js',
                            //'public/components/highcharts/highcharts-more.js',
                            'public/components/angular-socialshare/angular-socialshare.js',
                            //TODO ???
                            'public/javascripts/externalDependence/facebook_sdk.js',
                            'public/components/ngmap/build/scripts/ng-map.min.js'
                        ]
                    },
                    {
                        dest: 'public/dist/styleMobile.css',

                        src: [
                            'public/components/mobile-angular-ui/dist/css/mobile-angular-ui-base.min.css',

                            'public/components/angucomplete/angucomplete.css',
                            'public/components/bootstrap/dist/css/bootstrap.min.css',
                            'public/components/bootstrap/dist/css/bootstrap-theme.min.css',
                            'public/components/messenger/build/css/messenger.css',
                            'public/components/angular-bootstrap-datetimepicker/src/css/datetimepicker.css',
                            'public/components/font-awesome/css/font-awesome.min.css',

                            'public/components/angular-socialshare/angular-socialshare.css',
                            'public/css/glingicon.css',
                            'target/scala-2.10/resource_managed/main/public/stylesheets/mobile.css'
                        ]
                    },
                    {


                        dest: 'public/dist/styleDependencies.css',

                        src: ['public/components/angucomplete/angucomplete.css',
                            'public/components/bootstrap/dist/css/bootstrap.min.css',
                            'public/components/bootstrap/dist/css/bootstrap-theme.min.css',
                            'public/components/messenger/build/css/messenger.css',
                            'public/components/angular-bootstrap-datetimepicker/src/css/datetimepicker.css',
                            'public/components/font-awesome/css/font-awesome.min.css',
                            'public/components/ng-table/ng-table.min.css',
                            'public/components/angular-socialshare/angular-socialshare.css',
                            'public/css/glingicon.css',
                            'target/scala-2.10/resource_managed/main/public/stylesheets/main.css',
                            'target/scala-2.10/resource_managed/main/public/stylesheets/web.css']
                    },
                    {
                        dest: 'public/dist/styleTown.css',

                        src: [
                            'public/components/bootstrap/dist/css/bootstrap.min.css',
                            'public/components/bootstrap/dist/css/bootstrap-theme.min.css',
                            'public/components/messenger/build/css/messenger.css',
                            'public/components/font-awesome/css/font-awesome.min.css',
                            'target/scala-2.10/resource_managed/main/public/stylesheets/town.css']
                    }
                ]
            }
        },
        uglify: {
            my_target: {
                files: {
                    'public/dist/dependencies.min.js': ['public/dist/dependencies.js'],
                    'public/dist/common.min.js': ['public/dist/common.js'],
                    'public/dist/web.min.js': ['public/dist/web.js'],
                    'public/dist/mobile.min.js': ['public/dist/mobile.js'],
                    'public/dist/town.min.js': ['public/dist/town.js']
                }
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            myApp: {
                files: {
                    'public/dist/common.js': [
                        <!-- directives -->
                        'public/javascripts/directive/technical/dirEnter/directive.js',
                        'public/javascripts/directive/field/dirFieldDate/directive.js',
                        'public/javascripts/directive/field/dirFieldDateSimple/directive.js',
                        'public/javascripts/directive/field/dirFieldSelect/directive.js',
                        'public/javascripts/directive/field/dirFieldText/directive.js',
                        'public/javascripts/directive/field/dirFieldTextArea/directive.js',
                        'public/javascripts/directive/technical/dirFocusMe/directive.js',
                        'public/javascripts/directive/technical/dirInputNumber/directive.js',
                        'public/javascripts/directive/field/dirFieldCheck/directive.js',
                        'public/javascripts/directive/field/dirFieldDocument/directive.js',
                        'public/javascripts/directive/field/dirFieldImageMutiple/directive.js',
                        'public/javascripts/directive/field/dirFieldImageMultipleResizable/directive.js',
                        'public/javascripts/directive/technical/compile.js',
                        <!-- form -->
                        'target/scala-2.10/resource_managed/main/public/javascripts/directive/form/login/LoginFormCtrl.js',
                        'public/javascripts/directive/form/address/AddressFormCtrl.js',
                        'public/javascripts/directive/form/customerInterest/CustomerInterestFormCtrl.js',
                        'public/javascripts/directive/form/account/AccountFormCtrl.js',
                        'public/javascripts/directive/form/business/BusinessFormCtrl.js',
                        'public/javascripts/directive/form/businessCategory/BusinessCategoryFormCtrl.js',
                        'public/javascripts/directive/form/download/DownloadFormCtrl.js',
                        'public/javascripts/directive/form/promotion/PromotionFormCtrl.js',
                        'public/javascripts/directive/form/businessNotification/BusinessNotificationFormCtrl.js',
                        'public/javascripts/directive/form/schedule/ScheduleFormCtrl.js',
                        'public/javascripts/directive/form/image/ImageFormCtrl.js',
                        'public/javascripts/directive/form/businessSocialNetwork/BusinessSocialNetworkCtrl.js',
                        'public/javascripts/directive/form/contact/ContactFormCtrl.js',
                        'target/scala-2.10/resource_managed/main/public/javascripts/directive/form/claimBusiness/ClaimBusinessCtrl.js',
                        <!-- component -->
                        'target/scala-2.10/resource_managed/main/public/javascripts/directive/component/schedule/ScheduleCtrl.js',
                        'target/scala-2.10/resource_managed/main/public/javascripts/directive/component/gallery/GalleryCtrl.js',
                        'target/scala-2.10/resource_managed/main/public/javascripts/directive/component/googleMapWidget/GoogleMapWidgetCtrl.js',
                        'target/scala-2.10/resource_managed/main/public/javascripts/directive/component/searchResult/SearchResultCtrl.js',
                        'target/scala-2.10/resource_managed/main/public/javascripts/directive/component/searchBar/SearchBarCtrl.js',
                        'target/scala-2.10/resource_managed/main/public/javascripts/directive/component/followWidget/FollowWidgetCtrl.js',
                        'target/scala-2.10/resource_managed/main/public/javascripts/directive/component/followWidgetForPublication/FollowWidgetForPublicationCtrl.js',
                        'target/scala-2.10/resource_managed/main/public/javascripts/directive/component/facebookSharePublication/FacebookSharePublicationCtrl.js',

                        <!-- filters -->
                        'public/javascripts/filter/TranslateTextFilter.js',
                        'public/javascripts/filter/TextFilter.js',
                        'public/javascripts/filter/ZeropadFilter.js',
                        'public/javascripts/filter/ImageFilter.js',

                        <!-- controllers -->
                        'public/javascripts/MainCtrl.js',
                        'public/javascripts/controller/legal.js',


                        <!-- services -->
                        'public/javascripts/service/DirectiveService.js',
                        'public/javascripts/service/GenerateIdService.js',
                        'public/javascripts/service/TranslationService.js',
                        'public/javascripts/service/ModelService.js',
                        'target/scala-2.10/resource_managed/main/public/javascripts/service/FacebookService.js',
                        'public/javascripts/service/LanguageService.js',
                        'public/javascripts/service/CustomerInterestService.js',
                        'public/javascripts/service/AccountService.js',
                        'public/javascripts/service/BusinessCategoryService.js',
                        'public/javascripts/service/BusinessService.js',
                        'public/javascripts/service/ModalService.js',
                        'public/javascripts/service/PromotionService.js',
                        'public/javascripts/service/GeolocationService.js',
                        'public/javascripts/service/BusinessNotificationService.js',
                        'public/javascripts/service/AddressService.js',
                        'public/javascripts/service/FollowService.js',
                        'public/javascripts/service/SearchService.js',
                        'public/javascripts/service/SearchBarService.js',
                        'public/javascripts/service/PublicationService.js',
                        'public/javascripts/service/ConstantService.js',
                        'public/javascripts/service/ContactService.js',
                        'public/javascripts/service/FileService.js',
                        'public/javascripts/service/ImageService.js',
                        'target/scala-2.10/resource_managed/main/public/javascripts/service/MapService.js',
                        //TODO ??
                        'public/javascripts/dist/templateCacheWeb.js',
                        'public/javascripts/modal/BasicModal/BasicModal.js',

                        <!-- tool -->
                        'public/javascripts/tool/imageTool/ImageToolCtrl.js',

                        <!-- modal -->
                        'public/javascripts/modal/ConfirmAndShareModal/ConfirmAndShareModal.js'
                    ]
                    , 'public/dist/web.js': [
                        'public/components/lodash/lodash.min.js',

                        <!-- routes -->
                        'public/javascripts/routes/web-routes.js',

                        <!-- init -->
                        'public/javascripts/Init.js',

                        <!-- modals -->
                        'public/javascripts/modal/LoginModal/LoginModal.js',
                        'public/javascripts/modal/ChangePassword/ChangePasswordModal.js',
                        'public/javascripts/modal/ForgotPasswordModal/ForgotPasswordModal.js',
                        'public/javascripts/modal/HelpModal/HelpModalCtrl.js',
                        'public/javascripts/modal/DownloadFieldModal/DownloadFieldModal.js',
                        'target/scala-2.10/resource_managed/main/public/javascripts/modal/CustomerRegistrationModal/CustomerRegistrationModal.js',
                        'target/scala-2.10/resource_managed/main/public/javascripts/modal/BusinessRegistrationModal/BusinessRegistrationModal.js',
                        'public/javascripts/modal/AddressModal/AddressModal.js',
                        'public/javascripts/modal/EditCustomerInterestModal/EditCustomerInterestModal.js',
                        'public/javascripts/modal/PromotionModal/PromotionModal.js',
                        'public/javascripts/modal/BusinessNotificationModal/BusinessNotificationModal.js',
                        'public/javascripts/modal/OneFieldModal/OneFieldModal.js',
                        'public/javascripts/modal/BasicModal/BasicModal.js',
                        'public/javascripts/modal/MessageModal/MessageModal.js',
                        'public/javascripts/modal/GalleryModal/GalleryModal.js',
                        'public/javascripts/modal/IframeModal/IframeModal.js',

                        <!-- controllers -->
                        'public/javascripts/controller/web/HomeCtrl.js',
                        'target/scala-2.10/resource_managed/main/public/javascripts/controller/web/ProfileCtrl.js',
                        'target/scala-2.10/resource_managed/main/public/javascripts/controller/web/BusinessCtrl.js',
                        'public/javascripts/controller/web/SearchPageCtrl.js',
                        'public/javascripts/controller/web/FollowedBusinessPageCtrl.js',
                        'target/scala-2.10/resource_managed/main/public/javascripts/controller/web/MapCtrl.js',

                        <!-- component -->
                        'target/scala-2.10/resource_managed/main/public/javascripts/directive/component/publicationList/PublicationListCtrl.js',
                        'target/scala-2.10/resource_managed/main/public/javascripts/directive/component/publicationWidget/PublicationWidgetCtrl.js',
                        'target/scala-2.10/resource_managed/main/public/javascripts/directive/component/publicationListForBusiness/PublicationListForBusinessCtrl.js',
                        'target/scala-2.10/resource_managed/main/public/javascripts/directive/component/businessList/BusinessListCtrl.js',
                        'target/scala-2.10/resource_managed/main/public/javascripts/directive/component/categoryLine/CategoryLineCtrl.js',
                        'target/scala-2.10/resource_managed/main/public/javascripts/directive/component/map/businessForMap/BusinessForMapCtrl.js',
                        'target/scala-2.10/resource_managed/main/public/javascripts/directive/component/map/publicationForMap/PublicationForMapCtrl.js',
                        'public/javascripts/directive/web/headerBar/HeaderBarCtrl.js',
                        'public/javascripts/directive/web/footerBar/FooterBarCtrl.js',
                        'target/scala-2.10/resource_managed/main/public/javascripts/directive/component/toTop/ToTopCtrl.js',

                        <!-- service -->
                        'public/javascripts/service/FlashService.js'],
                    'public/dist/mobile.js': [
                        'public/components/lodash/lodash.min.js',
                        'public/components/mobile-angular-ui/dist/js/mobile-angular-ui.min.js',
                        'public/components/mobile-angular-ui/dist/js/mobile-angular-ui.core.min.js',
                        'public/components/mobile-angular-ui/dist/js/mobile-angular-ui.components.min.js',
                        'public/javascripts/routes/mobile-routes.js',
                        'public/javascripts/InitMobile.js',

                        <!-- modal -->
                        'public/javascripts/modal/ChangePassword/ChangePasswordModal.js',
                        'public/javascripts/modal/AddressModal/AddressModal.js',
                        'public/javascripts/modal/OneFieldModal/OneFieldModal.js',
                        'public/javascripts/modal/mobile/AlertModal/AlertMessage.js',
                        'public/javascripts/modal/mobile/LoadingModal/LoadingModal.js',
                        'public/javascripts/modal/mobile/InterestSelectionModal/InterestSelectionModal.js',
                        'public/javascripts/modal/MessageModal/MessageModal.js',
                        'public/javascripts/directive/mobile/galleryMobile/GalleryMobileCtrl.js',
                        'public/javascripts/modal/ResizeImageMobileModal/ResizeImageMobileModal.js',

                        <!-- controller -->
                        'target/scala-2.10/resource_managed/main/public/javascripts/controller/mobile/WelcomeCtrl.min.js',
                        'target/scala-2.10/resource_managed/main/public/javascripts/controller/mobile/HomeCtrl.min.js',
                        'target/scala-2.10/resource_managed/main/public/javascripts/controller/mobile/ForgotPasswordCtrl.min.js',
                        'target/scala-2.10/resource_managed/main/public/javascripts/controller/mobile/CustomerRegistrationCtrl.min.js',
                        'target/scala-2.10/resource_managed/main/public/javascripts/controller/mobile/MenuCtrl.min.js',
                        'target/scala-2.10/resource_managed/main/public/javascripts/controller/mobile/ProfileCtrl.min.js',
                        'target/scala-2.10/resource_managed/main/public/javascripts/controller/mobile/BusinessCtrl.min.js',
                        'target/scala-2.10/resource_managed/main/public/javascripts/controller/mobile/SearchPageCtrl.min.js',
                        'target/scala-2.10/resource_managed/main/public/javascripts/controller/mobile/FollowedBusinessPageCtrl.min.js',
                        'target/scala-2.10/resource_managed/main/public/javascripts/controller/mobile/PromotionCtrl.min.js',
                        'target/scala-2.10/resource_managed/main/public/javascripts/controller/mobile/BusinessNotificationCtrl.min.js',

                        <!-- component -->
                        'target/scala-2.10/resource_managed/main/public/javascripts/directive/component/businessListMobile/BusinessListMobileCtrl.js',
                        'target/scala-2.10/resource_managed/main/public/javascripts/directive/component/publicationListMobile/PublicationListMobileCtrl.js',
                        'target/scala-2.10/resource_managed/main/public/javascripts/directive/component/publicationListMobileForBusiness/PublicationListMobileForBusinessCtrl.js',
                        'public/javascripts/directive/mobile/headerSearch/HeaderSearchCtrl.js',
                        'public/javascripts/directive/mobile/title/MobileTitleCtrl.js',
                        'target/scala-2.10/resource_managed/main/public/javascripts/directive/component/categoryLine/CategoryLineCtrl.js',
                        'target/scala-2.10/resource_managed/main/public/javascripts/directive/component/publicationWidgetForMobile/PublicationWidgetCtrl.js',

                        <!-- service -->
                        'public/javascripts/service/mobile/FlashService.js',

                    ],
                    'public/dist/town.js': [
                        'public/components/jquery/dist/jquery.min.js',
                        'public/components/angular/angular.min.js',
                        'public/components/bootstrap/dist/js/bootstrap.min.js',
                        'public/components/messenger/build/js/messenger.min.js',
                        'public/components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                        'public/components/angular-i18n/angular-locale_fr-fr.js',
                        'public/components/bootstrap/js/transition.js',
                        'public/components/ngmap/build/scripts/ng-map.min.js',
                        'public/javascripts/InitTown.js',
                        'public/javascripts/service/town/TownService.js',
                        'public/javascripts/service/FlashService.js',
                        'public/javascripts/service/DirectiveService.js',
                        'public/javascripts/service/TranslationService.js',
                        'public/javascripts/service/ConstantService.js',
                        'public/javascripts/filter/ImageFilter.js',
                        'public/javascripts/filter/TranslateTextFilter.js',
                        'public/javascripts/modal/GalleryModal/GalleryModal.js',
                        'public/javascripts/TownMainCtrl.js',
                        'public/javascripts/directive/town/townBusiness/TownBusinessCtrl.js',
                        'public/javascripts/directive/town/newsFeedForTown/NewsFeedForTownCtrl.js',
                        'public/javascripts/directive/town/publicationListForTown/PublicationListForTownCtrl.js',
                        'target/scala-2.10/resource_managed/main/public/javascripts/directive/component/categoryLine/CategoryLineCtrl.js',
                        'public/javascripts/dist/templateCacheWeb-town.js'
                    ]
                }
            }
        }
        ,
        html2js: {
            options: {
                base: 'public',
                module: 'app',
                existingModule: true,
                singleModule: true,
                useStrict: true,
                rename: function (moduleName) {
                    return moduleName.replace('javascripts/', '/assets/javascripts/');
                },
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                }
            },
            main: {
                src: ['public/javascripts/**/*.html'],
                dest: 'public/javascripts/dist/templateCacheWeb.js'
            },
            town: {
                src: ['public/javascripts/directive/town/publicationListForTown/template.html',
                    'public/javascripts/directive/town/townBusiness/template.html',
                    'public/javascripts/directive/town/newsFeedForTown/template.html',
                    'public/javascripts/modal/GalleryModal/view.html'
                ],
                dest: 'public/javascripts/dist/templateCacheWeb-town.js'
            }
        },
        sprite: {
            all: {
                src: 'public/images/interest/*.png',
                dest: 'public/images/dist/interest.png',
                destCss: 'public/dist/sprites.css'
            },
            data: {
                spritesheet: {}
            }
        },
        jasmine: {
            pivotal: {
                src: [
                    'public/dist/dependencies.min.js',
                    'public/components/angular-mocks/angular-mocks.js',
                    'public/dist/web.min.js',
                    'public/dist/common.min.js',
                    'public/javascripts/tests/**/*.js'
                ]
            }
        },
        rename: {
            styleDependencies: {
                src: 'public/dist/styleDependencies.min.css',
                dest: 'public/dist/styleDependencies.final.css'
            },
            styleTown: {
                src: 'public/dist/styleTown.min.css',
                dest: 'public/dist/styleTown.final.css'
            },
            styleMobile: {
                src: 'public/dist/styleMobile.css',
                dest: 'public/dist/styleMobile.final.css'
            },
            common: {
                src: 'public/dist/common.js',
                dest: 'public/dist/common.final.js'
            },
            web: {
                src: 'public/dist/web.js',
                dest: 'public/dist/web.final.js'
            },
            dependencies: {
                src: 'public/dist/dependencies.js',
                dest: 'public/dist/dependencies.final.js'
            },
            mobile: {
                src: 'public/dist/mobile.js',
                dest: 'public/dist/mobile.final.js'
            },
            town: {
                src: 'public/dist/town.js',
                dest: 'public/dist/town.final.js'
            }
        }
    });

// Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-rename');


// Default task(s).
    grunt.registerTask('default', [
        'html2js',
        'concat',
        'ngAnnotate',
        'uglify',
        'cssmin',
        'rename'
    ]);

// cache task(s).
    grunt.registerTask('cache', [
        'html2js'
    ]);

    grunt.registerTask('start-sprite', [
        'sprite'
    ]);

    grunt.registerTask('time', [
        'timestamp'
    ]);

    grunt.registerTask('test', [
        'rename'
    ]);

}
;
