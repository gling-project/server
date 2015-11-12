# admin controller
# send email to all businesses
myApp.controller 'AdminContactCtrl', ($scope, superAdminService, $flash) ->

    #paramw
    $scope.dto =
        subject: ''
        contact: ''

    #send email function
    $scope.send = ->
        superAdminService.getEmailToBusinesses $scope.dto, ->
            $flash.success '--.generic.success'