		var map;
var infowindow;

function initMap() {
  var charlotte = {lat: 35.2126147, lng: -80.817919};

  map = new google.maps.Map(document.getElementById('map'), {
    center: charlotte,
    zoom: 12
  });

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: charlotte,
    radius: 50000,
    type: ['book_store']
  }, callback);
}

function callback(results, status) {
  console.log("inside callback");
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      console.log(results[i]);
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
