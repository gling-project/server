#admin controller
#display businessCategory and customerInterest
#can edit relation between  both
myApp.controller 'CategoriesAndInterestsCtrl', ($scope, superAdminService,$flash) ->

    #call data
    superAdminService.getCategoriesAndInterests (data) ->

        #import translation
        $scope.importTranslation = ->
            $scope.translationLoading=true
            superAdminService.importTranslation ->
                $scope.translationLoading=false
                $flash.success 'les traductions ont bien été importées'
            , ->
                $scope.translationLoading=false

        #params
        $scope.interests = data.interests
        $scope.categories = data.categories
        $scope.disabled = true

        #get the proirity of the relation category / interest
        $scope.getPriority = (category, interestToFind) ->
            for interest in category.interests
                if interest.interest.name == interestToFind.name
                    return interest.priority
            null

        #search a category
        $scope.$watch 'search', ->
            search = $scope.search
            for category in $scope.categories
                if search? and search != '' and category.name.indexOf(search) == -1
                    category.hide = true
                else
                    category.hide = false
            return

        #get a list of all visible categories
        $scope.getCategoryList = ->
            list = []
            for category in $scope.categories
                if !category.hide == true
                    list.push category
            list

        #save changes
        $scope.save = (event, category, interest) ->
            newValue = event.currentTarget.value
            superAdminService.saveNewCategoryInterestRelation category.name, interest.name, newValue