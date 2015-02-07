var app = angular.module('HaikuBackend', ['ngRoute']);

app.controller('HaikuController', ['$scope', '$filter', 'HaikuService', function($scope, $filter, haikuService) {

    function loadAllHaikus() {
        haikuService
            .all()
            .done(function(all) {
                $scope.allHaikus = all.map(function(haiku) {
                    haiku.actionsDisabled = haiku.accepted == true || haiku.rejected == true;
                    return haiku;
                });

                $scope.show($scope.showOnly);
            });
    }

    $scope.accept = function(haiku) {
        haikuService
            .accept(haiku._id)
            .done(function() {
                loadAllHaikus();
            });
    };

    $scope.reject = function(haiku) {
        haikuService
            .reject(haiku._id)
            .done(function() {
                loadAllHaikus();
            });
    };

    $scope.show = function(showOnly) {
        $scope.showOnly = showOnly;

        if(!$scope.allHaikus) return;

        $scope.haikus = $scope.allHaikus.filter(function(haiku) {
            if(showOnly == 'new') {
                return !haiku.accepted && !haiku.rejected;
            }
            else if(showOnly == 'accepted') {
                return haiku.accepted == true;
            }
            else if(showOnly == 'rejected') {
                return haiku.rejected == true;
            }

        });
    };

    $scope.show('new');

    loadAllHaikus();

}]);

app.factory('HaikuService', ['$http', function($http) {
    return {
        all: function() {
            var def = $.Deferred();

            $http.get('/haiku')
                .success(function(data) {
                    def.resolve(data);
                });

            return def.promise();
        },
        accept: function(id) {
            var def = $.Deferred();

            $http.put('/haiku/' + id, {accepted: true})
                .success(function() {
                    def.resolve();
                });

            return def.promise();
        },
        reject: function(id) {
            var def = $.Deferred();

            $http.put('/haiku/' + id, {rejected: true})
                .success(function() {
                    def.resolve();
                });

            return def.promise();
        }
    };
}]);