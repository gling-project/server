myApp.filter("image", function () {
    return function (input,orginal) {
        if(input!=null && input!=undefined) {
            if(orginal!=undefined && orginal == true){
                return "https://s3.amazonaws.com/lynk-test/" + input.storedNameOriginalSize;
            }
            else {
                return "https://s3.amazonaws.com/lynk-test/" + input.storedName;
            }
        }
        return null;
    };
});
