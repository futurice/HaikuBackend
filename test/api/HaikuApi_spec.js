var frisby = require('../../node_modules/frisby/lib/frisby.js');

require('monk')('localhost/haiku').get('haiku').remove({}).then(function() {console.log('haikus removed');});

frisby.create('List haikus')
    .get('http://localhost:3000/haiku')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .toss();

frisby.create('Create new haiku')
    .post('http://localhost:3000/haiku', {
        nick: "Matias",
        email: "matias@matiass.me",
        phone: "123 334 3455",
        haiku: "Diasd iasdua iasduai ovjl zoiuc"
    }, {json: true})
    .expectStatus(200)
    .toss();

// create another for testing purposes
frisby.create('Create new haiku')
    .post('http://localhost:3000/haiku', {
        nick: "Matias",
        email: "matias@matiass.me",
        phone: "123 334 3455",
        haiku: "Diasd iasdua iasduai ovjl zoiuc"
    }, {json: true})
    .expectStatus(200)
    .toss();

frisby.create('Haiku creation fails')
    .post('http://localhost:3000/haiku', {
        nick: "Matias",
        email: "not an email address",
        phone: "123 334 3455",
        haiku: "Diasd iasdua iasduai ovjl zoiuc"
    }, {json: true})
    .expectStatus(400)
    .toss();

frisby.create('List haikus')
    .get('http://localhost:3000/haiku')
    .expectJSONLength(2)
    .expectJSON('0',{
        nick: "Matias",
        accepted: false,
        rejected: false,
        _id: function(id) { haikuId = id; }
    })
    .afterJSON(function(data) {

        var haikuId = data[0]._id;
        var haikuId2 = data[1]._id;

        frisby.create('Accept haiku')
            .put('http://localhost:3000/haiku/'+ haikuId, {
                accepted: true
            }, {json: true})
            .expectStatus(200)
            .toss();

        frisby.create('Haiku has been accepted')
            .get('http://localhost:3000/haiku')
            .expectJSON([{nick: "Matias", _id: haikuId, accepted: true }])
            .toss();

        frisby.create('Reject haiku')
            .put('http://localhost:3000/haiku/'+ haikuId2, {
                rejected: true
            }, {json: true})
            .expectStatus(200)
            .after(function() {

                frisby.create('Haiku has been rejected')
                    .get('http://localhost:3000/haiku')
                    .expectJSON([{},{_id: haikuId2, rejected: true }])
                    .toss();

                frisby.create('Cant accept rejected haiku')
                    .put('http://localhost:3000/haiku/'+ haikuId2, {
                        accepted: true
                    }, {json: true})
                    .expectStatus(403)
                    .toss();
            })
            .toss();



    })
    .toss();
