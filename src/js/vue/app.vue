<template lang="html" xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="vue">
        <!-- The Leaflet Map, Markers, etc. -->
        <vmap  :position="position" :zoom="zoom" @zoom="onZoom" @click="onClick" >
            <vmap-tile-layer v-if="selectMap.value === 'map1'" url="http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}" attribution="Imagery from <a href='http://giscience.uni-hd.de/'>GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy;"></vmap-tile-layer>
            <vmap-tile-layer v-if="selectMap.value === 'map2'" url="http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}" attribution="Tiles &copy; Esri"></vmap-tile-layer>
            <vmap-tile-layer v-if="selectMap.value === 'map3'" url="http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png" attribution="&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"></vmap-tile-layer>
            <vmap-tile-layer v-if="selectMap.value === 'map4'" url="http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" attribution="Tiles &copy; Esri"></vmap-tile-layer>

            <!--Firebase Markers-->
            <vmap-marker @drag="onDrag" v-for="markerPosition in markers" v-bind:key="markerPosition.id" :latlng="markerPosition.positionM" :visible="markerPosition.visible" :icon="markerPosition.icon" :draggable="markerPosition.draggable" :popupcontent="' <p> Class: ' + markerPosition.animalclass + '<br /> Species: ' + markerPosition.species + '<br /> Family: ' + markerPosition.family + '<br /> Additional Info: ' + markerPosition.additionalInfo + '<br /> Date: ' + markerPosition.date + '.</p>'"></vmap-marker>

            <!--Movebanke-Data: Show-Animal - Marker & Path-->
            <vmap-marker v-for="markerPolyPosition in polyMarkerPos" v-if="markerPolyPosition.popupTitle!=''" v-bind:key="markerPolyPosition" :latlng="markerPolyPosition.positionM" :visible="markerPolyPosition.visible" :icon="markerPolyPosition.icon" :draggable="markerPolyPosition.draggable" :popupcontent="'<img id=' + popupImg +' src=' + selectAnimal.iconPop +' ><p> Species: ' + markerPolyPosition.popupName + '<br /> Specific animal: ' + markerPolyPosition.popupTitle + '<br /> Genus: ' + markerPolyPosition.popupText + '.</p>'"></vmap-marker>
            <vmap-polyline :latlngs="polyPos"></vmap-polyline>
        </vmap>

        <div class="input">
            <!-- INPUT MENU -->
            <nav v-bind:class="inputMenu" v-on:click.prevent class="selectMenu">
                <a href="#" class="show" v-on:click="setInputMenu('show')">SHOW ANIMAL</a><span class="sep">   |   </span>
                <a href="#" v-show="logChecker==='true'" class="addEna" v-on:click="setInputMenu('add')" >Add animal</a> <span v-show="logChecker==='true'" class="sep">   |   </span>
                <a href="#" v-show="logChecker==='true'" class="deleteEna" v-on:click="setInputMenu('delete')">Delete animal</a>
                <a href="#" v-show="logChecker==='false'" class="addDis" v-on:click="setInputMenu('add')" >Add animal</a><span v-show="logChecker==='false'" class="sep">   |   </span>
                <a href="#" v-show="logChecker==='false'" class="deleteDis" v-on:click="setInputMenu('delete')" >Delete animal</a>
            </nav>
            <hr>

            <!-- Menu SHOW -->
            <div v-show="inputMenu === 'show'">
                <div class="selectText">
                    <span class="textNormal">Species:</span>
                    <select v-model="selectAnimal"  >
                        <option class="optionAnimal" v-for="animal in animals" :value="animal">{{ animal.text }}</option>
                    </select>
                </div>

                <div v-show="show">
                    <div class="selectText">
                        <span class="textNormal">Specific Animal:</span>
                        <select v-model="selectSpecificAnimal" v-on:mouseleave="setSelectingDone(true)">
                            <option v-for="animalname in animalnames" v-bind:value="animalname.text">{{ animalname.text }}</option>
                        </select>
                    </div>
                </div>

                <div class="resultDiv" v-show="show">
                    <img id="selectedImg" v-bind:src="selectAnimal.iconPop">
                    <p class="selectingResult">Species: <span>{{ selectAnimal.text }}</span></p>
                    <p class="selectingResult">Genus: <span>{{ selectAnimal.genus }}</span></p>
                    <p class="selectingResult">Animal: <span>{{ selectSpecificAnimal }}</span></p>
                </div>

                <table class="selectButtonDiv" >
                    <tr>
                        <td>
                            <button v-show="selectingDone" class="selectButton" @click="getData(selectAnimal.urlStudyId, selectSpecificAnimal, selectAnimal.urlSensor), setInputMenu('waiting')">SHOW</button></td>
                        <td rowspan="2">
                            <vue-slider v-if="selectingCompleteDone" id="slider" ref="slider" v-bind="slider.default" v-model="slider.default.value"></vue-slider>
                            <div id="sliderInfo"><span v-if="selectingCompleteDone" class="sliderInfoSpan" >{{sliderHelp}}</span></div></td>
                    </tr>
                    <tr>
                        <td>
                            <button v-show="selectingCompleteDone" class="selectButton" @click="hideAnimal()">CLEAR</button></td>
                    </tr>
                </table>
            </div>

            <!-- Menu ADD -->
            <div v-show="inputMenu === 'add'">
                <div v-show="logChecker ==='true'">
                    <form id="form4" v-on:submit.prevent="activateAdding(true), outputAnimalNew()">
                        <div class="form-group">
                            <table class="animalTable">
                                <tr>
                                    <td><label class="animalLabel">Class</label></td>
                                    <td><label class="animalLabel">Date</label></td>
                                </tr>
                                <tr>
                                    <td class="animalTableField">
                                        <select v-model="selectAnimalClass"  >
                                            <option v-for="animal in animalClass" :value="animal">{{ animal.animalclass }}</option>
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
                                        <input v-if="addState === 'beforeadd'" type="submit" value="ADD" class="addButtonDis" disabled="true">
                                        <input v-if="addState === 'add'" type="submit" value="ADD">
                                        <input v-if="addState === 'save'" v-on:click="saveAnimal()" class="submitSave" type="reset" value="SAVE"></td>
                                </tr>
                                <tr>
                                    <td><input type="animal" v-model="newAnimal.additionalInfo" placeholder=""></td>
                                </tr>
                            </table>
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
                </div>
            </div>

            <!-- Menu DELETE -->
            <div v-show="inputMenu === 'delete'">
                <div v-show="logChecker === 'true'">
                    <p> Here are delete things happening</p>
                </div>
                <div v-show="logChecker === 'false'">

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
        <div>
            <Vinfo id="vueInfo" :animal="animalInfo"></Vinfo>
        </div>

        <!-- Navigation -->
        <div>
            <img id="logo" src="../../img/logo.png">
            <Vnavi ref="refNavi" id="vueNavi" @update="changeMap" @login="changeLog" @pushData="fetchData" v-bind:cAnimal="newAnimal"></Vnavi>
        </div>
    </div>
