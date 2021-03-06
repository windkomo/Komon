angular.module('komon.services').factory('modalService', ['$modal', '$sce',
    function ($modal, $sce) {

        var modalService = {};

        var modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            templateUrl: 'anglober/js/modal/modalContent.tpl.html'
        };

        var modalOptions = {
            closeButtonText: 'Close',
            actionButtonText: 'OK',
            headerText: 'Proceed?',
            secondHeaderText: '',
            bodyText: 'Perform this action?'
        };

        modalService.showModal = function (customModalDefaults, customModalOptions) {
            if(customModalOptions.bodyText  != null && customModalOptions.bodyText.length > 0) {
                customModalOptions.bodyText = $sce.trustAsHtml(customModalOptions.bodyText);
            }
            if (!customModalDefaults) customModalDefaults = {};
            return this.show(customModalDefaults, customModalOptions);
        };

        modalService.show = function (customModalDefaults, customModalOptions) {
            //Create temp objects to work with since we're in a singleton service
            var tempModalDefaults = {};
            var tempModalOptions = {};

            //Map angular-ui modal custom defaults to modal defaults defined in service
            angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

            //Map modal.html $scope custom properties to defaults defined in service
            angular.extend(tempModalOptions, modalOptions, customModalOptions);

            if (!tempModalDefaults.controller) {
                tempModalDefaults.controller = function ($scope, $modalInstance) {
                    $scope.modalOptions = tempModalOptions;
                    $scope.modalOptions.ok = function (result) {
                        $modalInstance.close(result);
                    };
                    $scope.modalOptions.close = function (result) {
                        $modalInstance.dismiss('cancel');
                    };
                }
            }

            return $modal.open(tempModalDefaults);
        };

        return modalService;

    }]);