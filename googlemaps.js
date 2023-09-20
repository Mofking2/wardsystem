console.log("runnning");
let map;
let marker;
async function initMap() {
	
	// Show the spinner
  document.getElementById('spinner').style.display = 'block';
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: 0, lng: 0 },
    zoom: 2,
	
  });
   // Create a marker at the default location,-34.397,150.644
  marker = new google.maps.Marker({
    position: { lat: 0, lng: 0  },
    map: map,
    title: 'Default Location',
  });
document.getElementById('feedback-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from actually submitting
    alert('Thank you for your feedback!');
    // You can send the form data to a server, perform validation, or other actions here.
});

    // Add an event listener to the search button
  document.getElementById('searchButton').addEventListener('click', function (event) {
	   event.preventDefault()
    const locationInput = document.getElementById('locationInput').value;
    if (locationInput) {
      // Use the Geocoding API to convert the location input to coordinates
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: locationInput }, function (results, status) {
        if (status === 'OK' && results[0].geometry) {
          const location = results[0].geometry.location;
		  
		   if (marker) {
            marker.setMap(null);
          }

          // Create a new marker at the location
          marker = new google.maps.Marker({
            position: location,
            map: map,
            title: locationInput,
          });
	   // Center the map on the searched location
          map.setCenter(location);
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
  spinner1();
};