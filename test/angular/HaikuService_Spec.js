describe('HaikuService', function() {
    var $httpBackend, haikuService;

    // Set up the module
    beforeEach(module('HaikuBackend'));

    beforeEach(inject(function (_HaikuService_, $injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        // backend definition common for all tests
        authRequestHandler = $httpBackend.when('GET', '/haiku').respond([{},{},{}]);

        // The $controller service is used to create instances of controllers
        haikuService = _HaikuService_;
    }));


    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('all()', function() {

        it('should return all haikus', function () {
            //$httpBackend.expectGET('/haikus');

            haikuService.all().done(function(data) {
                expect(data.length).toBe(3);
            });

            $httpBackend.flush();

        });

    });

    describe('accept()', function() {

        it('should accept the haiku', function() {

            var id = 'asd0eaa3';

            $httpBackend.expectPUT('/haiku/' + id, {accept: true});

            haikuService.accept(id);

            $httpBackend.flush();

        });

    })

});