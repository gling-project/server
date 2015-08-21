module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cssmin: {
            generated: {
                files: [
                    {
                        dest: 'public/dist/dependencies.min.css',
                        src: ['public/dist/dependencies.css']
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
                            'public/components/angular-bootstrap/ui-bootstrap.min.js',
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
                            'public/javascripts/externalDependence/facebook_sdk.js']
                    },
                    {
                        dest: 'public/dist/dependencies.css',

                        src: ['public/components/angucomplete/angucomplete.css',
                            'public/components/bootstrap/dist/css/bootstrap.min.css',
                            'public/components/bootstrap/dist/css/bootstrap-theme.min.css',
                            'public/components/messenger/build/css/messenger.css',
                            'public/components/angular-bootstrap-datetimepicker/src/css/datetimepicker.css',
                            'public/components/font-awesome/css/font-awesome.min.css',
                            'public/components/ng-table/ng-table.min.css',
                            'public/components/angular-socialshare/angular-socialshare.css']
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
                    'public/dist/mobile.min.js': ['public/dist/mobile.js']
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
                        'public/javascripts/directive/field/dirFieldSelect/directive.js',
                        'public/javascripts/directive/field/dirFieldText/directive.js',
                        'public/javascripts/directive/field/dirFieldTextArea/directive.js',
                        'public/javascripts/directive/technical/dirFocusMe/directive.js',
                        'public/javascripts/directive/technical/dirInputNumber/directive.js',
                        'public/javascripts/directive/field/dirFieldCheck/directive.js',
                        'public/javascripts/directive/field/dirFieldDocument/directive.js',
                        'public/javascripts/directive/field/dirFieldImageMutiple/directive.js',
                        <!-- form -->
                        'public/javascripts/directive/form/login/LoginFormCtrl.js',
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
                        <!-- component -->
                        'public/javascripts/directive/component/publicationList/PublicationListCtrl.js',
                        'public/javascripts/directive/component/schedule/ScheduleCtrl.js',
                        'public/javascripts/directive/component/gallery/GalleryCtrl.js',
                        'public/javascripts/directive/component/googleMapWidget/GoogleMapWidgetCtrl.js',
                        'public/javascripts/directive/component/searchResult/SearchResultCtrl.js',
                        'public/javascripts/directive/component/searchBar/SearchBarCtrl.js',

                        <!-- filters -->
                        'public/javascripts/filter/TranslateTextFilter.js',
                        'public/javascripts/filter/ZeropadFilter.js',
                        'public/javascripts/filter/ImageFilter.js',

                        <!-- controllers -->
                        'public/javascripts/MainCtrl.js',


                        <!-- services -->
                        'public/javascripts/service/DirectiveService.js',
                        'public/javascripts/service/FlashService.js',
                        'public/javascripts/service/GenerateIdService.js',
                        'public/javascripts/service/TranslationService.js',
                        'public/javascripts/service/ModelService.js',
                        'public/javascripts/service/FacebookService.js',
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
                        //TODO ??
                        'public/javascripts/dist/templateCacheWeb.js'
                    ]
                    , 'public/dist/web.js': [
                        'public/components/lodash/lodash.min.js',
                        'public/components/angular-google-maps/dist/angular-google-maps.min.js',
                        'public/components/angular-google-maps/dist/angular-google-maps_dev_mapped.min.js',

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
                        'public/javascripts/modal/AccountFusionFacebookModal/AccountFusionFacebookModal.js',
                        'public/javascripts/modal/CustomerRegistrationModal/CustomerRegistrationModal.js',
                        'public/javascripts/modal/BusinessRegistrationModal/BusinessRegistrationModal.js',
                        'public/javascripts/modal/AddressModal/AddressModal.js',
                        'public/javascripts/modal/EditCustomerInterestModal/EditCustomerInterestModal.js',
                        'public/javascripts/modal/PromotionModal/PromotionModal.js',
                        'public/javascripts/modal/BusinessNotificationModal/BusinessNotificationModal.js',
                        'public/javascripts/modal/OneFieldModal/OneFieldModal.js',
                        'public/javascripts/modal/BasicModal/BasicModal.js',
                        'public/javascripts/modal/MessageModal/MessageModal.js',
                        'public/javascripts/modal/GalleryModal/GalleryModal.js',

                        <!-- controllers -->
                        'public/javascripts/controller/web/WelcomeCtrl.js',
                        'public/javascripts/controller/web/HomeCtrl.js',
                        'public/javascripts/controller/web/BusinessRegistrationCtrl.js',
                        'public/javascripts/controller/web/ProfileCtrl.js',
                        'public/javascripts/controller/web/BusinessCtrl.js',
                        'public/javascripts/controller/web/SearchPageCtrl.js',

                        <!-- component -->
                        'public/javascripts/directive/component/publicationListForBusiness/PublicationListForBusinessCtrl.js',
                        'public/javascripts/directive/component/businessList/BusinessListCtrl.js',
                        'public/javascripts/directive/component/categoryLine/CategoryLineCtrl.js'],
                    'public/dist/mobile.js':[
                        'public/components/lodash/lodash.min.js',
                        'public/components/angular-google-maps/dist/angular-google-maps.min.js',
                        'public/components/angular-google-maps/dist/angular-google-maps_dev_mapped.min.js',
                        'public/components/mobile-angular-ui/dist/js/mobile-angular-ui.min.js',
                        'public/components/mobile-angular-ui/dist/js/mobile-angular-ui.core.min.js',
                        'public/components/mobile-angular-ui/dist/js/mobile-angular-ui.components.min.js',
                        'public/javascripts/routes/mobile-routes.js',
                        'public/javascripts/InitMobile.js',
                        'public/javascripts/modal/ChangePassword/ChangePasswordModal.js',
                        'public/javascripts/modal/AddressModal/AddressModal.js',
                        'public/javascripts/modal/OneFieldModal/OneFieldModal.js',
                        'public/javascripts/controller/mobile/WelcomeCtrl.js',
                        'public/javascripts/controller/mobile/HomeCtrl.js',
                        'public/javascripts/controller/mobile/ForgotPasswordCtrl.js',
                        'public/javascripts/controller/mobile/CustomerRegistrationCtrl.js',
                        'public/javascripts/controller/mobile/BusinessRegistrationCtrl.js',
                        'public/javascripts/controller/mobile/MenuCtrl.js',
                        'public/javascripts/controller/mobile/ProfileCtrl.js',
                        'public/javascripts/controller/mobile/BusinessCtrl.js',
                        'public/javascripts/controller/mobile/SearchPageCtrl.js',
                        'public/javascripts/directive/component/publicationListMobile/PublicationListMobileCtrl.js',
                        'public/javascripts/directive/component/publicationListMobileForBusiness/PublicationListMobileForBusinessCtrl.js',
                        'public/javascripts/directive/mobile/title/MobileTitleCtrl.js'
                    ]
                }
            }
        }
        ,
        html2js: {
            options: {
                base: 'public',
                module: 'app',
                existingModule:true,
                singleModule: true,
                useStrict: true,
                rename:function (moduleName) {
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
            }
            ,
            main: {
                src: ['public/javascripts/**/*.html'],
                dest: 'public/javascripts/dist/templateCacheWeb.js'
            }
        }
    })
    ;

// Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-usemin');


// Default task(s).
    grunt.registerTask('default', [
        'html2js',
        'concat',
        'ngAnnotate',
        'uglify'
        // ,'cssmin'
    ]);

// cache task(s).
    grunt.registerTask('cache', [
        'html2js'
    ]);

}
;
