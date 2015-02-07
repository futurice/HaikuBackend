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

        var $scope = {};

        beforeEach(function() {
            var haikuService = {
                all: allHaikusMock([{rejected: true},{accepted: true},{}])
            };

            $controller('HaikuController', { $scope: $scope, HaikuService: haikuService });
        });

        it('should get all haikus to $scope.haikus', function() {
            expect($scope.allHaikus.length).toEqual(3);
        });

        it('should filter haikus instantly', function() {
            expect($scope.haikus.length).toEqual(1);
        });

        it('should mark actionsDisabled in accepted and rejected haikus', function() {
            expect($scope.allHaikus[0].actionsDisabled).toBe(true);
            expect($scope.allHaikus[2].actionsDisabled).toBe(false);
        });

    });

    describe('acceptance and rejection', function() {

        var id, haikuService, $scope;

        beforeEach(function() {
           id = 'asdq3eqda2d';

           haikuService = {
               all: allHaikusMock([{}])
           };

           $scope = {};
           $controller('HaikuController', { $scope: $scope, HaikuService: haikuService });
        });

        afterEach(function() {
           $scope.allHaikus = [];
        });

        it('should send acceptance and reload haikus', function() {
           var acceptedId = null;

           haikuService.accept = function(id) {
               acceptedId = id;
               return getResolvedPromise();
           }

           $scope.accept({name:"Matias", _id:id});

           expect(acceptedId).toBe(id);

           expect($scope.haikus.length).toBe(1)

        });

        it('should send rejection and reload haikus', function() {

            var rejectedId = null;

            haikuService.reject = function(id) {
                rejectedId = id;
                return getResolvedPromise();
            }

            $scope.reject({name:"Matias", _id:id});

            expect(rejectedId).toBe(id);

            expect($scope.haikus.length).toBe(1)

        });
    });

    describe('filter selector', function() {

        var $scope;

        beforeEach(function() {
            var haikuService = {
                all: allHaikusMock([{rejected: true},{accepted: true},{}])
            };

            $scope = {};
            $controller('HaikuController', { $scope: $scope, HaikuService: haikuService });
        });

        it('should initially set showOnly to new', function() {
            expect($scope.showOnly).toBe('new');
        });

        it('should set showOnly to selected filter', function() {
            $scope.show('accepted');

            expect($scope.showOnly).toBe('accepted');
        });

        it('should filter haiku list with selected filter', function() {
            $scope.show('accepted');

            expect($scope.haikus.length).toBe(1);
        });

    });
});