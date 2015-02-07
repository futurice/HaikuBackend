var frisby = require('../../node_modules/frisby/lib/frisby.js');

require('monk')('localhost/haiku').get('haiku').remove({}).then(function() {console.log('haikus removed');});

frisby.create('List haikus')
    .get('http://localhost:3000/haiku')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .toss();

frisby.create('Create new haiku')
    .post('http://localhost:3000/haiku', {
        name: "Matias",
        email: "matias@matiass.me",
        phone: "123 334 3455",
        haiku: "Diasd iasdua iasduai ovjl zoiuc"
    }, {json: true})
    .expectStatus(200)
    .toss();

frisby.create('List haikus')
    .get('http://localhost:3000/haiku')
    .expectJSONLength(1)
    .expectJSON([{name: "Matias"}])
    .toss();

frisby.create('Haiku creation fails')
    .post('http://localhost:3000/haiku', {
        name: "Matias",
        email: "matias@matiassme",
        phone: "123 334 3455",
        haiku: "Diasd iasdua iasduai ovjl zoiuc"
    }, {json: true})
    .expectStatus(400)
    .toss();

/*frisby.create('Haikus has been created')
    .get('http://localhost:3000/haiku')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON(function(data) { return data[data.length-1].phone.indexOf(random) == 0; })
    .toss();*/