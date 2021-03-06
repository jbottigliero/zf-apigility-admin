(function() {'use strict';

angular.module('ag-admin').factory(
    'FiltersServicesRepository',
    ['$http', 'flash', 'apiBasePath', function ($http, flash, apiBasePath) {
        var servicePath = apiBasePath + '/filters';

        return {
            getList: function () {
                var promise = $http({method: 'GET', url: servicePath}).then(
                    function success(response) {
                        return response.data.filters;
                    },
                    function error() {
                        flash.error = 'Unable to fetch filters for filter dropdown; you may need to reload the page';
                        return false;
                    }
                );
                return promise;
            }
        };
    }]
);

})();
