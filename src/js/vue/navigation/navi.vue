<template lang="html" xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">

    <div id="navi">
        <!-- Main Navigation Menu -->
        <nav v-bind:class="active" v-on:click.prevent class="navMenu">
            <a href="#" class="settings" v-on:click="makeActive('settings')" @click="showSettings = true">Settings</a><span class="sepWhi">|</span>
            <a href="#" class="contact" v-on:click="makeActive('contact'), makeModalActive('con')" @click="showContact = true">Contact</a><span class="sepWhi">|</span>
            <a href="#" v-show="loggedin === 'true'" class="login" v-on:click="makeActive(''), signOut()" >logout</a>
            <a href="#" v-show="loggedin === 'false'" class="login" v-on:click="makeActive('login'), makeModalActive('log')" @click="showModal = true">login</a>
        </nav>

        <!-- Modal Template -->
        <script type="text/x-template" id="modal-template">
            <transition name="modal">
                <div class="modal-mask" @click="$emit('close')" >
                    <div class="modal-wrapper">
                        <div class="modal-container" @click.stop >

                            <div class="modal-header">
                                <slot name="header">
                                </slot>
                            </div>

                            <div class="modal-body">
                                <slot name="body">
                                </slot>
                            </div>

                            <div class="modal-footer">
                                <slot name="footer">
                                </slot>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </script>

        <!-- Main Navigation Menu -->

        <modal v-if="showModal" @close="showModal = false, mailSent = false">
            <!-- Modal Menu -->
            <div slot = header>
                <nav v-bind:class="activeMod" v-on:click.prevent>
                    <a href="#" class="logMod" v-on:click="makeModalActive('log')">Login</a>
                    <a href="#" class="newMod" v-on:click="makeModalActive('new')">New Account</a>
                </nav>
            </div>

            <!-- LOGIN and SIGN-IN Modal Component-->
            <div slot = body>
                <!-- Login Tab -->
                <div  v-if="retActive()==='log'">
                    <div class="modhalfleft">
                        <img class="modImg" src="../../../img/footsteps.png">
                    </div>
                    <div class="modhalfright">
                        <form id="form2" v-on:submit.prevent="login()">
                             <div class="form-group">
                                <label>Email <span class="errorInfo" > {{outputEmailLogin}}</span></label>
                                <input v-bind:class="{ errorLine: isWrong }" type="email" v-model="loguser.lemail" placeholder="">
                                 <label>Password</label>
                                <input v-bind:class="{ errorLine: isWrong }" type="password" v-model="loguser.password" placeholder="">
                                <input type="submit" class="loginButton" value="LOGIN" >
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Sign In Tab -->
                <div v-else-if="retActive()==='new'">
                    <div class="modhalfleft">
                        <img class="modImgRight" src="../../../img/footsteps_right.png">
                    </div>
                    <div class="modhalfright" v-if="mailSent == false">
                        <form slot = body id="form" v-on:submit.prevent="authentication">
                            <div class="form-group">
                                <label>Email <span class="errorInfo" > {{outputEmail}}</span></label>
                                <input type="email" v-model="createuser.lemail" placeholder="">
                                <label>Password <span class="errorInfo" > {{outputPassword}} </span></label>
                                <input v-bind:class="{ errorLine: signPWisWrong }" type="password" v-model="createuser.password" placeholder="">
                                <input type="submit" class="createButton" value="CREATE USER">
                            </div>
                        </form>
                    </div>
                    <div class="modhalfright" v-if="mailSent">
                        <form slot = body id="form7" v-on:submit.prevent="mailSent = false">
                            <span class="mailInfo" > {{outputCreated}}</span><br><br>
                            <input type="submit" class="createButton" value="BACK">
                        </form>
                    </div>
                </div>
            </div>
        </modal>

        <!-- CONTACT MODAL-->
        <modal v-if="showContact" @close="showContact = false">
            <div slot = header>
                <nav v-bind:class="activeMod" v-on:click.prevent>
                    <a href="#" class="logMod" v-on:click="makeModalActive('con')">Contact</a>
                    <a href="#" class="newMod" v-on:click="makeModalActive('imp')">Impressum</a>
                </nav>
            </div>
            <div slot = body>
                <!-- Contact Tab -->
                <div  v-if="retActive()==='con'">
                    <div class="modhalfleft">
                        <img class="modImg" src="../../../img/footsteps.png">
                    </div>
                    <div class="modhalfmiddle">
                        <form action="mailto:messerer.da@gmail.com" method="post" enctype="text/plain">
                            <div class="form-group">
                                <label>Name</label>
                                <input type="contact" name="name"><br>
                                <label>E-Mail</label>
                                <input type="contact" name="mail"><br>
                                <label>Comment</label>
                                <input type="contact" name="comment" size="30">
                                <input type="submit" class="sendMailButton" value="SEND">
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Impressum Tab -->
                <div  v-if="retActive()==='imp'">
                    <div class="modhalfleft">
                        <img class="modImgRight" src="../../../img/footsteps_right.png">
                    </div>
                    <div class="modhalfright">
                        <form id="form6">
                            <div class="form-group">
                                <p>This website was created by:<br><br><b>Sophie Drummer</b><br>sophie.drummer@web.de
                                <br><br>and<br><br><b>David Messerer</b><br>messerer.da@gmail.com</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </modal>

        <!-- Map Settings MODAL-->
        <modal v-if="showSettings" @close="showSettings = false" @open="">
            <!-- Map Settings Tab -->
            <div slot = header>
                <nav v-bind:class="activeMod">
                    <a class="settMod" >Map Settings</a>
                    <a class="emptyMod"><br></a>
                </nav>
            </div>
            <div slot = body >
                <div class="modhalfleft">
                    <img class="modImg" src="../../../img/footsteps.png">
                </div>
                <div class="modhalfmiddle">
                    <form id="form8" v-on:submit.prevent="changeMap">
                        <div class="form-group">
                            <label>Switch Basemap:</label>
                            <select v-model="selectMap" v-on:onmouseover="selectMap = map" >
                                <option v-for="map in maps" :value="map">{{ map.name }}</option>
                            </select>
                            <input type="submit" class="sendMailButton" value="CHANGE">
                        </div>
                    </form>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>

    // ------------------------------------------------------------------------- Requirements -------------------------------------------------------------------------------
    import Vue from 'vueCommon';
    import vueCookie from 'vue-cookie';
    Vue.use(vueCookie);
    const firebase = require('firebase');

    const emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const config = {
        // Your firebase Information here!!!
        apiKey: "",
        authDomain: "",
        databaseURL: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: ""
    };
    firebase.initializeApp(config);


    // ------------------------------------------------------------------------- Vue Contents -------------------------------------------------------------------------------
    export default {

        name: 'LOGIN',

        component: Vue.component('modal',{
            template: '#modal-template',},
        ),

        props: ['cAnimal'],

        data() {
            return {
                selectMap: {name: 'OpenMapSurfer Roads', value: 'map1'},
                maps: [
                    {name: 'OpenMapSurfer Roads', value: 'map1'},
                    {name: 'Esri WorldStreetMap', value: 'map2'},
                    {name: 'OpenStreetMap BlackandWhite', value: 'map3'},
                    {name: 'Esri WorldImagery', value: 'map4'}],
                active: 'home',
                activeMod: 'log',
                currentRoute: window.location.pathname,
                showModal: false,
                showContact: false,
                showSettings: false,
                logActive: true,
                loggedin: '',
                isWrong: false,
                signPWisWrong: false,
                createuser: {lemail: '',password: ''},
                loguser: {lemail: '',password: ''},
                userID: '',
                outputEmail: '(Please provide a valid email address.)',
                outputEmailLogin: '',
                outputPassword: '(Insert a password with at least 6 characters.)',
                outputCreated: '',
                mailSent: false,
                animalList: '',
                logInVal: 'true',
                checkedFinished: 'false'
            }
        },

        created: function () {
            let checkEmpty = Vue.cookie.get('login');
            if(checkEmpty == null){
                Vue.cookie.set('login', 'false', 1);
            }
            else {
                this.userID = Vue.cookie.get('cUserID');
            }
            this.loggedin = Vue.cookie.get('login');
        },

        mounted: function(){
            this.$emit('login', this.loggedin);
        },

        computed: {
            validation: function () {
                return {
                    password: !!this.createuser.password.trim(),
                    email: emailRE.test(this.createuser.lemail),
                }
            },
            isValid: function () {
                let validation = this.validation;
                return Object.keys(validation).every(function (key) {
                    return validation[key]
                })
            },
        },

        watch: {
            showModal:function (val) {
                if(val === true){
                    this.makeActive('login')
                }
                else {
                    this.makeActive('')
                }
            },

            showSettings: function (val) {
                if(val === true){
                    this.makeActive('settings')
                }
                else{
                    this.makeActive('')
                }
            },
            showContact: function (val) {
                if(val === true){
                    this.makeActive('contact')
                }
                else{
                    this.makeActive('')
                }
            }
        },

        methods: {
            //make Modal active
            makeActive: function (activate) {
                this.active = activate;
            },

            //make Modal Tab active
            makeModalActive: function(item){
                this.activeMod = item;
            },

            retActive: function () {
                return this.activeMod;
            },

            // create new user
            authentication: function () {
                const self = this;
                if (this.isValid){
                    firebase.auth().createUserWithEmailAndPassword(this.createuser.lemail, this.createuser.password).then(function(user) {
                        user.sendEmailVerification();
                        firebase.auth().signOut();
                        self.mailSent = true;
                        self.outputCreated = 'Verification Mail was sent to: ' + self.createuser.lemail + '. Please also check your spam folder!';
                        self.createuser.lemail='';
                        self.createuser.password='';
                        self.signPWisWrong = false;
                        self.outputPassword = '';
                    }).catch(function (error) {
                        console.log(error);
                        if(error.code == 'auth/weak-password') {
                            self.outputPassword = error.message;
                            self.signPWisWrong = true;
                        }
                        else{
                            self.outputEmail = error.message
                        }
                    });
                }
                else {
                    this.outputPassword = '(Invalid Password! Only use letters, numbers and special characters)';
                    this.signPWisWrong = true;
                }
            },

            // Login
            login: function () {
                const self = this;
                if (this.logInVal === 'true'){
                    this.check()
                }
                firebase.auth().signInWithEmailAndPassword(this.loguser.lemail, this.loguser.password).then(function () {
                    self.isWrong = false;
                    self.outputEmailLogin = '';
                }).catch(function () {
                    self.isWrong = true;
                    self.logInVal = 'true';
                });
            },

            // observe user state
            check: function () {
                // Check function for Login and writing user.uid
                const self = this;
                if(this.checkedFinished === 'false'){
                firebase.auth().onAuthStateChanged(function (user) {
                    if(user) {
                        if (user.emailVerified) {
                            Vue.cookie.set('cUserID', user.uid, 1);
                            self.userID = user.uid;
                            self.showModal = false;
                            self.loguser.lemail="";
                            self.loguser.password="";
                            self.loggedin = 'true';
                            self.logInVal = 'false';
                            self.makeActive('');
                            Vue.cookie.set('login', 'true', 1);
                            self.$emit('login', 'true')
                        }
                        else {
                            self.outputEmailLogin = '(Please validate your e-mail adress!)';
                            self.checkedFinished = 'true';
                            self.isWrong = true;
                        }
                    }
                    else{
                        self.checkedFinished = 'true';
                    }
                });
                }
            },

            signOut: function () {
                const self = this;
                firebase.auth().signOut().then(function() {
                    self.loggedin = 'false';
                    self.makeActive('');
                    self.$emit('login', 'false')
                    Vue.cookie.set('login', 'false', 1);
                    Vue.cookie.delete('cUserID')
                }).catch(function(error) {
                    console.log(error)
                });
            },

            addAnimal: function () {
                firebase.database().ref('userID' + this.userID).push(this.cAnimal);
            },

            //Firebase query
            querydb: function () {
                const self = this;
                let query = firebase.database().ref('userID' + this.userID).orderByKey();
                query.once("value")
                    .then(function(snapshot) {
                        snapshot.forEach(function(childSnapshot) {
                            // childData will be the actual contents of the child
                            let childData = childSnapshot.val();
                            self.$emit('pushData', childData);
                        });
                    });
            },

            // Change tile layer map
            changeMap: function() {
                this.$emit('update', this.selectMap.value);
            }
        },
    }
</script>
