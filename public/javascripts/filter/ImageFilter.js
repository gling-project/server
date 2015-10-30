myApp.filter("image", function (constantService) {
    return function (input, orginal) {
        if (input != null && input != undefined) {
            if (input.storedName != null && input.storedName != undefined) {

                if (orginal != undefined && orginal == true) {
                    return constantService.fileBucketUrl + '/' + input.storedNameOriginalSize;
                }
                else {
                    return constantService.fileBucketUrl + '/' + input.storedName;
                }
            }
            else {
                return input;
            }
        }
        return null;
    };
});
