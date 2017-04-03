<template lang="html" xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="vue">
        <vmap id="vuemap" :position="position" :zoom="zoom" @zoom="onZoom" @move="onMove">
            <vmap-tile-layer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&#34;http://osm.org/copyright&#34;>OpenStreetMap</a> contributors"
            ></vmap-tile-layer>
            <vmap-marker v-for="markerPosition in markersOld" v-bind:key="markerPosition" :latlng="markerPosition.position" :visible="markerPosition.visible" :icon="markerPosition.icon"></vmap-marker>
            <vmap-marker :latlng="marki.position" :visible="marki.visible" :icon="marki.icon" ></vmap-marker>
            <!--vmap-layer-group>
                <vmap-geo-json :data="geoJson" :feature-style="geoJsonStyle"></vmap-geo-json>
            </vmap-layer-group-->
            <!--vmap-polyline :latlngs="[{lat: 49.614, lng: 6.084}, { lat: 49.62, lng: 6.118 }]"></vmap-polyline-->
            <vmap-marker v-for="markerOH in markersNew" v-bind:key="markerOH" :latlng="markerOH.position" :visible="markerOH.visible" :icon="markerOH.icon"></vmap-marker>
        </vmap>
        <div id="input">
            <select v-model="selected">
                <option v-for="animal in animals" :value="animal">{{ animal.text }}</option>
            </select>
            <span>Selected: {{ selected.text }}</span>
            <span>Selected: {{ selected.value }}, {{selected.text}}</span>
            <div v-if="selected.value === 'A'"> <img  v-bind:src="imgOen"></div>
            <div v-if="selected.value === 'B'"> <img  v-bind:src="imgWhi"></div>
            <div v-if="selected.value === 'C'"> <img  v-bind:src="imgBla"></div>
            <div v-if="selected.value === 'D'"> <img  v-bind:src="imgCra"></div>
            <button @click="addMarker(pos, changeIcon(selected.iconSelected))">Add</button>
            <button @click="changeIcon(selected.iconSelected)">Change</button>
            <button @click="outputCoords(selectedNmb)">AJAX</button><br>
            <div>
                <input v-model="message">
            </div>
            <span>Selected Nmb: {{ message }}</span>
            <button @click="showAnimal(message)">SHOW</button>
        </div>
    </div>

</template>

<script>

    import Map from './Map.vue';
    import * as components from './components';

    var urlTest =  '../../img/oenanthe.png';


    var customIcon = L.icon({
        iconUrl:  urlTest,
        shadowUrl: ''
    });
    var customIcon2 = L.icon({
        iconUrl:  '../../img/whitestork.png',
        shadowUrl: ''
    });
    var customIcon3 = L.icon({
        iconUrl:  '../../img/blackstork.png',
        shadowUrl: ''
    });
    var customIcon4 = L.icon({
        iconUrl:  '../../img/crane.png',
        shadowUrl: ''
    });

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
            VmapTileLayer: components.TileLayer
        },
      data () {
        return {
            message: '1',
            selected: 'White Stork',
            selectedNmb: '1',
            iconNew: customIcon3,
            iconNew2: customIcon,
            iconNew3: customIcon2,
            animals: [
                { text: 'Oenanthe', value: 'A' , iconSelected: customIcon},
                { text: 'White Stork', value: 'B', iconSelected: customIcon2 },
                { text: 'Black Stork', value: 'C', iconSelected: customIcon3 },
                { text: 'Crane', value: 'D', iconSelected: customIcon4 }
            ],
            lat: 49.611,
            lng: 6.13,
            zoom: 2,
            numbers: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ],
            markersOld: [
                { position : {lat:50.622, lng: 6.174}, visible: true, icon: customIcon },
                { position : {lat:50.63, lng: 6.054}, visible: true, icon: customIcon2 }],
            imgOen:  '../../img/oenanthe.png',
            imgCra:  '../../img/crane.png',
            imgBla:  '../../img/blackstork.png',
            imgWhi:  '../../img/whitestork.png',
            pos: {lat:49.658, lng: 6.774},
            markersNew:[
                { position : {lat:49.658, lng: 6.074}, visible: true, icon: customIcon },
                { position : {lat:49.65, lng: 6.084}, visible: true, icon: customIcon2 }],
            marki: { position : {lat:49.658, lng: 6.374}, visible: true, icon: customIcon },
            geoJson: {
                type: 'Polygon',
                coordinates: [
                    [
                        [
                            6.114921569824219,
                            49.612378400270195
                        ],
                        [
                            6.125907897949219,
                            49.618495606374275
                        ],
                        [
                            6.139812469482421,
                            49.617272226578514
                        ],
                        [
                            6.141357421875,
                            49.61148856087291
                        ],
                        [
                            6.14032745361328,
                            49.60626042633693
                        ],
                        [
                            6.126594543457031,
                            49.60247802203419
                        ],
                        [
                            6.113376617431641,
                            49.60715036117516
                        ],
                        [
                            6.114921569824219,
                            49.612378400270195
                        ]
                    ]
                ]
            },
            geoJsonStyle: function () {
                return {
                    color: '#933'
                }
            }
        }
      },
        watch: {

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
                this.markersNew.push(({
                    position: this.pos, icon: this.iconNew
                }))
            },
            changeIcon (iconN){
                this.iconNew = iconN;
            },
            doRequest(){
                main.pushData();
                main.pushCoords();
            },
            outputCoords(i){
                arrayCoords = main.getCoordArray();
                console.log(arrayCoords[i]);
            },
            showAnimal(i){
                posi = main.getCoordArray();
                console.log(posi[i])
                this.pos = posi[i];
            }
        }

    };


</script>
