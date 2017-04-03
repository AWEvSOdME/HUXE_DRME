
var latNew, longNew, items, coords;
var polyArray = [];


// GET DATA FROM MOVEBANK
$.ajax({

    type: 'GET',

    //important because of security restrictions !!!! (CORS...)
    crossDomain: true,
    dataType: 'jsonp',

    // The URL to make the request to.
    url: 'https://www.movebank.org/movebank/service/public/json?study_id=2911040&individual_local_identifiers[]=4262-84830876&sensor_type=gps',

    success: function( data ){

        items = [];

        $.each( data.individuals[0].locations, function( key, val ) {
            items.push( "<li id='" + key + "'>xxx" + val + "</li>" );
        });

        //How to access JSON values
        //console.log(data.individuals); //"First Level of Json File"
        //console.log(data.individuals[0].locations[0].location_lat); //"Fourth Level of Json File , latitude nr.1"

        //Single Marker
        latNew = data.individuals[0].locations[0].location_lat;
        longNew = data.individuals[0].locations[0].location_long;
        var LatLongSingleArray = [latNew, longNew];

        //var markerSingle = L.marker(LatLongSingleArray, {icon: squirrelIcon}).addTo(map).bindPopup("AJAX REQUEST !!");

        console.log(latNew + ".." + longNew);

        var i, x, y;
        var latNewArray = [];
        var longNewArray = [];


        for (i in data.individuals[0].locations){
            x = data.individuals[0].locations[i].location_lat;
            y = data.individuals[0].locations[i].location_long;
            //console.log(x, y);
            latNewArray.push(x);
            longNewArray.push(y);

            //console.log(latNewArray);
            //console.log(longNewArray);

            var LatLongArrMulti = [latNewArray[i], longNewArray[i]];
            //
            // var markerMulti = L.marker(LatLongArrMulti, {icon: squirrelIcon}).addTo(map).bindPopup("AJAX REQUEST #2 !!");


            coords = {lat: x, lng: y };
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
        //console.log('helloWorld');
        //console.log(JSON.stringify(data)); // Output of Json Request (Movebank)*/
    }
});



module.exports =  {

    getData: function() {

        console.log("working");
        //alert("this is simple alert");
    },


    pushData: function () {
        console.log(latNew);
    },
    pushCoords: function (){
        console.log(polyArray);
    },
    getCoordArray: function () {
        return polyArray;
    }
};