(function(_) {'use strict';

angular.module('ag-admin').controller(
    'ApiDocumentationController',
    ['$rootScope', '$scope', '$location', '$timeout', '$routeParams', 'flash', 'ApiRepository',
    function ($rootScope, $scope, $location, $timeout, $routeParams, flash, ApiRepository) {

        $scope.service = (typeof $scope.$parent.restService != 'undefined') ? $scope.$parent.restService : $scope.$parent.rpcService;

        // for rest
        if (typeof $scope.$parent.restService != 'undefined') {
            if (typeof $scope.service.documentation == 'undefined') {
                $scope.service.documentation = {};
            }
            if (typeof $scope.service.documentation.collection == 'undefined') {
                $scope.service.documentation.collection = {};
            }
            _.forEach($scope.service.collection_http_methods, function (allowed_method) {
                if (typeof $scope.service.documentation.collection[allowed_method] == 'undefined') {
                    $scope.service.documentation.collection[allowed_method] = {description: null, request: null, response: null};
                }
            });
            if (typeof $scope.service.documentation.entity == 'undefined') {
                $scope.service.documentation.entity = {};
            }
            _.forEach($scope.service.resource_http_methods, function (allowed_method) {
                if (typeof $scope.service.documentation.entity[allowed_method] == 'undefined') {
                    $scope.service.documentation.entity[allowed_method] = {description: null, request: null, response: null};
                }
            });
        } else {
            if (typeof $scope.service.documentation == 'undefined') {
                $scope.service.documentation = {};
            }
            _.forEach($scope.service.http_methods, function (allowed_method) {
                if (typeof $scope.service.documentation[allowed_method] == 'undefined') {
                    $scope.service.documentation[allowed_method] = {description: null, request: null, response: null};
                }
            });
        }

        $scope.save = function() {
            ApiRepository.saveDocumentation($scope.service);
            $scope.$parent.flash.success = 'Documentation saved.';
        };

    }]
);

})(_);
