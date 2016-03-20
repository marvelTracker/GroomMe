(function() {
    var app = angular.module("mainModule");

    var messagePanelService = function ($injector) {
        var rScope = $injector.get('$rootScope');

        var sendSuccessMessage = function() {
            if (rScope) {
                rScope.$broadcast('sendDisplaySuccessMessage', "Successfully Saved !!!!");
            }
        };

        var sendErrorMessage = function(){
            if (rScope) {
                rScope.$broadcast('sendDisplayErrorMessage', "Error Occoured!!!");
            }
        };

        var resetMessagePanel = function () {
            if (rScope) {
                rScope.$broadcast('sendHideMessagePanel');
            }
        };

        var sendCustomMessage = function (message, type)
        {
            
        };

        return {
            SendSuccessMessage: sendSuccessMessage,
            SendErrorMessage: sendErrorMessage,
            SendCustomMessage: sendCustomMessage,
            ResetMessagePanel:resetMessagePanel,
        };

    };

    app.factory("messagePanelService", messagePanelService);

}());