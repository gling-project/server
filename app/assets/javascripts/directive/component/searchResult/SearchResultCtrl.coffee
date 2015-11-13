myApp.directive 'searchResultCtrl', (directiveService, $location, searchBarService) ->
    restrict: 'E'
    scope: directiveService.autoScope(ngInfo: '=')
    templateUrl: '/assets/javascripts/directive/component/searchResult/template.html'
    replace: true
    transclude: true
    compile: ->
        pre: (scope) ->
        post: (scope) ->
            directiveService.autoScopeImpl scope

            #params
            counter = -1
            scope.indexSelected = null

            scope.$watch 'getInfo().result', ->
                if scope.getInfo().result?
                    counter = -1

                    for business in scope.getInfo().result.businesses
                        business.index = ++counter

                    if scope.getInfo().result.businesses? and scope.getInfo().result.businesses.length > 0 and scope.getInfo().mobile != true
                        scope.seeMoreBusinessIndex = ++counter

                    for publication in scope.getInfo().result.publications
                        publication.index = ++counter

                    if scope.getInfo().result.publications? and scope.getInfo().result.publications.length > 0 and scope.getInfo().mobile != true
                        scope.seeMorePublicationIndex = ++counter

                    for category in scope.getInfo().result.categories
                        category.index = ++counter

                    if scope.getInfo().result.categories? and scope.getInfo().result.categories.length > 0 and scope.getInfo().mobile != true
                        scope.seeMoreCategoryIndex = ++counter

                    scope.seeMoreIndex = ++counter
                else
                    scope.getInfo().display = false
                scope.indexSelected = null

            #key events
            $(document).keydown (e) ->

                #go down
                if e.keyCode == 40
                    if scope.indexSelected == null or scope.indexSelected == counter
                        scope.indexSelected = 0
                    else
                        scope.indexSelected++
                    scope.$apply()

                #go top
                else if e.keyCode == 38
                    if scope.indexSelected == null or scope.indexSelected == 0
                        scope.indexSelected = counter
                    else
                        scope.indexSelected--
                    scope.$apply()

                #enter
                else if e.keyCode == 13
                    if scope.getInfo().result != undefined
                        for business of scope.getInfo().result.businesses
                            if scope.indexSelected == business.index
                                scope.goToBusiness business
                                break
                        for category of scope.getInfo().result.categories
                            if scope.indexSelected == category.index
                                scope.goToCategory category
                                break
                        for publication of scope.getInfo().result.publications
                            if scope.indexSelected == publication.index
                                scope.goToPublication publication
                                break
                        scope.$apply()

                #escape
                else if e.keyCode == 27
                    scope.getInfo().display = false
                    scope.indexSelected = null
                    scope.$apply()

            #click anywhere to close menu
            $(document).click ->
                if !$('#searchContainer').is(':hover')
                    scope.getInfo().display = false
                    scope.indexSelected = null
                    scope.$apply()

            #select a line
            scope.select = (index) ->
                scope.indexSelected = index

            #actions
            scope.seeAll = ->
                scope.navigateTo 'search/' + searchBarService.currentSearch

            scope.goToPublication = (publication) ->
                scope.navigateTo 'business/' + publication.businessId + '/publication/' + publication.id

            scope.goToBusiness = (business) ->
                scope.navigateTo 'business/' + business.id

            scope.seeAllPublication = ->
                scope.navigateTo 'search/publication:' + removeCriteria(searchBarService.currentSearch)

            scope.seeAllBusiness = ->
                scope.navigateTo 'search/business:' + removeCriteria(searchBarService.currentSearch)

            scope.seeAllCategory = ->
                scope.navigateTo 'search/category:' + removeCriteria(searchBarService.currentSearch)

            scope.goToCategory = (category) ->
                target = null
                if category.subSubCategory?
                    target = category.subSubCategory.translationName
                else if category.subCategory?
                    target = category.subCategory.translationName
                else
                    target = category.category.translationName
                scope.navigateTo 'search/category:' + removeCriteria(target)

            removeCriteria = (s) ->
                if s.indexOf(':') != -1
                    s.split(':')[1]
                else
                    s

            #navigate to
            scope.navigateTo = (target) ->
                $location.path target
                scope.$broadcast 'SEARCH_CLEAN'

            #clean search
            scope.$on 'SEARCH_CLEAN', ->
                scope.getInfo().display = false
                scope.getInfo().cleanSearch()