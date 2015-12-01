myApp.directive 'businessCreationFormCtrl', ($flash, facebookService, translationService, directiveService, $timeout, accountService, businessService) ->
    restrict: 'E'
    scope: directiveService.autoScope(ngInfo: '=')
    templateUrl: '/assets/js/directive/form/businessCreationForm/template.html'
    replace: true
    transclude: true
    compile: ->
        post: (scope) ->
            directiveService.autoScopeImpl scope
            
            #params
            scope.business={}
            scope.businessNameField =
                name: 'name'
                fieldTitle: "--.generic.name"
                validationRegex: "^.{2,50}$"
                validationMessage: ['--.generic.validation.size', '2', '250']
                field: scope.business
                disabled:->
                    return scope.loading
                fieldName: 'name'
            scope.importFromFacebookParam =
                name: 'facebookUrl'
                validationRegex: "^($|https://www.facebook\.com/.*$)"
                validationMessage: '--.generic.validation.facebook'
                fieldTitle: "Facebook"
                field: scope.business
                disabled:->
                    return scope.loading
                fieldName: 'facebookUrl'

            #loading
            scope.setLoading = (b)->
                scope.loading=b

            #create business
            scope.save = ()->
                if !scope.businessNameField.isValid
                    scope.businessNameField.displayErrorMessage = true
                    $flash.error translationService.get('--.generic.error.complete.fields')
                else
                    scope.setLoading true
                    businessService.createBusiness accountService.getMyself().id,scope.business.name,(data)->
                        scope.getInfo().callbackSuccess data
                    , ->
                        scope.loading = false
                        scope.getInfo().callbackFail()

            #import business data from facebook page
            scope.importBusinessFromFacebook = ->
                if !scope.importFromFacebookParam.isValid
                    scope.importFromFacebookParam.displayErrorMessage = true
                    $flash.error $filter('translateText')('--.generic.error.complete.fields')
                else
                    scope.setLoading true
                    urlEncoded=encodeURIComponent scope.business.facebookUrl
                    businessService.importBusinessFormFacebook urlEncoded, (data)->
                        scope.getInfo().callbackSuccess data
                    , ->
                        #callback failed
                        scope.setLoading false
                        scope.getInfo().callbackFail()