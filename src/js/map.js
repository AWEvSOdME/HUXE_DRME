var L = require ('leaflet');

//_________________________________________________________________________________________________________

// Layer Group to show/hide Markers
var iconLayerGroup = new L.LayerGroup();

//ICON Class with same properties
var AnimalIcon = L.Icon.extend({
    options: {
        iconSize:     [40, 40],
        iconAnchor:   [22, 94],
        popupAnchor:  [-3, -76]
    }
});

// AnimalIcon Instances (3 different Markers)
var birdIcon = new AnimalIcon({iconUrl: '/img/crane.png'}),
    fishIcon = new AnimalIcon({iconUrl: '/img/whitestork.png'}),
    mamalIcon = new AnimalIcon({iconUrl: '/img/blackstork.png'});

//Add Marker to Map (bzw. LayerGroup) and add Popups to Marker (by clicking it)
L.marker([31.5, -0.09], {icon: birdIcon}).addTo(iconLayerGroup).bindPopup("I am a green leaf.");
L.marker([41.495, -0.083], {icon: fishIcon}).addTo(iconLayerGroup).bindPopup("I am a red leaf.");
L.marker([21.49, -0.1], {icon: mamalIcon}).addTo(iconLayerGroup).bindPopup("I am an orange leaf.");

//var iconLayerGroup = L.layerGroup([birdIcon, fishIcon, mamalIcon]);

//Several Map Layers: WaterColor, OpenStreetMap and Satellite Map
var watercolor = new L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd', minZoom: 1, maxZoom: 16, ext: 'png' });

var osm = new L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a>'});

var satellite = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri '});


//var map = L.map('map').setView([41.505, -0.09], 5);
var map = L.map('map', {
    center: [39.73, 0.99],
    zoom: 2,
    layers: [watercolor, iconLayerGroup]
});

//map.addLayer(watercolor);
//map.addControl(new L.Control.Layers( { /*'Google Map':gmap,*/ 'OpenStreetMap': osm, 'Wasserfarbenkarte': watercolor, 'Satellitenbildkarte': Esri_WorldImagery},{}));
var baseMaps = {
    "WaterColor": watercolor,
    "OSM": osm,
    "Satellite": satellite
};

var overlayMaps = {
    "Show Animals": iconLayerGroup
};

L.control.layers(baseMaps, overlayMaps).addTo(map);




//Use Images as Marker Symbols (Single Marker Icon)
var squirrelIcon = L.icon({
    iconUrl: '/img/squirrel.jpg',
    //shadowUrl: 'leaf-shadow.png',

    iconSize:     [38, 40], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});



// Create new Marker
var marker = L.marker([51.5, -0.09], {icon: squirrelIcon}).addTo(map);

// Create Circle
var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);



// GET DATA FROM MOVEBANK
$.ajax({

    type: 'GET',

    //important because of security restrictions !!!! (CORS...)
    crossDomain: true,
    dataType: 'jsonp',

    // The URL to make the request to.
    url: 'https://www.movebank.org/movebank/service/public/json?study_id=2911040&individual_local_identifiers[]=4262-84830876&sensor_type=gps',

    success: function( data ){

        var items = [];

        $.each( data.individuals[0].locations, function( key, val ) {
            items.push( "<li id='" + key + "'>xxx" + val + "</li>" );
        });

        //How to access JSON values
        //console.log(data.individuals); //"First Level of Json File"
        //console.log(data.individuals[0].locations[0].location_lat); //"Fourth Level of Json File , latitude nr.1"

        //Single Marker
        var latNew = data.individuals[0].locations[0].location_lat;
        var longNew = data.individuals[0].locations[0].location_long;
        var LatLongSingleArray = [latNew, longNew];

        var markerSingle = L.marker(LatLongSingleArray, {icon: squirrelIcon}).addTo(map).bindPopup("AJAX REQUEST !!");



        var i, x, y;
        var latNewArray = [];
        var longNewArray = [];
        var polyArray = [];


        for (i in data.individuals[0].locations){
            x = data.individuals[0].locations[i].location_lat;
            y = data.individuals[0].locations[i].location_long;
            //console.log(x, y);
            latNewArray.push(x);
            longNewArray.push(y);

            //console.log(latNewArray);
            //console.log(longNewArray);

            var LatLongArrMulti = [latNewArray[i], longNewArray[i]];
            var markerMulti = L.marker(LatLongArrMulti, {icon: squirrelIcon}).addTo(map).bindPopup("AJAX REQUEST #2 !!");


            var coords = {lat: x, lng: y };
            //console.log(coords);

            polyArray.push(coords);

        }

        /*var polyline = new google.maps.Polyline({
            path: polyArray,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });*/

        //polyline.setMap(map); //GOOGLE

        //console.log(polyArray);

        //Console Tests...
        console.log('helloWorld');
        //console.log(JSON.stringify(data)); // Output of Json Request (Movebank)
    }
});