</template>

<script>

    import Map from './Map.vue';
    import Info from './AnimalInfo.vue';
    import Navi from './navigation/navi.vue';
    import * as components from './components';
    import * as $ from "jquery";
    import Vue from 'vueCommon';
    import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
    import vueSlider from 'vue-slider-component';
    import Datepicker from 'vuejs-datepicker';
    import L from 'leaflet';
    import vueCookie from 'vue-cookie';

    Vue.use(vueCookie);
    const main = require('../../js/data.js');

    const imgWheSrc =  '../../img/icon_wheatear.png';
    const imgWhiSrc =  '../../img/icon_whitestork.png';
    const imgBlaSrc =  '../../img/icon_blackstork.png';
    const imgFalSrc =  '../../img/icon_false_killer_whale.png';
    const imgAgoSrc =  '../../img/icon_agouti.png';
    const imgAfrSrc =  '../../img/icon_african_elephant.png';
    const imgLioSrc =  '../../img/icon_lion.png';
    const imgOceSrc =  '../../img/icon_ocelot.png';
    const imgSkiSrc =  '../../img/icon_black_skimmer.png';

    const imgMamSrc =  '../../img/icon_mammal.png';
    const imgBirSrc =  '../../img/icon_bird.png';
    const imgFisSrc =  '../../img/icon_fish.png';
    const imgRepSrc =  '../../img/icon_reptile.png';
    const imgInsSrc =  '../../img/icon_insect.png';
    const imgAmpSrc =  '../../img/icon_amphib.png';

    const imgWhePop = '../../img/wheatear.png';
    const imgWhiPop = '../../img/whitestork.png';
    const imgBlaPop = '../../img/blackstork.png';
    const imgFalPop = '../../img/false_killer_whale.png';
    const imgAgoPop = '../../img/agouti.png';
    const imgAfrPop = '../../img/african_elephant.png';
    const imgLioPop = '../../img/lion.png';
    const imgOcePop = '../../img/ocelot.png';
    const imgSkiPop = '../../img/black_skimmer.png';
    const iconShadow = '../../img/marker-shadow.png';

    const iconWhe = L.icon({iconUrl:  imgWheSrc, shadowUrl: iconShadow, iconSize: [40, 56], iconAnchor: [20, 56], shadowSize:[50, 50], shadowAnchor: [14, 50], popupAnchor:  [0, -60]});
    const iconWhi = L.icon({iconUrl:  imgWhiSrc, shadowUrl: iconShadow, iconSize: [40, 56], iconAnchor: [20, 56], shadowSize:[50, 50], shadowAnchor: [14, 50], popupAnchor:  [0, -60]});
    const iconBla = L.icon({iconUrl:  imgBlaSrc, shadowUrl: iconShadow, iconSize: [40, 56], iconAnchor: [20, 56], shadowSize:[50, 50], shadowAnchor: [14, 50], popupAnchor:  [0, -60]});
    const iconFal = L.icon({iconUrl:  imgFalSrc, shadowUrl: iconShadow, iconSize: [40, 56], iconAnchor: [20, 56], shadowSize:[50, 50], shadowAnchor: [14, 50], popupAnchor:  [0, -60]});
    const iconAgo = L.icon({iconUrl:  imgAgoSrc, shadowUrl: iconShadow, iconSize: [40, 56], iconAnchor: [20, 56], shadowSize:[50, 50], shadowAnchor: [14, 50], popupAnchor:  [0, -60]});
    const iconAfr = L.icon({iconUrl:  imgAfrSrc, shadowUrl: iconShadow, iconSize: [40, 56], iconAnchor: [20, 56], shadowSize:[50, 50], shadowAnchor: [14, 50], popupAnchor:  [0, -60]});
    const iconLio = L.icon({iconUrl:  imgLioSrc, shadowUrl: iconShadow, iconSize: [40, 56], iconAnchor: [20, 56], shadowSize:[50, 50], shadowAnchor: [14, 50], popupAnchor:  [0, -60]});
    const iconOce = L.icon({iconUrl:  imgOceSrc, shadowUrl: iconShadow, iconSize: [40, 56], iconAnchor: [20, 56], shadowSize:[50, 50], shadowAnchor: [14, 50], popupAnchor:  [0, -60]});
    const iconSki = L.icon({iconUrl:  imgSkiSrc, shadowUrl: iconShadow, iconSize: [40, 56], iconAnchor: [20, 56], shadowSize:[50, 50], shadowAnchor: [14, 50], popupAnchor:  [0, -60]});

    const iconMam = L.icon({iconUrl:  imgMamSrc, shadowUrl: iconShadow, iconSize: [40, 56], iconAnchor: [20, 56], shadowSize:[50, 50], shadowAnchor: [14, 50], popupAnchor:  [0, -60]});
    const iconBir = L.icon({iconUrl:  imgBirSrc, shadowUrl: iconShadow, iconSize: [40, 56], iconAnchor: [20, 56], shadowSize:[50, 50], shadowAnchor: [14, 50], popupAnchor:  [0, -60]});
    const iconFis = L.icon({iconUrl:  imgFisSrc, shadowUrl: iconShadow, iconSize: [40, 56], iconAnchor: [20, 56], shadowSize:[50, 50], shadowAnchor: [14, 50], popupAnchor:  [0, -60]});
    const iconRep = L.icon({iconUrl:  imgRepSrc, shadowUrl: iconShadow, iconSize: [40, 56], iconAnchor: [20, 56], shadowSize:[50, 50], shadowAnchor: [14, 50], popupAnchor:  [0, -60]});
    const iconIns = L.icon({iconUrl:  imgInsSrc, shadowUrl: iconShadow, iconSize: [40, 56], iconAnchor: [20, 56], shadowSize:[50, 50], shadowAnchor: [14, 50], popupAnchor:  [0, -60]});
    const iconAmp = L.icon({iconUrl:  imgAmpSrc, shadowUrl: iconShadow, iconSize: [40, 56], iconAnchor: [20, 56], shadowSize:[50, 50], shadowAnchor: [14, 50], popupAnchor:  [0, -60]});

    let coords, popupInfo, popupName, popupTaxName, nameId, nameIdArray, requestUrl, times;
    let finished = false; let drag = false; let dragtrue = true;
    let counterArr = []; let polyArray = []; let timeArray = []; let localAnimalData = [];
    let counter = 1; let counterList = 0;

    export default {
        name: 'app',
        components: {
            Vmap: Map,
            VmapMarker: components.Marker,
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
            lat: 0,
            lng: 0,
            zoom: 2,
            selectAnimal: { text: '', genus: '', iconSelected: '', imgSrc: '', urlStudyId: '', urlPublic: '', urlSensor: '', iconPop: ''},
            selectAnimalClass: { animalclass: '', genus: '', iconSelected: '', imgSrc: ''},
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
                { animalclass: 'Mammal', iconSelected: iconMam, imgSrc: imgMamSrc},
                { animalclass: 'Bird', iconSelected: iconBir, imgSrc: imgBirSrc},
                { animalclass: 'Fish', iconSelected: iconFis, imgSrc: imgFisSrc},
                { animalclass: 'Reptile', iconSelected: iconRep, imgSrc: imgRepSrc},
                { animalclass: 'Insect', iconSelected: iconIns, imgSrc: imgInsSrc},
                { animalclass: 'Amphib', iconSelected: iconAmp, imgSrc: imgAmpSrc}
            ],
            markers: [
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
            popupImg: 'popupImg',
            selectMap: {name: 'OpenMapSurfer Roads', value: 'map1'},
            maps: [{name: 'OpenMapSurfer Roads', value: 'map1'}, {name: 'Esri WorldStreetMap', value: 'map2'}, {name: 'OpenStreetMap BlackandWhite', value: 'map3'}, {name: 'Esri WorldImagery', value: 'map4'}],
            spinner: {loading: true, color: 'lightgrey', height: '100', width: '100'},
            state: {date: new Date(2017, 4,  24), format: 'MMMM dd yyyy'},
            inputMenu: 'show',
            slider: {
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
                    show: true,
                    tooltip: 'hover',
                    clickable: true,
                    tooltipDir: 'top',
                    tooltipStyle: {"backgroundColor": "#666","borderColor": "#666"},
                    speed: 0.5,
                    sliderStyle:{"backgroundColor": "#f3f0f2"},
                    processStyle: {"backgroundColor": "#424041"},
                    data: []
                }
            },
            newAnimal: {animalclass: '', species: '', family: '', additionalInfo: '', timestamp: '', lat: '', lng: ''},
            listAnimal: [],
            animalInfo: '',
            addState: 'beforeadd',
            sliderHelp: '(drag the slider to move animal on map dependent on time!)',
            logChecker: 'false',
            createFinished: 'false'
        }
      },

        mounted: function(){
            if (localStorage.getItem('animal')) {
                this.writeMarkerOnRefresh()
            }
            this.createFinished = 'true'
        },

        watch: {
            selectAnimal:function () {
                    this.getAnimalName(this.selectAnimal.urlStudyId);
                    this.show = true;
                    this.selectingDone = false;
                    this.setSelectingCompleteDone(false);
                    this.animalInfo = this.selectAnimal.text;
                    this.sliderHelp = '(drag the slider to move animal on map dependent on time!)'
            },

            selectAnimalClass: function(){
                this.showSelectedClass = true;
                this.doAdd = true;
                this.addState = 'add';
                this.newAnimal.animalclass = this.selectAnimalClass.animalclass
            },

            animalnames:function(val){
                    this.selectSpecificAnimal = val
            },

            pos: function (){
                this.zoom = 5;
            },

            'slider.default.value': function(val){

                let index = -1;
                for(let i = 0, len = timeArray.length; i < len; i++) {
                    if (timeArray[i].time === val) {
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

            onZoom: function (data) {
                this.zoom = data.zoom
            },

            onDrag: function(data){
                this.markers[this.markers.length-1].positionM.lat = data.latlng.lat;
                this.markers[this.markers.length-1].positionM.lng = data.latlng.lng;
            },

            onClick: function (data) {
                this.latClick = data.latlng.lat;
                this.lngClick = data.latlng.lng;
                if (this.addingActive) {
                    this.addMarker(this.selectAnimalClass.iconSelected);
                    this.activateAdding(false);
                    this.addState = 'save'
                }
            },

            activateAdding: function(state){
                this.addingActive = state;
            },

            activateDragging: function(state){
                this.draggingActive = state;
                if (state){
                    this.$set(this.markers[this.markers.length-1], 'draggable', state);
                }
                else{
                    this.$set(this.markers[this.markers.length-1], 'draggable', state);
                }
            },

            addMarker: function (){
                counter = counter+1;
                this.markers.push(({
                    positionM: {lat: this.latClick, lng: this.lngClick}, icon: this.selectAnimalClass.iconSelected, draggable: drag, animalclass: this.newAnimal.animalclass, species: this.newAnimal.species, family: this.newAnimal.family, additionalInfo: this.newAnimal.additionalInfo, date: this.newAnimal.timestamp
                }));
                this.$set(this.markers[counter], 'draggable', dragtrue);
                counterArr.push(counter);
                this.doAdd = false;
                this.activateDragging(true);
            },

            removeMarkerMy: function (index) {
                this.polyMarkerPos.splice(index, 1)
            },

            setSelectingDone: function(done){
                if (this.selectSpecificAnimal != undefined) {
                    this.selectingDone = done;
                }
            },

            setSelectingCompleteDone: function(done){
                if (this.selectSpecificAnimal != undefined) {
                    this.selectingCompleteDone = done;
                }
            },

            //Movebank Data Request with Study ID, Animal ID and Sensor Type
            getData: function(si, ai, st){
                requestUrl = 'https://www.movebank.org/movebank/service/json-auth?study_id=' + si +'&individual_local_identifiers[]=' + ai + '&sensor_type=' + st + '';
                this.polyPos = [];
                this.polyMarkerPos = [];
                this.slider.default.data = [];
                const self = this;
                $.when(main.doRequest(requestUrl)).done(function(data){
                    popupName = data.individuals[0].individual_local_identifier;
                    popupTaxName = data.individuals[0].individual_taxon_canonical_name;
                    popupInfo = {name: popupName, taxName: popupTaxName };

                    //Clear vars, to only show 1 animal at the same time.
                    polyArray = [];
                    timeArray = [];
                    self.removeMarkerMy(1);

                    // loop through data array, write all coordinates into polyArray.
                    let i, x, y, j, t;
                    for (i in data.individuals[0].locations){
                        x = data.individuals[0].locations[i].location_lat;
                        y = data.individuals[0].locations[i].location_long;
                        t = data.individuals[0].locations[i].timestamp;
                        t = self.convertTimestamp(t);
                        coords = {lat: x, lng: y };
                        times = {time: t};
                        polyArray.push(coords);
                        timeArray.push(times);
                    }

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
                        }));
                        //TimeSlider Data Values
                        self.slider.default.data.push(self.polyPos[j].time)
                    }

                    //Add Marker to end of Polyline (with Popup)
                    self.polyMarkerPos.push(({
                        positionM: polyArray[0], icon: self.selectAnimal.iconSelected,
                        visible: true,
                        popupName: self.selectAnimal.text,
                        popupTitle: popupInfo.name,
                        popupText: self.selectAnimal.genus,
                        time: timeArray[0]
                    }));
                    self.slider.default.value = self.polyPos[0].time;
                    self.setSelectingCompleteDone(true);
                    self.setInputMenu('show');
                    finished = true;
                })
            },

            // Movebank Request to list all individual Animals for each animalclass
            getAnimalName: function(studyId){
                requestUrl = 'https://www.movebank.org/movebank/service/json-auth?&entity_type=individual&study_id='+ studyId +'';
                const self = this;
                $.when(main.doRequest(requestUrl)).done(function(data) {
                    let id, name;
                    let idArray = [];
                    let nameArray = [];
                    nameIdArray = [];
                    self.animalnames = [];
                    for (let element of data) {
                        id = element.id;
                        name = element.local_identifier;
                        if (name.includes('cal') == false) {
                            idArray.push(id);
                            nameArray.push(name);
                            nameId = {local_identifier: name, idValue: id};
                            nameIdArray.push(nameId);
                        }
                    }
                    for (let element of nameIdArray){
                        self.animalnames.push(({
                            text: element.local_identifier,
                            genus: element.idValue
                        }))
                    }
                })
            },

            //show content dependent on selected menu or animal
            setInputMenu: function(val){
                this.inputMenu = val;
                this.animalInfo = val;
                if (val === 'show') {
                    this.animalInfo = this.selectAnimal.text
                }
                if (this.logChecker === 'false' && val != 'show'){
                    this.animalInfo = 'notInlogged'
                }
            },

            // convert the timestamp
            convertTimestamp: function(unix_timestamp){
                const a = new Date(unix_timestamp);
                const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                let year = a.getFullYear();
                let month = months[a.getMonth()];
                let date = a.getDate();
                let hour = a.getHours();
                let min = a.getMinutes();
                let time = date + ' ' + month + '. ' + year + ', ' + hour + ':' + min ;
                return time;
            },

            changeMarkerPos: function(val){
                this.polyMarkerPos.splice(0, this.polyMarkerPos.length);
                this.polyMarkerPos.push(({
                    positionM: polyArray[val], icon: this.selectAnimal.iconSelected,
                    visible: true,
                    popupName: this.selectAnimal.text,
                    popupTitle: popupInfo.name,
                    popupText: this.selectAnimal.genus,
                    time: timeArray[val]
                }))
            },

            hideAnimal: function(){
                this.polyPos = [];
                this.polyMarkerPos = [];
                this.selectingCompleteDone = false
            },

            //called on emit
            changeMap: function(param) {
                this.selectMap.value = param;
            },

            outputAnimalNew: function(){
                if(this.newAnimal.timestamp != '') {
                    let timeString = this.newAnimal.timestamp.toDateString();
                    this.newAnimal.timestamp = timeString
                }
            },

            // Save new added animal to database
            saveAnimal: function(){
                this.activateDragging(false);
                this.addState = 'add';
                this.newAnimal.lat = this.markers[this.markers.length-1].positionM.lat;
                this.newAnimal.lng = this.markers[this.markers.length-1].positionM.lng;
                this.$refs.refNavi.addAnimal();
            },

            // changes values dependent on login state
            changeLog: function(param){
                this.logChecker = param;
                if (param === 'true' && this.createFinished === 'true') {
                    this.$refs.refNavi.querydb();
                }
                else if (param === 'false' && this.createFinished === 'true'){
                    this.removeMarkerDB();
                    counterList = 0
                }
            },

            // display marker (from firebase) on map
            fetchData: function(AnimalData){
                localAnimalData.push(AnimalData);
                localStorage.setItem('animal', JSON.stringify(localAnimalData));
                this.listAnimal.push(({
                    animalclass: AnimalData.animalclass,
                    species: AnimalData.species,
                    family: AnimalData.family,
                    additionalInfo: AnimalData.additionalInfo,
                    timestamp: AnimalData.timestamp,
                    lat: AnimalData.lat,
                    lng: AnimalData.lng
                }));
                let compIcon = this.checkClassIcon(AnimalData.animalclass);
                counterList = counterList + 1;
               this.markers.push(({
                    positionM: {lat: AnimalData.lat, lng: AnimalData.lng},
                    icon: compIcon,
                    draggable: false,
                    animalclass: AnimalData.animalclass,
                    species: AnimalData.species,
                    family: AnimalData.family,
                    additionalInfo: AnimalData.additionalInfo,
                    date: AnimalData.timestamp
                }));
            },

            //removes marker on reload
            removeMarkerDB: function(){
                    localStorage.removeItem('animal');
                    let nmb = counterList + (this.markers.length - (2 + counterList));
                    this.markers.splice(2, nmb)
                },

            //show markers on refresh
            writeMarkerOnRefresh: function(){
                this.$refs.refNavi.querydb();
                let animalObjStorage = localStorage.getItem('animal');
                let animalObj = JSON.parse(animalObjStorage);
                for(let element of animalObj){
                    let compIcon = this.checkClassIcon(element.animalclass);
                    this.markers.push(({
                        positionM: {lat: element.lat, lng: element.lng},
                        icon: compIcon,
                        draggable: false,
                        animalclass: element.animalclass,
                        species: element.species,
                        family: element.family,
                        additionalInfo: element.additionalInfo,
                        date: element.timestamp
                    }))
                }
                this.removeDuplicate()
            },

            //removes marker on reload
            removeDuplicate: function(){
                localStorage.removeItem('animal');
                this.markers.splice(2, this.markers.length)
            },

            //load icon dependent on animalclass
            checkClassIcon: function(anClass){
                let compIcon;
                counterList = counterList + 1;
                if(anClass === 'Bird'){compIcon = iconBir}
                else if(anClass === 'Mammal'){ compIcon = iconMam}
                else if(anClass === 'Fish'){ compIcon = iconFis}
                else if(anClass === 'Reptile'){ compIcon = iconRep}
                else if(anClass === 'Amphib'){ compIcon = iconAmp}
                else if(anClass === 'Insect'){ compIcon = iconIns}
                return compIcon;
            }
        }
    };



</script>
