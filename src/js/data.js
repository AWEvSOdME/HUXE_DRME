
var latNew, longNew, coords, nameId;
var polyArray = [];
var nameIdArray;


module.exports =  {

    pushData: function () {
        console.log(latNew);
    },
    pushCoords: function (){
        console.log(polyArray);
    },
    getCoordArray: function () {
        return polyArray;
    },
    getNameArray: function () {
        return nameIdArray;
    },
    doRequest: function(requestUrl){
        $.ajax({

            type: 'GET',
            //important because of security restrictions !!!! (CORS...)
            crossDomain: true,
            dataType: 'jsonp',

            // The URL to make the request to.
            url: requestUrl,
            success: function( data ){

                //How to access JSON values
                console.log(data.individuals); //"First Level of Json File"
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
                polyArray = [];

                for (i in data.individuals[0].locations){
                    x = data.individuals[0].locations[i].location_lat;
                    y = data.individuals[0].locations[i].location_long;
                    //console.log(x, y);
                    latNewArray.push(x);
                    longNewArray.push(y);

                    coords = {lat: x, lng: y };

                    polyArray.push(coords);

                }
                //console.log(JSON.stringify(data)); // Output of Json Request (Movebank)*/
            }
        });
    },
    getNames: function(requestUrl){
        $.ajax({

            type: 'GET',
            //important because of security restrictions !!!! (CORS...)
            crossDomain: true,
            dataType: 'jsonp',

            // The URL to make the request to.
            url: requestUrl,
            success: function( data ){

                var i, id, name;
                var idArray = [];
                var nameArray = [];

                nameIdArray = [];



                for (i in data){
                    id = data[i].id;
                    name = data[i].local_identifier;


                    if (name.includes('cal') == false) {
                        console.log(name);
                        idArray.push(id);
                        nameArray.push(name);
                        nameId = {local_identifier: name, idValue: id };
                        nameIdArray.push(nameId);
                    }



                }

            }
        });
        return nameIdArray;
    }
};