<template lang="html" xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="vue">
        <vmap  :position="position" :zoom="zoom" @zoom="onZoom" @move="onMove">
            <vmap-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&#34;http://osm.org/copyright&#34;>OpenStreetMap</a> contributors"></vmap-tile-layer>
            <vmap-marker v-for="markerPosition in markersOld" v-bind:key="markerPosition" :latlng="markerPosition.positionM" :visible="markerPosition.visible" :icon="markerPosition.icon"></vmap-marker>
            <vmap-polyline :latlngs="polyPos"></vmap-polyline>
        </vmap>
        <div id="input">
            <select v-model="selectAnimal">
                <option v-for="animal in animals" :value="animal">{{ animal.text }}</option>
            </select>
            <span>Selected: {{ selectAnimal.text }}</span><br>
            <img  v-bind:src="selectAnimal.imgSrc"><br>

            <button @click="addMarker(setPositionMarker(message), changeIcon(selectAnimal.iconSelected))">Add Marker</button><br>
            <!--button @click="outputCoords(message)">AJAX</button><br-->
            <div class="inputField">
                <input v-model="message"> <span>Selected Nmb: {{ message }}</span>
            </div>

            <!--button @click="setPositionMarker(message)">SHOW</button-->
            <button @click="makeSinglePoly(message)">poly SINGLE</button>
            <button @click="makePoly()">poly Multi</button>
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

    var main = require('../../js/data.js');
    main.getData();
    main.pushData();

    var arrayCoords = [];
    var posi = [];

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
            message: '1',
            selectAnimal: { text: 'Oenanthe', value: 'A', iconSelected: iconOen, imgSrc: '../../img/oenanthe.png'},
            iconAnimal: '',
            animals: [
                { text: 'Oenanthe', value: 'A', iconSelected: iconOen, imgSrc: imgOenSrc},
                { text: 'White Stork', value: 'B', iconSelected: iconWhi, imgSrc: imgWhiSrc},
                { text: 'Black Stork', value: 'C', iconSelected: iconBla, imgSrc: imgBlaSrc},
                { text: 'Crane', value: 'D', iconSelected: iconCra, imgSrc: imgCraSrc}
            ],
            zoom: 2,
            markersOld: [
                { positionM : {lat:50.622, lng: 6.174}, visible: true, icon: iconOen },
                { positionM : {lat:60.63, lng: 2.054}, visible: true, icon: iconCra }],
            pos: {lat:49.658, lng: 6.774},
            polyPos: [{lat: 30.614, lng: 8.084}],
        }
      },
        watch: {
            selectAnimal:{
                handler: function (val, oldVal) {
                    alert('a thing changed')
                }
            }
        },


        computed: {
            position () {
                return {
                    lat: this.lat,
                    lng: this.lng
                }
            },

            stuff: function () {
                return this.numbers.filter(function (number) {
                    return number % 2 === 0
                })
            },

            coords: function () {
                return this.animals
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
            doRequest(){
                main.pushData();
                main.pushCoords();
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
                posi = main.getCoordArray();
                var i;
                for (i = 0; i < posi.length; i++){
                    this.polyPos.push(({
                        lat: posi[i].lat,
                        lng: posi[i].lng
                    }))
                }
                console.log(this.polyPos);
            }
        }

    };


</script>
