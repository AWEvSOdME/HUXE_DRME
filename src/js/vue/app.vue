<template lang="html" xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="vue">
        <vmap  :position="position" :zoom="zoom" @move="onMove" @zoom="onZoom" @click="onClick" >
            <vmap-tile-layer v-if="selectMap.value === 'map1'" url="http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}" attribution="Imagery from <a href=&#34;http://giscience.uni-hd.de/&#34;>GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy;"></vmap-tile-layer>
            <vmap-tile-layer v-if="selectMap.value === 'map2'" url="http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}" attribution="Tiles &copy; Esri"></vmap-tile-layer>
            <vmap-tile-layer v-if="selectMap.value === 'map3'" url="http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png" attribution="&copy; <a href=&#34;http://www.openstreetmap.org/copyright&#34;>OpenStreetMap</a>"></vmap-tile-layer>
            <vmap-tile-layer v-if="selectMap.value === 'map4'" url="http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" attribution="Tiles &copy; Esri"></vmap-tile-layer>

            <vmap-marker v-for="markerPosition in markersOld" v-bind:key="markerPosition" :latlng="markerPosition.positionM" :visible="markerPosition.visible" :icon="markerPosition.icon" :draggable="markerPosition.draggable" :popupcontent="' <img id=' + popupImg +' src=' + markerPosition.iconPop +' > <p>Hello world!<br />This is a nice popup.</p>'"></vmap-marker>
            <vmap-polyline :latlngs="polyPos"></vmap-polyline>

            <!--PolyLine's Marker-->
            <vmap-marker v-for="markerPolyPosition in polyMarkerPos" v-if="markerPolyPosition.popupTitle!=''" v-bind:key="markerPolyPosition" :latlng="markerPolyPosition.positionM" :visible="markerPolyPosition.visible" :icon="markerPolyPosition.icon" :draggable="markerPolyPosition.draggable" :popupcontent="'<img id=' + popupImg +' src=' + selectAnimal.iconPop +' ><p> Species: ' + markerPolyPosition.popupName + '<br /> Specific animal: ' + markerPolyPosition.popupTitle + '<br /> Genus: ' + markerPolyPosition.popupText + '.</p>'"></vmap-marker>

        </vmap>
        <div class="input" v-if="!waiting">
            <p class="title">Select an Animal</p>

            <p class="textNormal">Species:
            <select v-model="selectAnimal"  >
                <option v-for="animal in animals" :value="animal">{{ animal.text }}</option>
            </select></p>

            <div v-show="show">
                <p class="textNormal">Specific Animal:
                <select v-model="selectSpecificAnimal" v-on:mouseleave="setSelectingDone(true)">
                    <option v-for="animalname in animalnames" v-bind:value="animalname.text">{{ animalname.text }}</option>
                </select></p>
            </div>


            <div id="resultDiv" v-show="show">
                <p class="selectingAnimal">Selected Animal</p>
                <img id="selectedImg" v-bind:src="selectAnimal.iconPop"><br>
                <p class="selectingResult">Species: <span>{{ selectAnimal.text }}</span></p>
                <p class="selectingResult">Genus: <span>{{ selectAnimal.genus }}</span></p>
                <p class="selectingResult">Animal: <span>{{ selectSpecificAnimal }}</span></p>

            </div><br>


            <!--div class="inputField">
                <input v-model="message"> <span>Selected Nmb: {{ message }}</span>
            </div-->
            <div id="SelectingNotDone" v-if="!selectingDone">
                <!--span>{{ status }}</span-->
                <button @click="doAlert(alertMessage)">show on map! xxx</button>
            </div>
            <div id="SelectingDone" v-else-if="selectingDone">
                <!--span>{{ status }}</span-->
                <button @click="getData(selectAnimal.urlPublic, selectAnimal.urlStudyId, selectSpecificAnimal, selectAnimal.urlSensor)">show on map!</button>
            </div>

            <button @click="activateAdding(true)">Add Marker</button>
            <button @click="activateAdding(false)">Stop Adding</button><br><br>



        </div>

        <div class="input" v-if="waiting"><div id="spinner">
        <scale-loader :loading="spinner.loading" :color="spinner.color" ></scale-loader>
        </div></div>

        <div><Vinfo id="vueInfo"></Vinfo></div>


        <div id="menuMap"><p class="textNormal">Switch Basemap:
            <select v-model="selectMap" v-on:onmouseover="selectMap = map" >
            <option v-for="map in maps" :value="map">{{ map.name }}</option>
            </select></p>
        </div>

    </div>

</template>

