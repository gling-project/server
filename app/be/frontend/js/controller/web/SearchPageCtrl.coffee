myApp.controller 'SearchPageCtrl', ($rootScope, $scope, searchService, $routeParams, searchBarService, geolocationService) ->
    #params
    param = $routeParams.param
    searchBarService.setCurrentSearch param
    $scope.businessTab = currentPage: 0
    $scope.categoryTab = currentPage: 0
    $scope.publicationTab = currentPage: 0
    $scope.results = null

    $scope.init = ->
        searchService.searchByString 0, param, (result) ->
            #compute witch tab must be displayed
            $scope.businessTab.display = false
            $scope.categoryTab.display = false
            $scope.publicationTab.display = false
            selectedCounter = 0
            for i of searchBarService.searchCriteria
                if searchBarService.searchCriteria[i].selected
                    if searchBarService.searchCriteria[i].key == 'business'
                        $scope.businessTab.display = true
                    else if searchBarService.searchCriteria[i].key == 'category'
                        $scope.categoryTab.display = true
                    else if searchBarService.searchCriteria[i].key == 'publication'
                        $scope.publicationTab.display = true
                    selectedCounter++
            if selectedCounter == 0
                $scope.businessTab.display = true
                $scope.categoryTab.display = true
                $scope.publicationTab.display = true
            $scope.results = result
            #compute tabs
            alreadyOneTabActive = false
            if $scope.businessTab.display
                $scope.businessTab.total = $scope.results.businesses.length
                if !alreadyOneTabActive and $scope.businessTab.total > 0
                    $scope.businessTab.active = true
                    alreadyOneTabActive = true
                $scope.businessTab.totalToDisplay = $scope.businessTab.total
                if $scope.results.businesses.length == 20
                    $scope.businessTab.totalToDisplay += '+'
            if $scope.publicationTab.display
                $scope.publicationTab.total = $scope.results.publications.length
                if !alreadyOneTabActive and $scope.publicationTab.total > 0
                    $scope.publicationTab.active = true
                    alreadyOneTabActive = true
                $scope.publicationTab.totalToDisplay = $scope.publicationTab.total
                if $scope.results.publications.length == 20
                    $scope.publicationTab.totalToDisplay += '+'
            if $scope.categoryTab.display
                $scope.categoryTab.total = 0
                for cat of $scope.results.categoriesMap
                    for cat2 of $scope.results.categoriesMap[cat]
                        for cat3 of $scope.results.categoriesMap[cat][cat2]
                            $scope.categoryTab.total += $scope.results.categoriesMap[cat][cat2][cat3].length
                            if $scope.results.categoriesMap[cat][cat2][cat3].length == 20
                                $scope.categoryTab.loadCategory = true
                if !alreadyOneTabActive and $scope.categoryTab.total > 0
                    $scope.categoryTab.active = true
                    alreadyOneTabActive = true
                $scope.categoryTab.totalToDisplay = $scope.categoryTab.total
                if $scope.categoryTab.total >= 20
                    $scope.categoryTab.totalToDisplay += '+'
            #business
            $scope.businessTab.data = $scope.results.businesses
            $scope.publicationTab.data = $scope.results.publications
            #category
            $scope.categoryTab.data = $scope.results.categoriesMap
            $scope.loadSemaphore = false
            #scrolling
            $(window).on 'scroll', ->
                scrollBottom = $(window).scrollTop() + $(window).height()
                if $('.container-content').height() - scrollBottom < 200
                    $scope.search()
                return

            $scope.search = ->
                if $scope.loadSemaphore == false
                    $scope.loadSemaphore = true
                    tabToLoad = undefined
                    if $scope.businessTab.active
                        tabToLoad = $scope.businessTab
                    else if $scope.publicationTab.active
                        tabToLoad = $scope.publicationTab
                    else if $scope.categoryTab.active
                        tabToLoad = $scope.categoryTab
                    if tabToLoad.total == 20 and tabToLoad.allLoaded != true
                        s = searchBarService.currentSearch
                        if s.indexOf(':') != -1
                            s = s.split(':')[1]
                        tabToLoad.currentPage++
                        if $scope.businessTab.active
                            s = 'business:' + s
                            searchService.searchByString tabToLoad.currentPage, s, (data) ->
                                $scope.loadSemaphore = false
                                if data.businesses.length == 0
                                    tabToLoad.allLoaded = true
                                else
                                    for key of data.businesses
                                        tabToLoad.data.push data.businesses[key]
                                return
                        else if $scope.publicationTab.active
                            s = 'publication:' + s
                            searchService.searchByString tabToLoad.currentPage, s, (data) ->
                                $scope.loadSemaphore = false
                                if data.publications.length == 0
                                    tabToLoad.allLoaded = true
                                else
                                    for key of data.publications
                                        tabToLoad.data.push data.publications[key]
                                return
                        else if $scope.categoryTab.active and $scope.categoryTab.loadCategory == true
                            s = 'category:' + s
                            searchService.searchByString tabToLoad.currentPage, s, (data) ->
                                $scope.loadSemaphore = false
                                total = $scope.fusionCategories(data.categoriesMap)
                                if total == 0
                                    tabToLoad.allLoaded = true

    $scope.fusionCategories = (newMap) ->
        totalToAdd = 0
        for newCat of newMap
            catFounded = false
            for cat of $scope.results.categoriesMap
                if cat == newCat
                    catFounded = true
                    break
            if !catFounded
                $scope.results.categoriesMap.newCat = newMap[newCat]
            else
                for newSCat of newMap[newCat]
                    sCatFounded = false
                    for sCat of $scope.results.categoriesMap[newCat]
                        if sCat == newSCat
                            sCatFounded = true
                            break
                    if !sCatFounded
                        $scope.results.categoriesMap[newCat].newSCat = newMap[newCat][newSCat]
                    else
                        for newSSCat of newMap[newCat][newSCat]
                            ssCatFounded = false
                            for ssCat of $scope.results.categoriesMap[newCat][newSCat]
                                if ssCat == newSSCat
                                    ssCatFounded = true
                                    break
                            if !ssCatFounded
                                $scope.results.categoriesMap[newCat][newSCat].newSSCat = newMap[newCat][newSCat][newSSCat]
                            else
                                for b of newMap[newCat][newSCat][newSSCat]
                                    $scope.results.categoriesMap[newCat][newSCat][newSSCat].push newMap[newCat][newSCat][newSSCat][b]
                                    totalToAdd++
        totalToAdd

    #initialization
    $(window).scrollTop 0
    $rootScope.$broadcast 'PROGRESS_BAR_STOP'

    $scope.init()
    $scope.$on 'POSITION_CHANGED', ->
        $scope.init()