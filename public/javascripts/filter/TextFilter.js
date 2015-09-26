myApp.filter("text", function ($sce) {
    return function (input) {
        if(input!=undefined || input!=null) {
            return $sce.trustAsHtml(input.replace(/\n/g, '<br/>'));
        }
        return $sce.trustAsHtml(input);
    };
});
