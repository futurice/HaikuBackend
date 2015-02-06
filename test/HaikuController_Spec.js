describe('HaikuController', function() {
    beforeEach(module('HaikuBackend'));

    var $controller, $httpBackend;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;

    }));

    /* $httpBackend
     .when('GET', '/haikus')
     .respond([{},{},{}]);
     */

    describe('init', function() {
        it('gets all haikus to $scope.haikus', function() {

            var haikuService = {
                all: function() {
                    var def = $.Deferred();
                    def.resolve([{},{},{}]);
                    return def.promise();
                }
            };

            var $scope = {};
            var controller = $controller('HaikuController', { $scope: $scope, HaikuService: haikuService });

            expect($scope.haikus.length).toEqual(3);
        });
    });
});