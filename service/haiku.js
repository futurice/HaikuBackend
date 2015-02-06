var when = require('when');

var env = require('../env.js');
var monk = require('monk')(env.MONGODB || 'localhost/haiku');
var haikus = monk.get('haiku');

module.exports = {
    createHaiku: function(haiku) {

        var def = when.defer();

        var invalid = validate(haiku);

        if(!invalid) {
            var mongoPromise = haikus.insert(haiku);

            mongoPromise.success(function() {
                def.resolve('created');

                console.log(new Date(), 'created haiku');
            });

            mongoPromise.error(function(err) {
                def.reject({msg: err, internal: true});

                console.error(new Date(), 'failed creating haiku ', err);
            });
        }
        else {
            def.reject({msg: invalid, invalid: true});
        }

        return def.promise;
    },
    loadHaikus: function() {
        var def = when.defer();

        haikus.find().success(function(data) {
            def.resolve(data);
        });

        return def.promise;
    }
};

function validate(haiku) {
    function isEmpty(value) {
        return !value || value.trim() == '';
    }

    if(isEmpty(haiku.name)) {
        return 'name is empty';
    }
    else if(isEmpty(haiku.email)) {
        return 'email is empty';
    }
    else if(!haiku.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/gi)) {
        return 'invalid email';
    }
    else if(isEmpty(haiku.phone)) {
        return 'phone number is empty';
    }
    else if(!haiku.phone.match(/[+0-9 ]+/gi)) {
        return 'invalid phone number';
    }
    else if(!haiku.haiku || haiku.haiku.trim().length < 10) {
        return 'haiku is too short';
    }
    else if(!haiku.haiku.trim().length > 1000) {
        return 'haiku is too long';
    }

    return null;
}