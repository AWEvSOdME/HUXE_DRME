<template lang="html" xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="vue">
        <vmap  :position="position" :zoom="zoom" @zoom="onZoom" @move="onMove">
            <vmap-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&#34;http://osm.org/copyright&#34;>OpenStreetMap</a> contributors"></vmap-tile-layer>
            <vmap-marker v-for="markerPosition in markersOld" v-bind:key="markerPosition" :latlng="markerPosition.positionM" :visible="markerPosition.visible" :icon="markerPosition.icon"></vmap-marker>
            <vmap-polyline :latlngs="polyPos"></vmap-polyline>
        </vmap>
        <div id="input">
            <select v-model="selectAnimal" v-on:focusout="getAnimalName(selectAnimal.urlPublic, selectAnimal.urlStudyId), showNames()" >
                <option v-for="animal in animals" :value="animal">{{ animal.text }}</option>
            </select>
            <span>Selected: {{ selectAnimal.text }}</span><br>

            <select v-model="selectSpecificAnimal" >
                <option v-for="animalname in animalnames" v-bind:value="animalname.text">{{ animalname.text }}</option>
            </select>
            <span>Selected Animal: {{ selectSpecificAnimal }}</span><br>

            <img  v-bind:src="selectAnimal.imgSrc"><br>

            <button @click="addMarker(setPositionMarker(message), changeIcon(selectAnimal.iconSelected))">Add Marker</button><br>
            <div class="inputField">
                <input v-model="message"> <span>Selected Nmb: {{ message }}</span>
            </div>
            <button @click="makeSinglePoly(message)">poly SINGLE</button>
            <button @click="makePoly()">poly Multi</button>
            <button @click="getData(selectAnimal.urlPublic, selectAnimal.urlStudyId, selectSpecificAnimal, selectAnimal.urlSensor)">getData</button>
            <button @click="getAnimalName(selectAnimal.urlPublic, selectAnimal.urlStudyId)">getNames</button>
        </div>
        <div><Vinfo id="vueInfo"></Vinfo></div>

    </div>

</template>

<script>

    import Map from './Map.vue';
    import Info from './AnimalInfo.vue';
    import * as components from './components';

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

    var arrayCoords = [];
    var posi = [];
    var animalNamesArray = [];
    var requestUrl;

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
            selectAnimal: { text: 'Choose Animal', value: '', iconSelected: '', imgSrc: '', urlStudyId: '', urlPublic: '', urlAnimalId: '', urlSensor: ''},
            selectSpecificAnimal: { text: '', value: ''},
            iconAnimal: '',
            animals: [
                { text: 'Oenanthe', value: 'A', iconSelected: iconOen, imgSrc: imgOenSrc, urlStudyId: '58672150', urlPublic: priv, urlAnimalId: AnimalIdOen, urlSensor: 'solar-geolocator'},
                { text: 'White Stork', value: 'B', iconSelected: iconWhi, imgSrc: imgWhiSrc, urlStudyId: '92053942', urlPublic: priv, urlAnimalId: AnimalIdWhi, urlSensor: 'gps'},
                { text: 'Black Stork', value: 'C', iconSelected: iconBla, imgSrc: imgBlaSrc, urlStudyId: '102703103', urlPublic: priv, urlAnimalId: AnimalIdBla, urlSensor: 'gps'},
                { text: 'Crane', value: 'D', iconSelected: iconCra, imgSrc: imgCraSrc, urlStudyId: '17196801', urlPublic: priv, urlAnimalId: AnimalIdFal, urlSensor: 'argos-doppler-shift'}
            ],
            animalnames:[
                { text: '', value: ''}
            ],
            markersOld: [
                { positionM : {lat:50.622, lng: 6.174}, visible: true, icon: iconOen },
                { positionM : {lat:60.63, lng: 2.054}, visible: true, icon: iconCra }],
            pos: {lat:49.658, lng: 6.774},
            polyPos: [{lat: '', lng: ''}]

        }
      },
        watch: {
            selectAnimal:function (val, oldVal) {
                    alert('a thing changed' + val + oldVal)
            },
            animalnames:function(val){
                    this.selectSpecificAnimal = val
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
                this.lat = data.position.lat
                this.lng = data.position.lng
            },

            removeMarker (index) {
                this.markers.splice(index, 1)
            },

            addMarker () {
                this.markers.push(this.newMarker)
                this.newMarker = { lat: '', lng: '' }
            },

            addMarkerAtMapPosition () {
                this.markers.push({
                    lat: this.lat,
                    lng: this.lng
                })
            },

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
            addMarker (){
                this.markersOld.push(({
                    positionM: this.pos, icon: this.iconAnimal
                }))
            },
            changeIcon (icon){
                this.iconAnimal = icon;
            },

            outputCoords(){
                arrayCoords = main.getCoordArray();
                console.log(arrayCoords);
            },
            setPositionMarker(i){
                posi = main.getCoordArray();
                console.log(posi[i])
                this.pos = posi[i];
            },
            makeSinglePoly(i){
                posi = main.getCoordArray();
                this.polyPos.push(({
                    lat: posi[i].lat,
                    lng: posi[i].lng
                }))
                console.log(this.polyPos);
            },
            makePoly(){
                this.polyPos = [];
                posi = main.getCoordArray();
                var i;
                for (i = 0; i < posi.length; i++){
                    this.polyPos.push(({
                        lat: posi[i].lat,
                        lng: posi[i].lng
                    }))
                }
                console.log(this.polyPos);
            },
            getData(pp, si, ai, st){
                requestUrl = 'https://www.movebank.org/movebank/service/' + pp + '?study_id=' + si +'&individual_local_identifiers[]=' + ai + '&sensor_type=' + st + '';
                console.log('url: ' + requestUrl);
                main.doRequest(requestUrl);
            },
            getAnimalName(pp, studyId){

                requestUrl = 'https://www.movebank.org/movebank/service/' + pp + '?&entity_type=individual&study_id='+ studyId +'';
                console.log('url: ' + requestUrl);
                this.animalnames = [];
                animalNamesArray = main.getNames(requestUrl);
            },
            showNames(){
                var i;
                for (i in animalNamesArray){
                    this.animalnames.push(({
                        text: animalNamesArray[i].local_identifier,
                        value: animalNamesArray[i].idValue
                    }))
                }
            }

        }

    };


</script>
