<template lang="html" xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="vue">
        <vmap  :position="position" :zoom="zoom" @move="onMove" @zoom="onZoom" @click="onClick" @>
            <vmap-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&#34;http://osm.org/copyright&#34;>OpenStreetMap</a> contributors"></vmap-tile-layer>
            <vmap-marker v-for="markerPosition in markersOld" v-bind:key="markerPosition" :latlng="markerPosition.positionM" :visible="markerPosition.visible" :icon="markerPosition.icon" :popupcontent="'<p>Hello world!<br />This is a nice popup.</p>'"></vmap-marker>
            <vmap-polyline :latlngs="polyPos"></vmap-polyline>

            <!--PolyLine's Marker-->
            <vmap-marker v-for="markerPolyPosition in polyMarkerPos" v-if="markerPolyPosition.popupTitle!=''" v-bind:key="markerPolyPosition" :latlng="markerPolyPosition.positionM" :visible="markerPolyPosition.visible" :icon="markerPolyPosition.icon" :popupcontent="'<p> Species: ' + markerPolyPosition.popupName + '<br /> Specific animal: ' + markerPolyPosition.popupTitle + '<br /> Genus: ' + markerPolyPosition.popupText + '.</p>'"></vmap-marker>

        </vmap>
        <div id="input">
            <p class="title">Select an Animal</p>


            <select v-model="selectAnimal"  >
                <option v-for="animal in animals" :value="animal">{{ animal.text }}</option>
            </select>

            <div v-show="show">
                <p>hallo</p>
                <select v-model="selectSpecificAnimal" v-on:mouseleave="setSelectingDone(true)">
                    <option v-for="animalname in animalnames" v-bind:value="animalname.text">{{ animalname.text }}</option>
                </select>
            </div>


            <div id="resultDiv" v-show="show">
                <p class="selectingAnimal">Selected Animal</p>
                <img id="selectedImg" v-bind:src="selectAnimal.imgSrc"><br>
                <p class="selectingResult">Species: <span>{{ selectAnimal.text }}</span></p>
                <p class="selectingResult">Genus: <span>{{ selectAnimal.genus }}</span></p>
                <p class="selectingResult">Animal: <span>{{ selectSpecificAnimal }}</span></p>

            </div><br>


            <!--div class="inputField">
                <input v-model="message"> <span>Selected Nmb: {{ message }}</span>
            </div-->
            <div id="SelectingNotDone" v-if="!selectingDone">
                <span>{{ status }}</span>
                <button @click="doAlert(alertMessage)">show on map! xxx</button>
            </div>
            <div id="SelectingDone" v-else-if="selectingDone">
                <span>{{ status }}</span>
                <button @click="getData(selectAnimal.urlPublic, selectAnimal.urlStudyId, selectSpecificAnimal, selectAnimal.urlSensor)">show on map!</button>
            </div>

            <button @click="activateAdding(true)">Add Marker</button>
            <button @click="activateAdding(false)">Stop Adding</button><br>
        </div>
        <div><Vinfo id="vueInfo"></Vinfo></div>

    </div>

</template>

