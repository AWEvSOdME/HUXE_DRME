<template lang="html" xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="vue">
        <vmap  :position="position" :zoom="zoom" @move="onMove" @zoom="onZoom" @click="onClick" >
            <vmap-tile-layer v-if="selectMap.value === 'map1'" url="http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}" attribution="Imagery from <a href='http://giscience.uni-hd.de/'>GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy;"></vmap-tile-layer>
            <vmap-tile-layer v-if="selectMap.value === 'map2'" url="http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}" attribution="Tiles &copy; Esri"></vmap-tile-layer>
            <vmap-tile-layer v-if="selectMap.value === 'map3'" url="http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png" attribution="&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"></vmap-tile-layer>
            <vmap-tile-layer v-if="selectMap.value === 'map4'" url="http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" attribution="Tiles &copy; Esri"></vmap-tile-layer>

            <vmap-marker @drag="onDrag" v-for="markerPosition in markersOld" v-bind:key="markerPosition" :latlng="markerPosition.positionM" :visible="markerPosition.visible" :icon="markerPosition.icon" :draggable="markerPosition.draggable" :popupcontent="' <p> Class: ' + markerPosition.animalclass + '<br /> Species: ' + markerPosition.species + '<br /> Family: ' + markerPosition.family + '<br /> Additional Info: ' + markerPosition.additionalInfo + '<br /> Date: ' + markerPosition.date + '.</p>'"></vmap-marker>
            <vmap-polyline :latlngs="polyPos"></vmap-polyline>

            <!--PolyLine's Marker-->
            <vmap-marker v-for="markerPolyPosition in polyMarkerPos" v-if="markerPolyPosition.popupTitle!=''" v-bind:key="markerPolyPosition" :latlng="markerPolyPosition.positionM" :visible="markerPolyPosition.visible" :icon="markerPolyPosition.icon" :draggable="markerPolyPosition.draggable" :popupcontent="'<img id=' + popupImg +' src=' + selectAnimal.iconPop +' ><p> Species: ' + markerPolyPosition.popupName + '<br /> Specific animal: ' + markerPolyPosition.popupTitle + '<br /> Genus: ' + markerPolyPosition.popupText + '.</p>'"></vmap-marker>

        </vmap>
        <div class="input">

            <!-- INPUT MENU -->
            <nav v-bind:class="inputMenu" v-on:click.prevent class="selectMenu">
                <a href="#" class="show" v-on:click="setInputMenu('show')">Show animal</a><span class="sep">   |   </span>
                <a href="#" v-show="logChecker==='true'" class="addEna" v-on:click="setInputMenu('add')" >Add animal</a> <span v-show="logChecker==='true'" class="sep">   |   </span>
                <a href="#" v-show="logChecker==='true'" class="deleteEna" v-on:click="setInputMenu('delete')">Delete animal</a>
                <a href="#" v-show="logChecker==='false'" class="addDis" v-on:click="setInputMenu('add')" >Add animal</a><span v-show="logChecker==='false'" class="sep">   |   </span>
                <a href="#" v-show="logChecker==='false'" class="deleteDis" v-on:click="setInputMenu('delete')">Delete animal</a>
            </nav>

            <hr>

            <!-- Menu SHOW -->
            <div v-show="inputMenu === 'show'">

                <div class="selectText">
                <span class="textNormal">Species:</span>
                <select v-model="selectAnimal"  >
                    <option class="optionAnimal" v-for="animal in animals" :value="animal">{{ animal.text }}</option>
                </select></div>

                <div v-show="show">
                    <div class="selectText">
                    <span class="textNormal">Specific Animal:</span>
                    <select v-model="selectSpecificAnimal" v-on:mouseleave="setSelectingDone(true)">
                        <option v-for="animalname in animalnames" v-bind:value="animalname.text">{{ animalname.text }}</option>
                    </select></div>
                </div>


                <div class="resultDiv" v-show="show">
                    <img id="selectedImg" v-bind:src="selectAnimal.iconPop">
                    <p class="selectingResult">Species: <span>{{ selectAnimal.text }}</span></p>
                    <p class="selectingResult">Genus: <span>{{ selectAnimal.genus }}</span></p>
                    <p class="selectingResult">Animal: <span>{{ selectSpecificAnimal }}</span></p>
                </div>

                <table class="selectButtonDiv" >
                    <tr>
                        <td><button v-show="selectingDone" class="selectButton" @click="getData(selectAnimal.urlStudyId, selectSpecificAnimal, selectAnimal.urlSensor), setInputMenu('waiting')">SHOW</button></td>
                        <td rowspan="2"><vue-slider v-if="selectingCompleteDone" id="slider" ref="slider" v-bind="demo.default" v-model="demo.default.value"></vue-slider>
                            <div id="sliderInfo"><span v-if="selectingCompleteDone" class="sliderInfoSpan" >{{sliderHelp}}</span></div></td>
                    </tr>
                    <tr>
                        <td><button v-show="selectingCompleteDone" class="selectButton" @click="hideAnimal()">CLEAR</button></td>


                    </tr>

                </table>




            </div>

            <!-- Menu ADD -->
            <div v-show="inputMenu === 'add'">


                <div v-show="logChecker ==='true'">
                <!--p class="textNormal">Animal Class:
                <select v-model="selectAnimalClass"  >
                    <option v-for="animal in animalClass" :value="animal">{{ animal.class }}</option>
                </select></p-->


                <form id="form4" v-on:submit.prevent="activateAdding(true), outputAnimalNew()">
                    <div class="form-group">
                        <table class="animalTable">
                            <tr>
                                <td><label class="animalLabel">Class</label></td>
                                <td><label class="animalLabel">Date</label></td>
                            </tr>
                            <tr>
                                <td class="animalTableField"><select v-model="selectAnimalClass"  >
                                    <option v-for="animal in animalClass" :value="animal">{{ animal.class }}</option>
                                </select></td>
                                <td class="animalTableField"><datepicker :value="state.date" :format="state.format" v-model="newAnimal.timestamp"></datepicker></td>
                            </tr>
                            <tr>
                                <td><label class="animalLabel">Species</label></td>
                                <td><label class="animalLabel">Family</label></td>
                            </tr>
                            <tr>
                                <td><input type="animal" v-model="newAnimal.species" placeholder=""></td>
                                <td><input type="animal" v-model="newAnimal.family" placeholder=""></td>
                            </tr>
                            <tr>
                                <td><label class="animalLabel">Additional Info</label></td>
                                <td rowspan="2" class="animalTableButton">
                                    <input v-if="addState === 'beforeadd'" type="submit" value="ADD" disabled="true">
                                    <input v-if="addState === 'add'" v-bind:class="{ addButtonEna: doAdd, addButtonDis: !doAdd}" type="submit" value="ADD">
                                    <input v-if="addState === 'save'" v-on:click="saveAnimal()" class="submitSave" type="reset" value="SAVE">
                                </td>
                            </tr>
                            <tr>
                                <td><input type="animal" v-model="newAnimal.additionalInfo" placeholder=""></td>

                            </tr>

                        </table>

                        {{listAnimal}}

                    </div>
                </form>


                <div class="resultDivAdd" v-if="showSelectedClass">
                    <img id="selectedIcon" v-bind:src="selectAnimalClass.imgSrc"><br>
                    <p class="selectingResult">Class: <span>{{ newAnimal.animalclass }}</span></p>
                    <p class="selectingResult">Species: <span>{{ newAnimal.species }}</span></p>
                    <p class="selectingResult">Family: <span>{{ newAnimal.family }}</span></p>
                </div><br>


                </div>
                <div v-show="logChecker === 'false'">
                    <p>NOT LOGGED IN</p>
                </div>

                <!--button class="selectButton" @click="activateAdding(true)">Add Marker</button-->
                <!--button-- class="selectButton" @click="activateAdding(false)">Stop Adding</button--><br><br>
            </div>

            <!-- Menu DELETE -->
            <div v-show="inputMenu === 'delete'">
                <div v-show="logChecker === 'true'">
                    <p> Here are delete things happening</p>
                </div>
                <div v-show="logChecker === 'false'">
                    <p>NOT LOGGED IN</p>
                </div>
            </div>

            <!-- Menu WAITING -->
            <div v-show="inputMenu === 'waiting'">
                <div id="spinner">
                    <scale-loader :loading="spinner.loading" :color="spinner.color" ></scale-loader>
                    <p class="selectingResult"> Waiting for requested Data... </p>
                </div>
            </div>

        </div>

        <!-- Animal Info -->
        <div><Vinfo id="vueInfo" :animal="animalInfo"></Vinfo></div>

        <!-- Navigation -->
        <div>
            <img id="logo" src="../../img/logo.png">


            <Vnavi ref="refNavi" id="vueNavi" @update="changeMap" @login="changeLog" @getAnimalList="viewAnimalList" v-bind:cAnimal="newAnimal"></Vnavi>

            <!--Vnavi id="vueNavi" @changeMap="destroyReaction(reaction)" :reaction="reaction"></Vnavi-->
            <!--Vnavi id="vueNavi" :reaction="reaction" @update="changeMap""></Vnavi-->

        </div>


    </div>

