console.log("runnning");
let map;
let marker;
var defaultZoom = 5
async function initMap() {
	

  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: -30.5595 , lng:  22.9375 },
    zoom: defaultZoom,
	gestureHandling: "greedy",
	
  });
   // Create a marker at the default location,-34.397,150.644
  marker = new google.maps.Marker({
    position: { lat: -30.5595, lng: 22.9375 },
    map: map,
    title: 'Default Location',
  });


    // Add an event listener to the search button
  document.getElementById('searchButton').addEventListener('click', function (event) {
	   event.preventDefault();
    const locationInput = document.getElementById('locationInput').value;
	

    if (locationInput) {
      // Use the Geocoding API to convert the location input to coordinates
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: locationInput }, function (results, status) {
        if (status === 'OK' && results[0].geometry) {
          const location = results[0].geometry.location;
		
		  var addressComponents = results[0].address_components;
			console.log(addressComponents,"Addresssss")
                        var addressComponents = results[0].address_components;

                    var isCity = false;
                    var isProvince = false;
					var is = false;

                    // Check if any address component is of type 'locality' (city)
                    // or 'administrative_area_level_1' (province)
                         var addressComponents = results[0].address_components;

                    var zoomLevel = 15; // Default zoom level for unknown locations

                    // Check address components to determine zoom level
                    for (var i = 0; i < addressComponents.length; i++) {
                        var component = addressComponents[i];
                        if (component.types.includes('locality')) {
                            // Zoom to city level
                            defaultZoom = 11;
                            break;
                        } else if (component.types.includes('route') || component.types.includes('street_number')) {
                            // Zoom to street level
                            defaultZoom = 16;
                            break;
						} if (component.types.includes('administrative_area_level_1')){
                            // Zoom to province level
                            defaultZoom = 7;
                            break;
						}
							if (component.types.includes('sublocality_level_1') ) {
                            // Zoom to suburb but not city level
                            defaultZoom = 15;
                            break;
							}
							else {
							defaultZoom = 1;
						}
                    }

                    // Set the map center to the location of the entered address
                    map.setCenter(location);

                    // Set the appropriate zoom level
                    map.setZoom(defaultZoom);

				   if (marker) {
					marker.setMap(null);
				  }

				  // Create a new marker at the location
				  marker = new google.maps.Marker({
					position: location,
					map: map,
					title: locationInput,
				  });
			  
				 // Set the zoom level based on the type of location
						  //  if (isCity) {
						   //     map.setZoom(12); // Zoom to city level
						  //  } else if (isProvince) {
						  //      map.setZoom(5); // Zoom to province level
						 //   } else {
						 //       map.setZoom(15); // Default zoom level
						 //   }

			   // Center the map on the searched location
				 // map.setCenter(location);
				  
				  // Adjust this value as needed for the desired zoom level
				  //map.setZoom(9);
				  
				   document.getElementById('spinner').style.display = 'none';
				} else {
				  alert('Location not found. Please enter a valid location.');
				}

			});
		}
	});
				
}
		function spinner1(){
			
							document.getElementById('spinner').style.display = 'block';

			
		}
		
initMap();

window.onload = function () {
	spinner1()
};