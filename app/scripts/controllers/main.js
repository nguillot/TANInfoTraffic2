'use strict';

angular.module('taninfotraffic2App')
    .controller('MainCtrl', function ($scope, infoTrafficService) {
        if( !infoTrafficService.get() || !infoTrafficService.get().length ) {
            infoTrafficService.prepareInfoTraffics(function(data) {
                $scope.infoTrafficList = data;
            });
        } else {
            $scope.infoTrafficList = infoTrafficService.get();
        }
    });