<script>

    import Map from './Map.vue';
    import Info from './AnimalInfo.vue';
    import * as components from './components';
    import * as $ from "jquery";

    var imgOenSrc =  '../../img/oenanthe.png';
    var imgWhiSrc =  '../../img/whitestork.png';
    var imgBlaSrc =  '../../img/blackstork.png';
    var imgCraSrc =  '../../img/crane.png';

    var iconOen = L.icon({iconUrl:  imgOenSrc});
    var iconWhi = L.icon({iconUrl:  imgWhiSrc});
    var iconBla = L.icon({iconUrl:  imgBlaSrc});
    var iconCra = L.icon({iconUrl:  imgCraSrc});


    var AnimalIdOen= 'bird%201';
    var AnimalIdWhi= '15007';
    var AnimalIdBla= '15011';
    var AnimalIdFal= '128881-Pc-NWHI';


    var priv = 'json-auth';
    var pub  = 'json';

    var main = require('../../js/data.js');

    var animalNamesArray = [];
    var requestUrl;

    var coords;
    var polyArray = [];
    var popupInfo, popupName, popupTaxName, nameId, nameIdArray;;
    var finished = false;

    export default {
        name: 'app',
        components: {
            Vmap: Map,
            VmapMarker: components.Marker,
            VmapGeoJson: components.GeoJson,
            VmapLayerGroup: components.LayerGroup,
            VmapPolyline: components.Polyline,
            VmapTileLayer: components.TileLayer,
            Vinfo: Info
        },
      data () {
        return {
            lat: 49.1,
            lng: 0,
            zoom: 2,
            message: '1',
            selectAnimal: { text: 'Choose Animal', genus: '', iconSelected: '', imgSrc: '', urlStudyId: '', urlPublic: '', urlAnimalId: '', urlSensor: ''},
            selectSpecificAnimal: { text: '', genus: ''},
            iconAnimal: 'iconOen',
            animals: [
                { text: 'Wheatear', genus: 'Oenanthe oenanthe', iconSelected: iconOen, imgSrc: imgOenSrc, urlStudyId: '58672150', urlPublic: priv, urlAnimalId: AnimalIdOen, urlSensor: 'solar-geolocator'},
                { text: 'White Stork', genus: 'Ciconia ciconia', iconSelected: iconWhi, imgSrc: imgWhiSrc, urlStudyId: '92053942', urlPublic: priv, urlAnimalId: AnimalIdWhi, urlSensor: 'gps'},
                { text: 'Black Stork', genus: 'Ciconia negra', iconSelected: iconBla, imgSrc: imgBlaSrc, urlStudyId: '102703103', urlPublic: priv, urlAnimalId: AnimalIdBla, urlSensor: 'gps'},
                { text: 'False Killer Whale', genus: 'Pseudorca crassidens', iconSelected: iconCra, imgSrc: imgCraSrc, urlStudyId: '17196801', urlPublic: priv, urlAnimalId: AnimalIdFal, urlSensor: 'argos-doppler-shift'}
            ],
            animalnames:[
                { text: '', genus: ''}
            ],
            markersOld: [
                { positionM : {lat:50.622, lng: 6.174}, visible: true, icon: iconOen },
                { positionM : {lat:60.63, lng: 2.054}, visible: true, icon: iconCra }],
            pos: {lat:49.658, lng: 6.774},
            polyPos: [{lat: '', lng: ''}],
            polyMarkerPos: [{ positionM : {lat:'', lng: ''}, visible: '', icon: '', popupTitle: '', popupText: '' }],
            status: '...choose a specific animal! ',
            latClick: '',
            lngClick: '',
            addingActive: false,
            show: false,
            selectingDone: false,
            alertMessage: 'You first have to select a specific animal!'
        }
      },
        watch: {
            selectAnimal:function (val, oldVal) {
                    //alert('a thing changed' + val + oldVal)
                    this.changeIcon(this.selectAnimal.iconSelected)
                    this.getAnimalName(this.selectAnimal.urlPublic, this.selectAnimal.urlStudyId)
                    this.show = true
                    this.selectingDone = false;
            },
            animalnames:function(val){
                    this.selectSpecificAnimal = val
            },
            selectSpecificAnimal: function (val){
            },
            polyPos: function (val){
                this.status = 'thinking'
            },
            polyMarkerPos: function(val){
                    this.status = 'done :)'

            },
            pos: function (val){
                this.zoom = 5;
            }
        },



        computed: {
            position () {
                return {
                    lat: this.lat,
                    lng: this.lng
                }
            }
        },
        methods: {
            onZoom (data) {
                this.zoom = data.zoom
            },

            onMove (data) {
                //this.lat = data.position.lat
                //this.lng = data.position.lng
                console.log(data.position.lat + '...' + this.lat)
            },


            onClick (data) {

                console.log('CLICK')
                console.log(data.latlng)
                this.latClick = data.latlng.lat
                this.lngClick = data.latlng.lng
                console.log(this.lngClick + '..x..' + this.latClick)
                if (this.addingActive) {
                    this.addMarker(this.changeIcon(this.selectAnimal.iconSelected))
                }
                else {
                    console.log('adding not active :)')
                }
            },
            activateAdding(state){
                this.addingActive = state;
            },


            removeMarker (index) {
                this.markers.splice(index, 1)
            },

            /*addMarker () {
                this.markers.push(this.newMarker)
                this.newMarker = { lat: '', lng: '' }
            },

            addMarkerAtMapPosition () {
                this.markers.push({
                    lat: this.lat,
                    lng: this.lng
                })
            },*/

            updateMarkerLat (index, event) {
                this.markers.splice(index, 1, {
                    ...this.markers[index],
                    lat: event.target.value
                })
            },

            updateMarkerLng (index, event) {
                this.markers.splice(index, 1, {
                    ...this.markers[index],
                    lng: event.target.value
                })
            },
            addMarker (){ //add marker to center of map
                this.markersOld.push(({
                    positionM: {lat: this.latClick, lng: this.lngClick}, icon: this.iconAnimal
                }))
            },
            changeIcon (icon){
                this.iconAnimal = icon;
            },
            removeMarkerMy (index) {
                this.polyMarkerPos.splice(index, 1)
            },
            setSelectingDone (done){
                console.log(this.selectSpecificAnimal)
                if (this.selectSpecificAnimal != undefined) {
                    console.log('done???')
                    console.log(this.selectSpecificAnimal)
                    this.selectingDone = done;
                }
            },
            doAlert(alertMessage){
                alert('Error: ' + alertMessage)
            },
            getData(pp, si, ai, st){ //get Movebank Data from single animal

                requestUrl = 'https://www.movebank.org/movebank/service/' + pp + '?study_id=' + si +'&individual_local_identifiers[]=' + ai + '&sensor_type=' + st + '';
                //console.log('url: ' + requestUrl);
                this.polyPos = [];



                var self = this;

                $.when(main.doRequest(requestUrl)).done(function(data){
                    //console.log(data); //all requested data of the animal in array
                    popupName = data.individuals[0].individual_local_identifier;
                    popupTaxName = data.individuals[0].individual_taxon_canonical_name;
                    popupInfo = {name: popupName, taxName: popupTaxName };

                    //Clear vars, to only show 1 animal at the same time.
                    polyArray = [];
                    self.removeMarkerMy(1);

                    // loop through data array, write all coordinates into polyArray var.
                    var i, x, y, j;
                    for (i in data.individuals[0].locations){
                        x = data.individuals[0].locations[i].location_lat;
                        y = data.individuals[0].locations[i].location_long;

                        coords = {lat: x, lng: y };
                        polyArray.push(coords);
                        //console.log(polyArray); //check if coordinates were written into polyArray
                    };

                    //make polyline here
                    for (j = 0; j < polyArray.length; j++){
                        self.polyPos.push(({
                            lat: polyArray[j].lat,
                            lng: polyArray[j].lng
                        }))
                    };
                    //console.log(self.polyPos); //check if there is output

                    //Add Marker to end of Polyline (with Popup)
                    self.polyMarkerPos.push(({
                        positionM: polyArray[polyArray.length-1], icon: self.iconAnimal,
                        visible: true,
                        popupName: self.selectAnimal.text,
                        popupTitle: popupInfo.name,
                        popupText: self.selectAnimal.genus
                    }))

                    // moving to path
                    self.lat = null; self.lng = null;
                    self.lat = polyArray[polyArray.length-1].lat;
                    self.lng = polyArray[polyArray.length-1].lng;

                    finished = true;

                })

            },
            getAnimalName(pp, studyId){
                requestUrl = 'https://www.movebank.org/movebank/service/' + pp + '?&entity_type=individual&study_id='+ studyId +'';
                //console.log(animalNamesArray);

                var self = this;

                $.when(main.doRequest(requestUrl)).done(function(data) {
                    var i, id, name, sensor;
                    var idArray = [];
                    var nameArray = [];

                    nameIdArray = [];
                    self.animalnames = [];

                    for (i in data) {
                        id = data[i].id;
                        name = data[i].local_identifier;

                        if (name.includes('cal') == false) {
                            //console.log(name);
                            idArray.push(id);
                            nameArray.push(name);
                            nameId = {local_identifier: name, idValue: id};
                            nameIdArray.push(nameId);
                        }
                    }
                    var j;
                    for (j in nameIdArray){
                        self.animalnames.push(({
                            text: nameIdArray[j].local_identifier,
                            genus: nameIdArray[j].idValue
                        }))
                    }
                })
            }
        }

    };


</script>
