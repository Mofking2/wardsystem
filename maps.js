	console.log("run")
let map;
let marker;
var defaultZoom = 5

function initMap() {
	

	
	map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -30.5595 , lng:  22.9375 },
    zoom: defaultZoom,
	gestureHandling: "greedy",
	
  });
  
  
	  marker = new google.maps.Marker({
			position: { lat: -30.5595 , lng:  22.9375 },
			map: map,
			title: 'Default location',
		});
  
    const addressInput = document.getElementById('addressInput');
    const searchButton = document.getElementById('searchButton');

    searchButton.addEventListener('click', function (event) {
	event.preventDefault();
        const address = addressInput.value;
        if (address) {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ address: address }, function (results, status) {
                if (status === 'OK' && results[0].geometry) {
                    const location = results[0].geometry.location;
					
					// TRying to get the address infomation and display it on the console
					  var addressComponents = results[0].address_components;
					  
								console.log(addressComponents,"Addresssss")
						
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
							if (component.types.includes('country') ) {
                            // Zoom to suburb but not city level
                            defaultZoom = 5;
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
					
					//Checking if the mareker exists
					if (marker) {
                        marker.setMap(null);
                    }

					// Create a new marker at the location
                    marker = new google.maps.Marker({
                        position: location,
                        map: map,
                        title: address,
                    });
				
			
						document.getElementById('display').textContent = 'Location '+ document.getElementById('addressInput').value  + ' Latitude-longtude ' + location ;
						document.getElementById('display').style.color = "green";
						
					setTimeout(function () {
                        document.getElementById('display').textContent = '';
                    }, 3000);
				
				

					
                } else {
                    document.getElementById('displayErr').textContent = 'Location not found. Please enter a valid address.';
					document.getElementById('displayErr').style.color = "red";
					 setTimeout(function () {
                        document.getElementById('displayErr').textContent = '';
                    }, 3000);
                }
            });
        }
    });
}

var show = function() {
    // Show the loading spin
    jSuites.loading.show();
    // Hide the loading spin after two seconds
    setTimeout(function() {
        // Hide
        jSuites.loading.hide();
    }, 4000);
}
	
// Load the map when the page is fully loaded
window.onload = function () {
show();
  initMap();

};
