myApp.service("$flash", function($filter,modalService) {

    Messenger.options = {
        extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right cr-messenger',
        theme: 'block'
    };

    this.success = function(messages) {
        print(messages,'success');
        return;
    };
    this.info = function(messages) {
        print(messages,'info');
        return
    };
    this.error = function(messages) {
        print(messages,'error');
        return;

    };
    this.warning = function(messages) {
        print(messages,'warning');
        return;
    };

    print = function(messages,type){

        if(!(angular.isUndefined(messages) || messages === null )) {
            for (var key in messages.split("\n")) {
                var message = messages.split("\n")[key];

                modalService.alertModal(type,$filter('translateText')(message));

                //Messenger().post({
                //    message: message,
                //    type: type,
                //    showCloseButton: true
                //});
            }
        };
        return;
    }
});
