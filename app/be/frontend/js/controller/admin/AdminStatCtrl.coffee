#admin controller
#statistic about application usage
myApp.controller 'AdminStatCtrl', ($scope, superAdminService) ->

    #param
    $scope.tab = 'main'

    #set tab
    $scope.setTab = (tab) ->
        $scope.tab = tab
        if $scope.tab == 'main'
            $scope.refreshStat()
        else if $scope.tab == 'users'
            $scope.refreshDetails()
        else if $scope.tab == 'interest'
            $scope.refreshInterest()
        return

    #
    #Stats
    #

    #refresh stats
    $scope.refreshStat = ->
        #call data
        superAdminService.getStat (data) ->
            $scope.stats = data

    #
    #details
    #
    $scope.details = []

    #refresh
    $scope.refreshDetails = ->
        $scope.details = []
        #call data
        superAdminService.getUserDetails (data) ->
            $scope.completeObj 'Aujourd\'hui', data.today
            $scope.completeObj '7 derniers jours', data.week
            $scope.completeObj 'Tout', data.all

    #compete data for chart
    $scope.completeObj = (title, data) ->
        $scope.details.push
            title: title
            total: data.total
            accounts:data.list
            nbSessionChartParam:
                title: 'Nombre de session par utilisateur'
                data: data.nbSessions
            nbFollowChartParam:
                title: 'Nombre de suivit par utilisateur'
                data: data.nbFollows
            nbAddressChartParam:
                title: 'Nombre d\'adresse par utilisateur'
                data: data.nbAddresses
            sharePositionChartParam:
                title: 'Partage sa position par utilisateur'
                data: data.sharePositions

    #
    # interest
    #

    #refresh
    $scope.refreshInterest = ->
        $scope.interestStat = []
        #call data
        superAdminService.getInterestStats (data) ->
            $scope.interestGraph1 =
                title: 'Intérêts sélectionnés sur les dernières 24 heures'
                data: data.from1
            $scope.interestGraph7 =
                title: 'Intérêts sélectionnés sur les derniers 7 jours'
                data: data.from7
            $scope.interestGraph14 =
                title: 'Intérêts sélectionnés sur les derniers 14 jours'
                data: data.from14
            $scope.interestGraph28 =
                title: 'Intérêts sélectionnés sur les derniers 28 jours'
                data: data.from28

        return

    #initilization
    $scope.refreshStat()