var map;
var locations = [];

function createMapWithMarkers(latLong) {
      var businessLocation = {};
      businessLocation.title = directoryCollection.name;
      businessLocation.latitude = latLong.latitude;
      businessLocation.longitude = latLong.longitude;
      businessLocation.email = directoryCollection.businessEmail;
      businessLocation.mobile = directoryCollection.businessMobile;
      businessLocation.address = directoryCollection.businessAddress;
      locations.push(businessLocation);

    var mapOptions = {
      zoom: 10,
      center: new google.maps.LatLng(0, 0)
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var bounds = new google.maps.LatLngBounds();
    // Create nice, customised pop-up boxes, to appear when the marker is clicked on
    var infowindow = new google.maps.InfoWindow({
      content: "Content String"
    });
    for (var i = 0; i < locations.length; i++) {
      var new_marker = createMarker(map, locations[i], infowindow);
      bounds.extend(new_marker.position);
    }
    map.fitBounds(bounds);
}

function createMarker(map, businessLocation, infowindow) {

  var position = {
    lat: parseFloat(businessLocation.latitude),
    lng: parseFloat(businessLocation.longitude)
  };
  var marker = new google.maps.Marker({
    position: position,
    map: map,
    title: businessLocation.name,
  });
   google.maps.event.addListener(marker, 'click', function() {
     infowindow.setContent('<div>'+
     '<p><strong>' + ((businessLocation.url === undefined) ? businessLocation.title : ('<a href="' + businessLocation.url +'">' + businessLocation.title + '</a>')) + '</strong></p>' +
     ((businessLocation.mobile === undefined) ? "" : ('<p><strong>Phone: </strong>' + businessLocation.mobile + '</p>')) +
     ((businessLocation.email === undefined) ? "" : ('<p><strong>Email: </strong>' + businessLocation.email + '</p>')) +
     ((businessLocation.address === undefined) ? "" : ('<p><strong>Address: </strong>' + businessLocation.address + '</p>')) +
     '</div>');
     infowindow.open(map, marker);
   });
  return marker;
}

module.exports = { createMarker, createMapWithMarkers }
