Template.home.helpers({
  salas() {
    return Salas.find();
  }
});

Template.home.events({
  'click .resetRoute'(e, t) {
    e.preventDefault();
    t.directionsDisplay.setDirections({routes: []});
  },
  'click .traceRoute'(e, t) {
    e.preventDefault();
    const self = this;


    // Traçar Rota START

    //Coordenadas ICC Central
    var unb = {lat: -15.764430, lng: -47.868700};

    //Criando objeto de requisição
    var request = {
    origin:unb,
    destination:{lat: self.lat, lng: self.lng},
    travelMode: google.maps.TravelMode.WALKING
    };

    //Capturando Direções
    t.directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      //Mostrando no mapa
      t.directionsDisplay.setDirections(response);
    }
  });

  //Traçar Rota END

  }
});




Template.home.onRendered(()=>{
  const self = Template.instance();


  //DOJO GOOGLE MAPIS API START

  //Carregando script google maps
  $.getScript('https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyD0j-zx2ELBrwoIXbjyT1eRsl6rJ0XXgG4', function () {

  console.log('google maps loaded...');

  //Posição centro ICC
  var unb = {lat: -15.764430, lng: -47.868700};

  //Inicializando mapa
  self.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: unb,
    mapTypeId: google.maps.MapTypeId.SATELLITE
  });

  //Criando camada
  var bounds = new google.maps.LatLngBounds(
       new google.maps.LatLng(-15.776517, -47.878039),
       new google.maps.LatLng(-15.755812, -47.856084));

  //Criando objeto de instanciação
  USGSOverlay.prototype = new google.maps.OverlayView();

  //Carregando mapa da UnB
  var srcImage = 'https://preview.ibb.co/jeUpwF/mapa.png';

  //Mostrando no google maps
  var overlay = new USGSOverlay(bounds, srcImage, self.map);

  var marker = new google.maps.Marker({
    position: unb,
    map: self.map
  });

  self.directionsDisplay = new google.maps.DirectionsRenderer();
  self.directionsService = new google.maps.DirectionsService();
  self.directionsDisplay.setMap(self.map);



//DOJO GOOGLE MAPIS API END

 /** @constructor */
function USGSOverlay(bounds, image, map) {

  // Initialize all properties.
  this.bounds_ = bounds;
  this.image_ = image;
  this.map_ = map;

  // Define a property to hold the image's div. We'll
  // actually create this div upon receipt of the onAdd()
  // method so we'll leave it null for now.
  this.div_ = null;

  // Explicitly call setMap on this overlay.
  this.setMap(map);
}

/**
 * onAdd is called when the map's panes are ready and the overlay has been
 * added to the map.
 */
USGSOverlay.prototype.onAdd = function() {

  var div = document.createElement('div');
  div.style.borderStyle = 'none';
  div.style.borderWidth = '0px';
  div.style.position = 'absolute';

  // Create the img element and attach it to the div.
  var img = document.createElement('img');
  img.src = this.image_;
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.position = 'absolute';
  div.appendChild(img);

  this.div_ = div;

  // Add the element to the "overlayLayer" pane.
  var panes = this.getPanes();
  panes.overlayLayer.appendChild(div);
};

USGSOverlay.prototype.draw = function() {

  // We use the south-west and north-east
  // coordinates of the overlay to peg it to the correct position and size.
  // To do this, we need to retrieve the projection from the overlay.
  var overlayProjection = this.getProjection();

  // Retrieve the south-west and north-east coordinates of this overlay
  // in LatLngs and convert them to pixel coordinates.
  // We'll use these coordinates to resize the div.
  var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
  var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

  // Resize the image's div to fit the indicated dimensions.
  var div = this.div_;
  div.style.left = sw.x + 'px';
  div.style.top = ne.y + 'px';
  div.style.width = (ne.x - sw.x) + 'px';
  div.style.height = (sw.y - ne.y) + 'px';
};

// The onRemove() method will be called automatically from the API if
// we ever set the overlay's map property to 'null'.
USGSOverlay.prototype.onRemove = function() {
  this.div_.parentNode.removeChild(this.div_);
  this.div_ = null;
};



});

});
