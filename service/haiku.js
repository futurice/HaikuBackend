var when = require('when');

var env = require('../env.js');
var monk = require('monk')(env.MONGODB || 'localhost/haiku');
var haikus = monk.get('haiku');

module.exports = {
    createHaiku: function(haiku) {

        var def = when.defer();

        var invalid = validate(haiku);

        if(!invalid) {
            haiku.accepted = false;
            haiku.rejected = false;

            haikus.insert(haiku)
                .success(function() {
                    def.resolve('created');
                    console.log(new Date(), 'Created haiku.');
                })
                .error(function(err) {
                    def.reject({msg: err, internal: true});
                    console.error(new Date(), 'Failed to create haiku: ', err);
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
            console.log(data);
        });

        return def.promise;
    },
    accept: function(id) {
        var def = when.defer();

        console.log('accept %s', id);

        haikus.findOne({_id: id})
            .success(function(haiku) {

                console.log(haiku);

                if(!haiku.rejected) {
                    haikus.update({ _id: id }, { $set: {accepted: true} })
                        .success(def.resolve)
                        .error(def.reject);
                }
                else {
                    def.reject({forbidden: true, msg: "Forbidden to accept rejected haiku."});
                }

            })
            .error(function() {
                def.reject();
            });

        return def.promise;
    },
    reject: function(id) {
        var def = when.defer();

        console.log('reject %s', id);

        haikus.update({ _id: id }, { $set: {rejected: true} })
            .success(def.resolve)
            .error(def.reject);

        return def.promise;
    },
    loadRandomHaikus: function() {
        var def = when.defer();

        haikus.find({ accepted: true}, {fields : { email:0, phone:0, token:0,
            accepted:0, rejected:0}}).success(function(data) {
                var random_data = [];

                for (var i = 0; i < 3; i++) {
                    var len = data.length;
                    if (len > 0) {
                        var random_index = Math.floor((Math.random() * len) + 1) - 1;
                        random_data[i] = data[random_index];
                        data.splice(random_index, 1);
                    }
                }
                def.resolve(random_data);
            });

        return def.promise;
    },
    loadAcceptedHaikus: function() {
        var def = when.defer();

        haikus.find({ accepted: true }, {fields : { email:0, phone:0, token:0,
        accepted:0, rejected:0 }}).success(function(data) {
            def.resolve(data);
            console.log(data);
        });

        return def.promise;
    }
};

function validate(haiku) {
    function isEmpty(value) {
        return !value || value.trim() == '';
    }

    if(isEmpty(haiku.nick)) {
        return 'Nick is empty,';
    }
    else if(isEmpty(haiku.email)) {
        return 'Email is empty.';
    }
    else if(!haiku.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/gi)) {
        return 'Invalid email.';
    }
    else if(!haiku.phone.match(/[+0-9 ]+/gi) && !(isEmpty(haiku.phone))) {
        return 'Invalid phone number.';
    }
    else if(!haiku.haiku || haiku.haiku.trim().length < 10) {
        return 'Haiku is too short.';
    }
    else if(!haiku.haiku.trim().length > 1000) {
        return 'Haiku is too long.';
    }

    return null;
}