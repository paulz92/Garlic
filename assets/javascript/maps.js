// google maps api

// initialize map and infoWindow variables
var map;
var infoWindow;

// this initial map is displayed when page loads - geographic center of USA
function initMap() {
  var initialCenter = {lat: 39.8283, lng: -98.5795};
  var map = new google.maps.Map(document.getElementById('googleMaps'), {
    zoom: 4,
    center: initialCenter
  });
};

// Run the initialize function when the window has finished loading.
google.maps.event.addDomListener(window, 'load', initMap);

// maps ajax call via zip code to retrieve lat/long coordinates
$("#submit-zip").on("click", function() {
	// api key, zip code, query url vars
	var placesApiKey = "AIzaSyDtjFC3Z2h2wmmCyFE0qlMq_mP6jar-ZTc";
	var zipCode = $("#zip-code").val().trim();
	var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address="
  	+ zipCode + "&key=" + placesApiKey;
 	
  // ajax call
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		// saving lat/long coordinates as var
		var latLong = response.results[0].geometry.location;
		// function to create/write/initialize map at latLong
    function initializeMap() {
   		map = new google.maps.Map(document.getElementById('googleMaps'), {
      	center: latLong,
      	zoom: 13
   		});
   		// initialize info window functionality	
   		infowindow = new google.maps.InfoWindow();
   		var service = new google.maps.places.PlacesService(map);
   		service.nearbySearch({
      	location: latLong,
      	radius: 5000,
      	type: ['grocery_or_supermarket']
   		}, callback);
 		};
    // callback function for service results
    function callback(results, status) {
    	if (status === google.maps.places.PlacesServiceStatus.OK) {
	      for (var i = 0; i < results.length; i++) {
	      	createMarker(results[i]);
	      }
      }
 		};
 		// function to create markers at grocery stores
 		function createMarker(place) {
			var placeLoc = place.geometry.location;
   		var marker = new google.maps.Marker({
      	map: map,
      	position: place.geometry.location
    	});
    	// creating a content var which will be the info marker content
    	var content = "<div><strong>" + place.name 
    		+ "</strong></div><br><div>" + place.vicinity 
    		+ "</div><br><div>Rating: " + place.rating + "/5</div>";
   		// opens info window when location marker clicked
   		google.maps.event.addListener(marker, 'click', function() {
     		infowindow.setContent(content);
     		infowindow.open(map, this);
   		});
 		};
 		// run initializeMap function
 		initializeMap();
	});
});