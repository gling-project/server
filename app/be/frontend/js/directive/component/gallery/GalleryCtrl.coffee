myApp.directive 'galleryCtrl', ($rootScope, directiveService, modalService) ->
    restrict: 'E'
    scope: directiveService.autoScope(ngInfo: '=')
    templateUrl: '/assets/js/directive/component/gallery/template.html'
    replace: true
    transclude: true
    compile: ->
        post: (scope) ->
            directiveService.autoScopeImpl scope

            #open gallery
            scope.openGallery = (image) ->
                modalService.galleryModal image, scope.getInfo().images