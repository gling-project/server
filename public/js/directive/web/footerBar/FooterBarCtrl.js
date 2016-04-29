myApp.directive("footerBarCtrl", function (modalService,contactService,$flash,$filter) {
    return {
        restrict: "E",
        scope: {},
        templateUrl: "/assets/js/directive/web/footerBar/template.html",
        replace: true,
        compile: function () {
            return {
                post: function (scope) {

                    scope.openContactForm = function (target) {

                        var dto = {
                            target: target
                        };

                        modalService.basicModal('--.contactForm.modal.title', 'contact-form-ctrl',
                            {dto: dto},
                            function (close) {
                                contactService.contact(dto, function () {
                                    $flash.success($filter('translateText')('--.contactForm.send.success'));
                                    close();
                                });
                            }
                        );
                    };
                }
            }
        }
    }
});
