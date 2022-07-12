exports.measureDistance = async (req, res, next) => {
    var distancetoPoint;

    console.log("Google Controller | mesureDistance");
    const { origin, destination } = req.params;

    console.log('Request params : ', req.params);

    console.dir('Request params', req.params);

    var distance = require('google-distance-matrix');

    //var origins = ['5.679081737760797, -0.1986921726273669'];
    //var destinations = ['5.560779993990879, -0.20149339782086848'] //['New York NY', '41.8337329,-87.7321554'];

    var origins = [];
    origins.push(origin);
    var destinations = [];
    destinations.push(destination);

    console.log('Origins:', origins);
    console.log('Destinations:', destinations);


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
                        //console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distance);
                        distancetoPoint = distance;
                        console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distancetoPoint);

                        res.status(200).json({
                            success: true,
                            message: "Google Distance Controller "+distancetoPoint,
                            results: distancetoPoint
                            //data: jobs,
                          });
                    } else {
                        console.log(destination + ' is not reachable by land from ' + origin);
                    }
                }
            }
        }
    });


//   res.status(200).json({
//     success: true,
//     message: "Google Distance Controller "+distancetoPoint,
//     results: distancetoPoint
//     //data: jobs,
//   });

}