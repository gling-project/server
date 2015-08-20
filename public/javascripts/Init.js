var myApp = angular.module('app', [
        'ngAnimate',
        'ui.bootstrap',
        'ui.bootstrap.datetimepicker',
        "angucomplete",
        'angularFileUpload',
        'ngRoute',
        'ngTable',
        'geolocation',
        'timer',
        'uiGmapgoogle-maps',
        'djds4rce.angular-socialshare']
);

myApp.run(function($templateCache) {
    $templateCache.put('/assets/javascripts/view/web/home.html','<div class="content-block">    <div style="vertical-align: top">    <div style="display: inline-block;width:71%;vertical-align: top">    <div class="home-interest-switch home-interest-box" ng-show="accountService.myself != null">        <!-- switch -->    <div>    <label class="glyphicon glyphicon-home"></label>    </div>    <div>    <div class="onoffswitch">    <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch"    checked ng-model="followedMode">    <label class="onoffswitch-label" for="myonoffswitch">    <span class="onoffswitch-inner"></span>    <span class="onoffswitch-switch"></span>    </label>    </div>    </div>    <div>    <label class="glyphicon glyphicon-heart-empty"></label>    </div>    </div>        <!-- interest -->    <div class="home-interest-box">    <button class="home-interest" ng-repeat="interest in customerInterests"    ng-show="interest.iconName!=null"    ng-click="searchByInterest(interest)"    ng-class="{\'selected\':interest.selected === true}">    <img ng-src="/assets/images/interest/{{interest.iconName}}" style="width:50px"/>    </button>    </div>    <publication-list-ctrl ng-info="publicationListCtrl"></publication-list-ctrl>    </div>    <div style="display: inline-block;width:28%;vertical-align: top">    <div class="temp-box"    ng-show="accountService.getMyself()==null">    <div>Sign up to follow you favorite shops, benefit to awesome promotion</div>    <button class="btn btn-default" style="color: #000000" ng-click="customerRegistration()">Sign up now !    </button>    </div>    <div class="temp-box"    ng-show="accountService.getMyself()==null">    <div>You have a business and you want to communique directly with your customer ? commencez now for free,                                                                                                        and        discover you pricing !    </div>    <button class="btn btn-default" style="color: #000000" ng-click="navigateTo(\'/business_registration\')">    {{\'--.home.toBusiness.btn\' | translateText}}</button></div>    <!--<div class="temp-box"-->    <!--ng-show="accountService.getMyself()!=null && accountService.getMyself().type == \'BUSINESS\'">--><!--<div>You are a business !</div>-->    <!--<button class="btn btn-default" style="color: #000000" ng-click="navigateTo(\'/business\')">Access to my-->    <!--business--><!--</button>--><!--</div>--></div></div></div>');
});

//myApp.config(function($locationProvider){
//    $locationProvider.html5Mode(true).hashPrefix('!');
//});