myApp.filter("text", function ($sce,$filter) {
    return function (input,limit) {
        if(input!=undefined || input!=null) {
            if(limit!=undefined && input.length > limit){
                input=input.substr(0,limit);//$filter('limitTo')(result,limit);
                input= input.substr(0, Math.min(input.length, input.lastIndexOf(" ")));
                input=input+" ...";
            }
            var result= $sce.trustAsHtml(input.replace(/\n/g, '<br/>'));
            return result;
        }
        return $sce.trustAsHtml(input);
    };
});
