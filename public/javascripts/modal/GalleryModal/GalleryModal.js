myApp.controller('GalleryModalCtrl', function ($scope, $flash, $modalInstance, image, images) {


    $scope.image = image;
    $scope.images = images;
    $scope.imageNb = null;

    $scope.close = function () {
        $modalInstance.close();
    };

    for (var key in $scope.images) {
        if ($scope.images[key].storedName == $scope.image.storedName) {
            $scope.imageNb = key - -1;
        }
    }

    $scope.previous = function () {
        for (var key in $scope.images) {
            if ($scope.images[key].storedName == $scope.image.storedName) {
                if ($scope.images[key - 1] == undefined) {
                    $scope.image = $scope.images[$scope.images.length - 1];
                    $scope.imageNb = $scope.images.length;
                }
                else {
                    $scope.image = $scope.images[key - 1];
                    $scope.imageNb = key - 1 - -1;
                }
                break;
            }
        }
    };

    $scope.next = function () {
        for (var key in $scope.images) {
            if ($scope.images[key].storedName == $scope.image.storedName) {
                var newKey = key - -1;
                if ($scope.images[newKey] == undefined) {
                    $scope.image = $scope.images[0];
                    $scope.imageNb = 1;
                }
                else {
                    $scope.image = $scope.images[newKey];
                    $scope.imageNb = key - -1 - -1;
                }
                break;
            }
        }
    };

});