</template>

<script>



    import Map from './Map.vue';
    import Info from './AnimalInfo.vue';
    import Navi from './navigation/navi.vue';
    import * as components from './components';
    import * as $ from "jquery";
    import Vue from 'Vue';
    import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
    import vueSlider from 'vue-slider-component';
    import Datepicker from 'vuejs-datepicker';



    var main = require('../../js/data.js');

    var imgWheSrc =  '../../img/icon_wheatear.png';
    var imgWhiSrc =  '../../img/icon_whitestork.png';
    var imgBlaSrc =  '../../img/icon_blackstork.png';
    var imgFalSrc =  '../../img/icon_false_killer_whale.png';
    var imgAgoSrc =  '../../img/icon_agouti.png';
    var imgAfrSrc =  '../../img/icon_african_elephant.png';
    var imgLioSrc =  '../../img/icon_lion.png';
    var imgOceSrc =  '../../img/icon_ocelot.png';
    var imgSkiSrc =  '../../img/icon_black_skimmer.png';

    var imgMamSrc =  '../../img/icon_mammal.png';
    var imgBirSrc =  '../../img/icon_bird.png';
    var imgFisSrc =  '../../img/icon_fish.png';
    var imgRepSrc =  '../../img/icon_reptile.png';
    var imgInsSrc =  '../../img/icon_insect.png';
    var imgAmpSrc =  '../../img/icon_amphib.png';

    var imgWhePop = '../../img/wheatear.png';
    var imgWhiPop = '../../img/whitestork.png';
    var imgBlaPop = '../../img/blackstork.png';
    var imgFalPop = '../../img/false_killer_whale.png';
    var imgAgoPop = '../../img/agouti.png';
    var imgAfrPop = '../../img/african_elephant.png';
    var imgLioPop = '../../img/lion.png';
    var imgOcePop = '../../img/ocelot.png';
    var imgSkiPop = '../../img/black_skimmer.png';

    var iconShadow = '../../img/marker-shadow.png';

    var iconWhe = L.icon({iconUrl:  imgWheSrc, shadowUrl: iconShadow, iconSize: [40, 56], iconAnchor: [20, 56], shadowSize:[50, 50], shadowAnchor: [14, 50], popupAnchor:  [0, -60]});
    var iconWhi = L.icon({iconUrl:  imgWhiSrc, shadowUrl: iconShadow, iconSize: [40, 56], iconAnchor: [20, 56], shadowSize:[50, 50], shadowAnchor: [14, 50], popupAnchor:  [0, -60]});
    var iconBla = L.icon({iconUrl:  imgBlaSrc, shadowUrl: iconShadow, iconSize: [40, 56], iconAnchor: [20, 56], shadowSize:[50, 50], shadowAnchor: [14, 50], popupAnchor:  [0, -60]});
    var iconFal = L.icon({iconUrl:  imgFalSrc, shadowUrl: iconShadow, iconSize: [40, 56], iconAnchor: [20, 56], shadowSize:[50, 50], shadowAnchor: [14, 50], popupAnchor:  [0, -60]});
    var iconAgo = L.icon({iconUrl:  imgAgoSrc, shadowUrl: iconShadow, iconSize: [40, 56], iconAnchor: [20, 56], shadowSize:[50, 50], shadowAnchor: [14, 50], popupAnchor:  [0, -60]});
    var iconAfr = L.icon({iconUrl:  imgAfrSrc, shadowUrl: iconShadow, iconSize: [40, 56], iconAnchor: [20, 56], shadowSize:[50, 50], shadowAnchor: [14, 50], popupAnchor:  [0, -60]});
    var iconLio = L.icon({iconUrl:  imgLioSrc, shadowUrl: iconShadow, iconSize: [40, 56], iconAnchor: [20, 56], shadowSize:[50, 50], shadowAnchor: [14, 50], popupAnchor:  [0, -60]});
    var iconOce = L.icon({iconUrl:  imgOceSrc, shadowUrl: iconShadow, iconSize: [40, 56], iconAnchor: [20, 56], shadowSize:[50, 50], shadowAnchor: [14, 50], popupAnchor:  [0, -60]});
    var iconSki = L.icon({iconUrl:  imgSkiSrc, shadowUrl: iconShadow, iconSize: [40, 56], iconAnchor: [20, 56], shadowSize:[50, 50], shadowAnchor: [14, 50], popupAnchor:  [0, -60]});

    var iconMam = L.icon({iconUrl:  imgMamSrc, shadowUrl: iconShadow, iconSize: [40, 56], iconAnchor: [20, 56], shadowSize:[50, 50], shadowAnchor: [14, 50], popupAnchor:  [0, -60]});
    var iconBir = L.icon({iconUrl:  imgBirSrc, shadowUrl: iconShadow, iconSize: [40, 56], iconAnchor: [20, 56], shadowSize:[50, 50], shadowAnchor: [14, 50], popupAnchor:  [0, -60]});
    var iconFis = L.icon({iconUrl:  imgFisSrc, shadowUrl: iconShadow, iconSize: [40, 56], iconAnchor: [20, 56], shadowSize:[50, 50], shadowAnchor: [14, 50], popupAnchor:  [0, -60]});
    var iconRep = L.icon({iconUrl:  imgRepSrc, shadowUrl: iconShadow, iconSize: [40, 56], iconAnchor: [20, 56], shadowSize:[50, 50], shadowAnchor: [14, 50], popupAnchor:  [0, -60]});
    var iconIns = L.icon({iconUrl:  imgInsSrc, shadowUrl: iconShadow, iconSize: [40, 56], iconAnchor: [20, 56], shadowSize:[50, 50], shadowAnchor: [14, 50], popupAnchor:  [0, -60]});
    var iconAmp = L.icon({iconUrl:  imgAmpSrc, shadowUrl: iconShadow, iconSize: [40, 56], iconAnchor: [20, 56], shadowSize:[50, 50], shadowAnchor: [14, 50], popupAnchor:  [0, -60]});

    var coords, popupInfo, popupName, popupTaxName, nameId, nameIdArray, requestUrl, times;
    var finished = false; var drag = false;var dragtrue = true;
    var counterArr = []; var polyArray = []; var timeArray = [];
    var counter = 1;



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
            ScaleLoader,
            vueSlider,
            Datepicker,
            Vnavi: Navi,
        },
      data () {
        return {
            reaction: '',

            lat: 49.1,
            lng: 0,
            zoom: 2,
            message: '1',
            selectAnimal: { text: '', genus: '', iconSelected: '', imgSrc: '', urlStudyId: '', urlPublic: '', urlSensor: '', iconPop: ''},
            selectAnimalClass: { class: '', genus: '', iconSelected: '', imgSrc: ''},
            selectSpecificAnimal: { text: '', genus: ''},
            animals: [
                { text: 'Wheatear', genus: 'Oenanthe oenanthe', iconSelected: iconWhe, imgSrc: imgWheSrc, urlStudyId: '58672150', urlSensor: 'solar-geolocator', iconPop: imgWhePop},
                { text: 'White Stork', genus: 'Ciconia ciconia', iconSelected: iconWhi, imgSrc: imgWhiSrc, urlStudyId: '92053942', urlSensor: 'gps', iconPop: imgWhiPop},
                { text: 'Black Stork', genus: 'Ciconia negra', iconSelected: iconBla, imgSrc: imgBlaSrc, urlStudyId: '102703103', urlSensor: 'gps', iconPop: imgBlaPop},
                { text: 'False Killer Whale', genus: 'Pseudorca crassidens', iconSelected: iconFal, imgSrc: imgFalSrc, urlStudyId: '17196801', urlSensor: 'argos-doppler-shift', iconPop: imgFalPop},
                { text: 'Agouti', genus: 'Dasyprocta', iconSelected: iconAgo, imgSrc: imgAgoSrc, urlStudyId: '82207', urlSensor: 'gps', iconPop: imgAgoPop},
                { text: 'African Elephant', genus: 'Loxodonta africana', iconSelected: iconAfr, imgSrc: imgAfrSrc, urlStudyId: '1818825', urlSensor: 'gps', iconPop: imgAfrPop},
                { text: 'Lion', genus: 'Panthera leo', iconSelected: iconLio, imgSrc: imgLioSrc, urlStudyId: '220229', urlSensor: 'gps', iconPop: imgLioPop},
                { text: 'Ocelot', genus: 'Leopardus pardalis', iconSelected: iconOce, imgSrc: imgOceSrc, urlStudyId: '123413', urlSensor: 'radio-transmitter', iconPop: imgOcePop},
                { text: 'Black Skimmer', genus: 'Rynchops niger', iconSelected: iconSki, imgSrc: imgSkiSrc, urlStudyId: '126103076', urlSensor: 'argos-doppler-shift', iconPop: imgSkiPop},
            ],
            animalnames:[
                { text: '', genus: ''}
            ],
            animalClass: [
                { class: 'Mammal', iconSelected: iconMam, imgSrc: imgMamSrc},
                { class: 'Bird', iconSelected: iconBir, imgSrc: imgBirSrc},
                { class: 'Fish', iconSelected: iconFis, imgSrc: imgFisSrc},
                { class: 'Reptile', iconSelected: iconRep, imgSrc: imgRepSrc},
                { class: 'Insect', iconSelected: iconIns, imgSrc: imgInsSrc},
                { class: 'Amphib', iconSelected: iconAmp, imgSrc: imgAmpSrc}
            ],
            markersOld: [
                { positionM : {lat:50.622, lng: 6.174}, visible: true, icon: iconBir, draggable: drag, animalclass: 'Bird', species: 'Wheatear', family: 'Muscicapidae', additionalInfo: 'female', date: '20-2-2005' },
                { positionM : {lat:60.63, lng: 2.054}, visible: true, icon: iconFis, draggable: drag, animalclass: 'Fish', species: 'Cat Shark', family: 'Scyliorhinidae', additionalInfo: 'young animal', date: '20-2-2012' }],
            pos: {lat:49.658, lng: 6.774},
            polyPos: [{lat: '', lng: '', time: ''}],
            polyMarkerPos: [{ positionM : {lat:'', lng: ''}, visible: '', icon: '', popupTitle: '', popupText: '', time: '' }],
            latClick: '',
            lngClick: '',
            addingActive: false,
            draggingActive: false,
            show: false,
            showSelectedClass: false,
            selectingDone: false,
            selectingCompleteDone: false,
            doAdd: false,
            alertMessage: 'You first have to select a specific animal!',
            popupImg: 'popupImg',
            selectMap: {name: 'OpenMapSurfer Roads', value: 'map1'},
            maps: [{name: 'OpenMapSurfer Roads', value: 'map1'}, {name: 'Esri WorldStreetMap', value: 'map2'}, {name: 'OpenStreetMap BlackandWhite', value: 'map3'}, {name: 'Esri WorldImagery', value: 'map4'}],
            spinner: {loading: true, color: 'lightgrey', height: '100', width: '100'},
            state: {
                date: new Date(2017, 4,  24),
                format: 'MMMM dd yyyy'
            },
            inputMenu: 'show',
            demo: {
                default: {
                    value: 0,
                    width: 170,
                    height: 6,
                    direction: 'horizontal',
                    dotSize: 15,
                    eventType: 'auto',
                    min: 0,
                    max: 100,
                    interval: 1,
                    disabled: false,
                    show: true,
                    realTime: false,
                    tooltip: 'hover',
                    clickable: true,
                    tooltipDir: 'top',
                    tooltipStyle: {
                        "backgroundColor": "#666",
                        "borderColor": "#666"
                    },
                    piecewise: false,
                    lazy: false,
                    reverse: false,
                    speed: 0.5,

                    formatter: null,
                    bgStyle: null,
                    sliderStyle:{
                        "backgroundColor": "#f3f0f2"
                    },
                    processStyle: {
                        "backgroundColor": "#424041"
                    },
                    piecewiseStyle: null,
                    data: []
                }
            },
            newAnimal: {
                animalclass: '', species: '', family: '', additionalInfo: '', timestamp: '', lat: '', lng: ''
            },
            listAnimal: {
                animalclass: '', species: '', family: '', additionalInfo: '', timestamp: '', lat: '', lng: ''
            },

            animalInfo: '',
            addState: 'beforeadd',

            sliderHelp: '(drag the slider to move animal on map dependent on time!)',

            logChecker: 'false',

        }
      },
        created: function () {

            this.changeLog('false');
        },

        watch: {
            selectAnimal:function (val, oldVal) {
                    this.getAnimalName(this.selectAnimal.urlStudyId)
                    this.show = true
                    this.selectingDone = false;
                    this.setSelectingCompleteDone(false);
                    this.animalInfo = this.selectAnimal.text
                    console.log(this.animalInfo)
                    this.sliderHelp = '(drag the slider to move animal on map dependent on time!)'
            },
            selectAnimalClass: function(val){
                this.showSelectedClass = true
                this.doAdd = true
                this.addState = 'add'
                this.newAnimal.animalclass = this.selectAnimalClass.class
            },
            animalnames:function(val){
                    this.selectSpecificAnimal = val
            },
            pos: function (val){
                this.zoom = 5;
            },
            'demo.default.value': function(val){

                var searchTerm = val, index = -1;
                for(var i = 0, len = timeArray.length; i < len; i++) {
                    if (timeArray[i].time === searchTerm) {
                        index = i;
                        break;
                    }
                    if(i != 0){
                        this.sliderHelp = ''
                    }
                }

                if (index != -1) {
                    this.changeMarkerPos(index)
                }

            },
            newAnimal: function (){
                //console.log(this.newAnimal)

                //this.newAnimal.timestamp = this.newAnimal.timestamp.split("")
            },
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
                //console.log(data.position.lat + '...' + this.lat)
            },
            onDrag(data){
                console.log('data'+data.latlng.lat)
                console.log('marker' +this.markersOld[this.markersOld.length-1].positionM.lat)
                this.markersOld[this.markersOld.length-1].positionM.lat = data.latlng.lat
                //this.markersOld.positionM.lng = data.latlng.lng

            },
            onClick (data) {

                console.log('CLICK')
                console.log(data.latlng)
                this.latClick = data.latlng.lat
                this.lngClick = data.latlng.lng
                console.log(this.lngClick + '..x..' + this.latClick)
                if (this.addingActive) {
                    this.addMarker(this.selectAnimalClass.iconSelected)
                    console.log('adding IS active :)')
                    this.activateAdding(false)
                    this.addState = 'save'
                    console.log(this.addState)
                }
                else {
                    console.log('adding not active :)')
                }
            },
            activateAdding(state){
                this.addingActive = state;




            },
            activateDragging(state){
                this.draggingActive = state

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
                    positionM: {lat: this.latClick, lng: this.lngClick}, icon: this.selectAnimalClass.iconSelected, draggable: drag, animalclass: this.newAnimal.animalclass, species: this.newAnimal.species, family: this.newAnimal.family, additionalInfo: this.newAnimal.additionalInfo, date: this.newAnimal.timestamp
                }))
                //this.$set(this.markersOld[counter], 'icon', iconWhi);
                this.$set(this.markersOld[counter], 'draggable', dragtrue)
                counterArr.push(counter)
                this.doAdd = false
                this.activateDragging(true)


                //console.log(this.newAnimal.timestamp)


            },
            removeMarkerMy (index) {
                this.polyMarkerPos.splice(index, 1)
            },
            setSelectingDone (done){
                if (this.selectSpecificAnimal != undefined) {
                    this.selectingDone = done;
                }
            },
            setSelectingCompleteDone(done){
                if (this.selectSpecificAnimal != undefined) {
                    this.selectingCompleteDone = done;
                }
            },
            doAlert(alertMessage){
                alert('Error: ' + alertMessage)
            },
            getData(si, ai, st){ //get Movebank Data from single animal

                requestUrl = 'https://www.movebank.org/movebank/service/json-auth?study_id=' + si +'&individual_local_identifiers[]=' + ai + '&sensor_type=' + st + '';
                //console.log('url: ' + requestUrl);
                this.polyPos = [];
                this.polyMarkerPos = [];
                this.demo.default.data = [];
                var self = this;

                $.when(main.doRequest(requestUrl)).done(function(data){
                    //console.log(data); //all requested data of the animal in array
                    popupName = data.individuals[0].individual_local_identifier;
                    popupTaxName = data.individuals[0].individual_taxon_canonical_name;
                    popupInfo = {name: popupName, taxName: popupTaxName };

                    //Clear vars, to only show 1 animal at the same time.
                    polyArray = [];
                    timeArray = [];
                    self.removeMarkerMy(1);

                    // loop through data array, write all coordinates into polyArray var.
                    var i, x, y, j, t;
                    for (i in data.individuals[0].locations){
                        x = data.individuals[0].locations[i].location_lat;
                        y = data.individuals[0].locations[i].location_long;
                        t = data.individuals[0].locations[i].timestamp;

                        t = self.convertTimestamp(t);

                        coords = {lat: x, lng: y };
                        times = {time: t};

                        polyArray.push(coords);
                        timeArray.push(times);
                    };

                    // moving to path
                    self.lat = null; self.lng = null;
                    self.lat = polyArray[polyArray.length-1].lat;
                    self.lng = polyArray[polyArray.length-1].lng;

                    //make polyline here
                    for (j = 0; j < polyArray.length; j++){
                        self.polyPos.push(({
                            lat: polyArray[j].lat,
                            lng: polyArray[j].lng,
                            time: timeArray[j].time
                        }))
                        //TimeSlider Data Values
                        self.demo.default.data.push(self.polyPos[j].time)
                    };
                    //console.log(self.polyPos); //check if there is output

                    //Add Marker to end of Polyline (with Popup)
                    self.polyMarkerPos.push(({
                        positionM: polyArray[0], icon: self.selectAnimal.iconSelected,
                        visible: true,
                        popupName: self.selectAnimal.text,
                        popupTitle: popupInfo.name,
                        popupText: self.selectAnimal.genus,
                        time: timeArray[0]
                    }))

                    //TimeSlider start value
                    self.demo.default.value = self.polyPos[0].time;

                    self.setSelectingCompleteDone(true)
                    self.setInputMenu('show')

                    finished = true;

                })

            },
            getAnimalName(studyId){
                requestUrl = 'https://www.movebank.org/movebank/service/json-auth?&entity_type=individual&study_id='+ studyId +'';

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
            },
            setInputMenu(val){
                this.inputMenu = val
                this.animalInfo = val
                //console.log(val)
                if (val != 'show') {
                    //this.selectingDone = false
                    //this.selectAnimal = ''
                }
                else{
                    this.animalInfo = this.selectAnimal.text
                }
            },
            convertTimestamp (unix_timestamp){

                var a = new Date(unix_timestamp);
                var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                var year = a.getFullYear();
                var month = months[a.getMonth()];
                var date = a.getDate();
                var hour = a.getHours();
                var min = a.getMinutes();
                var sec = a.getSeconds();
                var time = date + ' ' + month + '. ' + year + ', ' + hour + ':' + min ;

                return time;
            },
            changeMarkerPos (val){

                this.polyMarkerPos.splice(0, this.polyMarkerPos.length)

                this.polyMarkerPos.push(({
                    positionM: polyArray[val], icon: this.selectAnimal.iconSelected,
                    visible: true,
                    popupName: this.selectAnimal.text,
                    popupTitle: popupInfo.name,
                    popupText: this.selectAnimal.genus,
                    time: timeArray[val]
                }))
            },
            hideAnimal (val){
                this.polyPos = []
                this.polyMarkerPos = []
                this.selectingCompleteDone = false
            },
            changeMap(param) {
                this.selectMap.value = param;
                console.log(param);
            },

            outputAnimalNew(){
                console.log(this.newAnimal)

                if(this.newAnimal.timestamp != '') {
                    var timeString = this.newAnimal.timestamp.toDateString()
                    console.log('lala ' + timeString)
                    this.newAnimal.timestamp = timeString
                }
            },
            saveAnimal(){
                this.activateDragging(false)
                //this.activateAdding(false)
                this.addState = 'add'
                console.log('SAVEIT')

                this.newAnimal.lat = this.markersOld[this.markersOld.length-1].positionM.lat
                this.newAnimal.lng = this.markersOld[this.markersOld.length-1].positionM.lng


                //var test = this.$refs;
                //test.refNavi.addAnimal();

                this.$refs.refNavi.addAnimal();
                //this.$children[4].addAnimal();



            },
            changeLog(param){

                this.logChecker = param;
                console.log("IS LOGGED IN: "+ param );
                if (param === 'true') {
                    this.$refs.refNavi.querydb();
                    console.log('LISTE:')
                    console.log(this.listAnimal)
                }
                //console.log("this.$refs.refNavi.querydb()" + this.$refs.refNavi.querydb())

            },

            viewAnimalList: function(param){
                console.log('PARENT view animal list method...')
                console.log(param)


                this.logChecker=param;
                console.log(this.logChecker + " Change Log function")

                if(param)
                {
                    //this.$refs.refNavi.querydb();
                }
                else
                {

                }



            }

        }
    };



</script>
