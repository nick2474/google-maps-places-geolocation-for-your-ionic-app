angular.module('services', [])

.service('GooglePlacesService', function($q){
  this.getPlacePredictions = function(query){
    var dfd = $q.defer(),
    		service = new google.maps.places.AutocompleteService();

    service.getPlacePredictions({ input: query }, function(predictions, status){
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        dfd.resolve([]);
      }
      else
      {
        dfd.resolve(predictions);
      }
    });

    return dfd.promise;
  };

	this.getLatLng = function(placeId){
    var dfd = $q.defer(),
				geocoder = new google.maps.Geocoder;

		geocoder.geocode({'placeId': placeId}, function(results, status) {
      if(status === 'OK'){
        if(results[0]){
					dfd.resolve(results[0].geometry.location);
				}
				else {
					dfd.reject("no results");
				}
			}
			else {
				dfd.reject("error");
			}
		});

    return dfd.promise;
  };

	this.getPlacesNearby = function(map, location){
		var dfd = $q.defer(),
    		service = new google.maps.places.PlacesService(map);

		// debugger;

		// service = new google.maps.places.PlacesService(map);
		service.nearbySearch({
	    location: location,
	    radius: '1000',
	    types: ['restaurant']
	  }, function(results, status){
			// debugger;
			if (status != google.maps.places.PlacesServiceStatus.OK) {
		    dfd.resolve([]);
		  }
			else {
				// for (var i = 0; i < results.length; i++) {
		    //   var place = results[i];
		    //   createMarker(results[i]);
		    // }
				dfd.resolve(results);
			}
		});

    // service.nearbySearch({ input: query },
    //   function(predictions, status){
    //     if (status != google.maps.places.PlacesServiceStatus.OK) {
    //       dfd.resolve([]);
    //     }
    //     else
    //     {
    //       dfd.resolve(predictions);
    //     }
    //   });
    return dfd.promise;
  };
})

;
