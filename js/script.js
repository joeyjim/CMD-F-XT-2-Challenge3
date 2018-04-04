
var map;
var dubaiAirport = {lat: 28.6127942, lng: -80.6902642};
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: dubaiAirport , 
        zoom: 14,
        styles: styles
    });
    
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
    
    directionsDisplay.setMap(map);

        calculateAndDisplayRoute(directionsService, directionsDisplay);
        document.getElementById('mode').addEventListener('change', function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        });
     
    var image = {
    url: "https://i.imgur.com/QUSoLHy.png", // url
   
    scaledSize: new google.maps.Size(100, 100), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(50, 0) // anchor
        
      
};

     var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Landing spot</h1>'+
            '<div id="bodyContent">'+
            '<p></p>'+
            
            '</div>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
  
      var marker = new google.maps.Marker({
      position: dubaiAirport,
      map: map,
       title:"Landing Spot",
          animation: google.maps.Animation.DROP,
          icon:image,
          optimized: false
    });
    
    marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
    
    
       var myoverlay = new google.maps.OverlayView();
    myoverlay.draw = function () {
        this.getPanes().markerLayer.id='markerLayer';
    }; 
    myoverlay.setMap(map);
    
    
    
   
    

    getAPIdata();   
}

 function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        var selectedMode = document.getElementById('mode').value;
        directionsService.route({
          origin: dubaiAirport,
         
          destination: {lat: 28.489266, lng:  -80.579598},  

          travelMode: google.maps.TravelMode[selectedMode]
        }, function(response, status) {
          if (status == 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            console.log('Kies een ander vervoermiddel ' + status);
          }
        });
      }

function getAPIdata() {

	// get starwars starships
	fetch('https://api.spacexdata.com/v2/launches/latest')
	
	// parse to JSON format
	.then(function(response) {
		return response.json();
	})
	
	// render starships
	.then(function(response) {

		// render starshipsCondition
		onAPISucces(response);
        console.log(response);
	})
	
	// catch error
	.catch(function (error) {
		// onAPIError();
		console.error('Request failed', error);
	});
}

function onAPISucces(response) {

	var starShipList = response.list;
	var starShips = document.getElementById('starship');
    
    var launchTime = response.launch_date_local;
    var rocket = response.rocket.rocket_name;
    
    starShips.innerHTML = "rocket " + rocket + " <br> launch " + launchTime;
    
    
	for(var i=0; i< starShips.length; i++){
		//console.log(weatherList[i].main.temp - 273.15);
		
        console.log(starShipList[i].name);

		starShips.innerHTML = starShipList[i].name;
	}
}
