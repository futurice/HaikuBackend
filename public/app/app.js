var app = angular.module('HaikuBackend', ['ngRoute']);

app.controller('HaikuController', ['$scope', 'HaikuService', function($scope, haikuService) {

    haikuService
        .all()
        .done(function(all) { $scope.haikus = all; });
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

            $http.put('haiku', {id: id})
                .success(function() {
                    def.resolve();
                });

            return def.promise();
        }
    };
}]);