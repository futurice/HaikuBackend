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

    function allHaikusMock(result) {
        return function() {
            var def = $.Deferred();
            def.resolve(result);
            return def.promise();
        }
    }

    function getResolvedPromise() {
        var def = $.Deferred();
        def.resolve();
        return def.promise();
    }

    describe('init', function() {
        it('should get all haikus to $scope.haikus', function() {

            var haikuService = {
                all: allHaikusMock([{},{},{}])
            };

            var $scope = {};
            $controller('HaikuController', { $scope: $scope, HaikuService: haikuService });

            expect($scope.haikus.length).toEqual(3);
        });
    });

    describe('acceptance', function() {
       it('should send acceptance and reload haikus', function() {

           var id = 'asdq3eqda2d';
           var acceptedId = null;

           var haikuService = {
               accept: function(id) {
                   acceptedId = id;
                   return getResolvedPromise(); },
               all: allHaikusMock([{}])
           };

           var $scope = {};
           var controller = $controller('HaikuController', { $scope: $scope, HaikuService: haikuService });

           $scope.accept({name:"Matias", _id:id});

           expect(acceptedId).toBe(id);

           expect($scope.haikus.length).toBe(1)

       });
    });
});