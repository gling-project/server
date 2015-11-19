myApp.directive 'claimBusinessCtrl', ($flash, facebookService, translationService, directiveService, $timeout, accountService, $location, modalService) ->
    restrict: 'E'
    scope: directiveService.autoScope(ngInfo: '=')
    templateUrl: '/assets/javascripts/directive/form/claimBusiness/template.html'
    replace: true
    transclude: true
    compile: ->
        post: (scope) ->
            directiveService.autoScopeImpl scope

            #form
            scope.fields =
                phone:
                    name: 'phone'
                    fieldTitle: "--.generic.phone"
                    validationRegex: /^[0-9. *-+\/]{6,16}$/
                    validationMessage: '--.validation.dto.phone'
                    disabled: ->
                        return scope.getInfo().disabled
                    field: scope.getInfo().dto,
                    fieldName: 'phone'
                vta:
                    name: 'vta'
                    fieldTitle: "--.business.vta"
                    validationRegex: /^[a-zA-Z0-9\.\- ]{6,20}$/
                    validationMessage: '--.validation.dto.vta'
                    disabled: ->
                        return scope.getInfo().disabled || scope.getInfo().status? == 'PUBLISHED'
                    field: scope.getInfo().dto

            #display loading
            # different ways if mobile version or not
            scope.setLoading = (b) ->
                if scope.getInfo().mobileVersion
                    if b == true
                        modalService.openLoadingModal()
                    else
                        modalService.closeLoadingModal()
                else
                    scope.getInfo().loading = b

            #
            # validation : watching on field
            #
            scope.$watch 'fields', (->
                validation = true
                for key of scope.fields
                    obj = scope.fields[key]
                    if scope.fields.hasOwnProperty(key) and (!obj.isValid? or obj.isValid == false)
                        console.log 'iiiii'
                        obj.firstAttempt = !scope.getInfo().displayErrorMessage
                        validation = false
                scope.getInfo().isValid = validation
            ), true

            #
            # display error watching
            #
            scope.$watch 'getInfo().displayErrorMessage', ->
                for key of scope.fields
                    obj = scope.fields[key]
                    obj.firstAttempt = !scope.getInfo().displayErrorMessage