<script>

    import Map from './Map.vue';
    import Info from './AnimalInfo.vue';
    import * as components from './components';
    import * as $ from "jquery";
    import * as Vue from "vue";
    import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'

    var imgWheSrc =  '../../img/icon_wheatear.png';
    var imgWhiSrc =  '../../img/icon_whitestork.png';
    var imgBlaSrc =  '../../img/icon_blackstork.png';
    var imgFalSrc =  '../../img/icon_false_killer_whale.png';

    var imgWhePop = '../../img/wheatear.png';
    var imgWhiPop = '../../img/whitestork.png';
    var imgBlaPop = '../../img/blackstork.png';
    var imgFalPop = '../../img/false_killer_whale.png';


    var iconShadow = '../../img/marker-shadow.png';

    var iconWhe = L.icon({iconUrl:  imgWheSrc, shadowUrl: iconShadow, iconSize: [40, 56], iconAnchor: [20, 56], shadowSize:[50, 50], shadowAnchor: [14, 50], popupAnchor:  [0, -60]});
    var iconWhi = L.icon({iconUrl:  imgWhiSrc, shadowUrl: iconShadow, iconSize: [40, 56], iconAnchor: [20, 56], shadowSize:[50, 50], shadowAnchor: [14, 50], popupAnchor:  [0, -60]});
    var iconBla = L.icon({iconUrl:  imgBlaSrc, shadowUrl: iconShadow, iconSize: [40, 56], iconAnchor: [20, 56], shadowSize:[50, 50], shadowAnchor: [14, 50], popupAnchor:  [0, -60]});
    var iconFal = L.icon({iconUrl:  imgFalSrc, shadowUrl: iconShadow, iconSize: [40, 56], iconAnchor: [20, 56], shadowSize:[50, 50], shadowAnchor: [14, 50], popupAnchor:  [0, -60]});


    var AnimalIdWhe= 'bird%201';
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
    var drag = false;
    var dragtrue = true;
    var counter = 1;
    var counterArr = [];

    export default {
        name: 'app',
        components: {
            Vmap: Map,
            VmapMarker: components.Marker,
            VmapGeoJson: components.GeoJson,
            VmapLayerGroup: components.LayerGroup,
            VmapPolyline: components.Polyline,
            VmapTileLayer: components.TileLayer,
            Vinfo: Info,
            ScaleLoader
        },
      data () {
        return {
            lat: 49.1,
            lng: 0,
            zoom: 2,
            message: '1',
            selectAnimal: { text: 'Choose Animal', genus: '', iconSelected: '', imgSrc: '', urlStudyId: '', urlPublic: '', urlAnimalId: '', urlSensor: '', iconPop: ''},
            selectSpecificAnimal: { text: '', genus: ''},
            animals: [
                { text: 'Wheatear', genus: 'Oenanthe oenanthe', iconSelected: iconWhe, imgSrc: imgWheSrc, urlStudyId: '58672150', urlPublic: priv, urlAnimalId: AnimalIdWhe, urlSensor: 'solar-geolocator', iconPop: imgWhePop},
                { text: 'White Stork', genus: 'Ciconia ciconia', iconSelected: iconWhi, imgSrc: imgWhiSrc, urlStudyId: '92053942', urlPublic: priv, urlAnimalId: AnimalIdWhi, urlSensor: 'gps', iconPop: imgWhiPop},
                { text: 'Black Stork', genus: 'Ciconia negra', iconSelected: iconBla, imgSrc: imgBlaSrc, urlStudyId: '102703103', urlPublic: priv, urlAnimalId: AnimalIdBla, urlSensor: 'gps', iconPop: imgBlaPop},
                { text: 'False Killer Whale', genus: 'Pseudorca crassidens', iconSelected: iconFal, imgSrc: imgFalSrc, urlStudyId: '17196801', urlPublic: priv, urlAnimalId: AnimalIdFal, urlSensor: 'argos-doppler-shift', iconPop: imgFalPop}
            ],
            animalnames:[
                { text: '', genus: ''}
            ],
            markersOld: [
                { positionM : {lat:50.622, lng: 6.174}, visible: true, icon: iconWhe, draggable: drag, iconPop: imgWhePop },
                { positionM : {lat:60.63, lng: 2.054}, visible: true, icon: iconFal, draggable: drag, iconPop: imgFalPop }],
            pos: {lat:49.658, lng: 6.774},
            polyPos: [{lat: '', lng: ''}],
            polyMarkerPos: [{ positionM : {lat:'', lng: ''}, visible: '', icon: '', popupTitle: '', popupText: '' }],
            status: '...choose a specific animal! ',
            latClick: '',
            lngClick: '',
            addingActive: false,
            show: false,
            selectingDone: false,
            alertMessage: 'You first have to select a specific animal!',
            popupImg: 'popupImg',
            selectMap: {name: 'OpenMapSurfer Roads', value: 'map1'},
            maps: [{name: 'OpenMapSurfer Roads', value: 'map1'}, {name: 'Esri WorldStreetMap', value: 'map2'}, {name: 'OpenStreetMap BlackandWhite', value: 'map3'}, {name: 'Esri WorldImagery', value: 'map4'}],
            spinner: {loading: true, color: 'blue', height: '100', width: '100'},
            waiting: false
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
                this.waiting = true
            },
            polyMarkerPos: function(val){
                this.status = 'done :)'
                this.waiting = false

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


                if (!state){
                    for (var i = 0; i < counterArr.length; i++) {
                        //this.$set(this.markersOld[counterArr[i]], 'icon', iconWhe);
                        this.$set(this.markersOld[counterArr[i]], 'draggable', state);
                    }
                }

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
                counter = counter+1
                console.log('counter' + counter)
                this.markersOld.push(({
                    positionM: {lat: this.latClick, lng: this.lngClick}, icon: this.selectAnimal.iconSelected, draggable: drag, iconPop: this.selectAnimal.iconPop
                }))
                //this.$set(this.markersOld[counter], 'icon', iconWhi);
                this.$set(this.markersOld[counter], 'draggable', dragtrue)
                counterArr.push(counter)
                //console.log(counterArr)
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
                        positionM: polyArray[polyArray.length-1], icon: self.selectAnimal.iconSelected,
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
