var distance = require('google-distance-matrix');



var origins = ['5.557882954628864, -0.19906994539523537'];
var destinations = ['5.560779993990879, -0.20149339782086848'] //['New York NY', '41.8337329,-87.7321554'];

var distancetoPoint;

distance.key("AIzaSyAOc0Lu8bdR9YF2Le4J54mSi01engd3GNA");
distance.mode('walking'); //driving | walking | bicycling | transit, default driving

distance.matrix(origins, destinations, function (err, distances) {
    if (err) {
        return console.log(err);
    }
    if(!distances) {
        return console.log('no distances');
    }
    if (distances.status == 'OK') {
        for (var i=0; i < origins.length; i++) {
            for (var j = 0; j < destinations.length; j++) {
                var origin = distances.origin_addresses[i];
                var destination = distances.destination_addresses[j];
                if (distances.rows[0].elements[j].status == 'OK') {
                    var distance = distances.rows[i].elements[j].distance.text;
                    console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distance);
                    distancetoPoint = distance;
                } else {
                    console.log(destination + ' is not reachable by land from ' + origin);
                }
            }
        }
    }
});

console.log('Distance : ' + distancetoPoint);