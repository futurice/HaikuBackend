var app = angular.module('HaikuBackend', ['ngRoute']);

app.controller('HaikuController', ['$scope', 'HaikuService', function($scope, haikuService) {

    function loadAllHaikus() {
        haikuService
            .all()
            .done(function(all) { $scope.haikus = all; });
    }

    loadAllHaikus();

    $scope.accept = function(haiku) {
        haikuService
            .accept(haiku._id)
            .done(function() {
                loadAllHaikus();
            });
    };

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
        }
    };
}]);