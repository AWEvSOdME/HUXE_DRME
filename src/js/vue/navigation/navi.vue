<template>


    <div id="navi">

        <nav v-bind:class="active" v-on:click.prevent class="navMenu">

            <a href="#" class="settings" v-on:click="makeActive('settings')" @click="showSettings = true">Settings</a><span class="sepWhi">|</span>
            <a href="#" class="contact" v-on:click="makeActive('contact'), makeModalActive('con')" @click="showContact = true">Contact</a><span class="sepWhi">|</span>


            <a href="#" v-show="loggedin === 'true'" class="login" v-on:click="makeActive(''), signOut()" >logout</a>
            <a href="#" v-show="loggedin === 'false'" class="login" v-on:click="makeActive('login'), makeModalActive('log')" @click="showModal = true">login</a>




        </nav>


        <!--div>
            <form id="addAnimal" v-on:submit.prevent="addAnimal">
                <select name="species" v-model="newAnimal.species">
                    <option value="mamal">mamal</option>
                    <option value="bird">bird</option>
                    <option value="fish">fish</option>
                    <option value="amphib">amphib</option>
                </select-->

                <!--input type="text" v-model="newAnimal.species" placeholder="Spec"-->
                <!--input type="text" v-model="newAnimal.animal" placeholder="Kind of Animal">
                <input type="text" v-model="newAnimal.name" placeholder="Name">
                <input type="text" v-model="newAnimal.lat" placeholder="latitude">
                <input type="text" v-model="newAnimal.lon" placeholder="longitude">
                <input type="submit" value="Add TO DATABASE">
            </form>

            <button v-on:click="querydb()">QueryDB</button>

        </div-->


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
                                    <!--button class="modal-default-button" @click="$emit('close')">
                                        OK
                                    </button-->
                                </slot>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </script>

        <div>
            <modal v-if="showModal" @close="showModal = false, mailSent = false">
                <div slot = header>
                    <nav v-bind:class="activeMod" v-on:click.prevent>
                        <a href="#" class="logMod" v-on:click="makeModalActive('log')">Login</a>
                        <a href="#" class="newMod" v-on:click="makeModalActive('new')">New Account</a>
                    </nav>

                </div>
                <div slot = body>
                    <!-- LOGIN -->
                <div  v-if="retActive()==='log'">
                    <div class="modhalfleft">
                        <img class="modImg" src="../../../img/footsteps.png">
                    </div>
                    <div class="modhalfright">
                        <form id="form2" v-on:submit.prevent="login()">
                             <div class="form-group">
                                <label>Email</label>
                                <input v-bind:class="{ errorLine: isWrong }" type="email" v-model="loguser.lemail" placeholder="">
                                 <label>Password</label>
                                <input v-bind:class="{ errorLine: isWrong }" type="password" v-model="loguser.password" placeholder="">
                                <input type="submit" class="loginButton" value="LOGIN" >
                            </div>
                        </form>
                    </div>
                </div>
                    <!-- SIGN IN -->
                    <div v-else-if="retActive()==='new'">
                        <div class="modhalfleft">
                            <img class="modImgRight" src="../../../img/footsteps_right.png">
                        </div>
                        <div class="modhalfright" v-if="mailSent == false">
                        <form slot = body id="form" v-on:submit.prevent="authentication">
                            <div class="form-group">
                                <label>Email <span class="errorInfo" > {{outputEmail}}</span></label>
                                <input type="email" v-model="createuser.lemail" placeholder="">
                                <label>Password <span class="errorInfo" v-show="!validation.password"> {{outputPassword}} </span></label>
                                <input type="password" v-model="createuser.password" placeholder="">
                                <input type="submit" class="createButton" value="CREATE USER">
                            </div>
                        </form></div>
                        <div class="modhalfright" v-if="mailSent">
                            <form slot = body id="form7" v-on:submit.prevent="mailSent = false">
                                <span class="mailInfo" > {{outputCreated}}</span><br><br>
                                <input type="submit" class="createButton" value="BACK"></form>
                        </div>
                    </div>
                </div>


            </modal>

            <!-- CONTACT MODAL-->
            <div>
             <modal v-if="showContact" @close="showContact = false">
                <div slot = header>
                    <nav v-bind:class="activeMod" v-on:click.prevent>
                        <a href="#" class="logMod" v-on:click="makeModalActive('con')">Contact</a>
                        <a href="#" class="newMod" v-on:click="makeModalActive('imp')">Impressum</a>
                    </nav>

                </div>
                <div slot = body>

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

                            </div></form></div>
                    </div>
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
            </div>


            <div>
                <modal v-if="showSettings" @close="showSettings = false" @open="">
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


        </div>


    </div>



</template>


<script>

    import Vue from 'vueCommon';
    import vueCookie from 'vue-cookie';
    Vue.use(vueCookie);


    var firebase = require('firebase');


    var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    var config = {
        apiKey: "AIzaSyBwYBLW7TCGJH0HjFWAgAMw_iQe5YQQO98",
        authDomain: "mapapp-9d5a2.firebaseapp.com",
        databaseURL: "https://mapapp-9d5a2.firebaseio.com",
        projectId: "mapapp-9d5a2",
        storageBucket: "mapapp-9d5a2.appspot.com",
        messagingSenderId: "981242849200"
    }
    firebase.initializeApp(config);



    export default {

        name: 'LOGIN',
        component: Vue.component('modal', {
            template: '#modal-template',   },

        ),

        props: ['cAnimal'],



        data() {
            return {
            selectMap: {name: 'OpenMapSurfer Roads', value: 'map1'},
            maps: [{name: 'OpenMapSurfer Roads', value: 'map1'}, {name: 'Esri WorldStreetMap', value: 'map2'}, {name: 'OpenStreetMap BlackandWhite', value: 'map3'}, {name: 'Esri WorldImagery', value: 'map4'}],
            newAnimal: {

                    animalclass: '',
                    species: '',
                    family: '',
                    additionalInfo: '',
                    timestamp: '',
                    lat: '',
                    lon: ''

            },
            active: 'home',
            activeMod: 'log',
            currentRoute: window.location.pathname,
            showModal: false,
            showContact: false,
            showSettings: false,
            logActive: true,
            loggedin: '',
            isWrong: false,
            loginText: 'Login',
            createuser: {
                lemail: '',
                password: ''
            },
            loguser: {
                lemail: '',
                password: ''
            },
            userID: '',
            counter: 0,
            outputEmail: '(Please provide a valid email address.)',
            outputPassword: '(Insert a password with at least 6 characters.)',
            outputCreated: '',
            mailSent: false,
            animalList: '',
            logInVal: 'true'

        }},



        created: function () {

            var test = Vue.cookie.get('login')

            if(test == null)
            {
                Vue.cookie.set('login', 'false', 1)
            }



            this.loggedin = Vue.cookie.get('login');
            console.log(this.loggedin + "The Logged in Value")

            //this.$emit('login', this.loggedin);


            /* if (checker == true) {
             this.loggedin = true;
             console.log(this.loggedin + "THIS LOGEDIN");

             }
             else {
             this.loggedin = false;
             console.log(this.loggedin + "THIS LOGEDOUT");
             } */
        },
        mounted: function(){
            this.$emit('login', this.loggedin);
        },
        destroyed: function () {
            //this.loggedin = Vue.cookie.get('login')
        },





        computed: {
            validation: function () {
                return {
                    password: !!this.createuser.password.trim(),
                    email: emailRE.test(this.createuser.lemail),

                }
            },
            isValid: function () {
                var validation = this.validation
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
                else{
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
            makeActive: function (beitem) {
                this.active = beitem;
            },
            makeModalActive: function(item){
                this.activeMod = item;
            },

            retActive: function () {
                return this.activeMod;
            },

            authentication: function () {

                var self = this;

                if (this.isValid)
                {
                    firebase.auth().createUserWithEmailAndPassword(this.createuser.lemail, this.createuser.password).then(function(user) {



                        if (user.emailVerified)
                        {
                            console.log("Email is already verified")

                        }
                        else
                        {
                            user.sendEmailVerification();
                            firebase.auth().signOut();
                            console.log("Verification Mail was sent");
                            //self.showModal = false;
                            self.mailSent = true

                            self.outputCreated = 'Verification Mail was sent to: ' + self.createuser.lemail + '. Please also check your spam folder!'
                        }

                        self.createuser.lemail="";
                        self.createuser.password="";



                    }).catch(function (error) {


                        console.log(error);

                        if(error.code == 'auth/weak-password') {
                            self.outputPassword = error.message
                        }
                        else{
                            self.outputEmail = error.message
                        }

                    });
                }
                else{

                }

            },
            login: function () {
                //Check and write UserID
                var self = this;

                if (this.logInVal === 'true'){
                    this.check()
                }


                firebase.auth().signInWithEmailAndPassword(this.loguser.lemail, this.loguser.password).then(function (user) {

                    self.isWrong = false;
                }).catch(function (error) {
                    console.log("NO LOGIN POSSIBLE");
                    var message = 'Invalid e-mail or password!'
                    self.isWrong = true;

                });



            },
            check: function () {

                // Check function for Login and writing user.uid
                var self = this;


                firebase.auth().onAuthStateChanged(function (user) {

                    if(user) {
                        if (user.emailVerified) {



                            self.userID = user.uid;
                            self.showModal = false;


                            self.loguser.lemail="";
                            self.loguser.password="";

                            self.loggedin = 'true';

                            console.log("User is logged in")
                            self.makeActive('');

                            self.loginText = 'Logout'
                            Vue.cookie.set('login', 'true', 1);
                            self.$emit('login', 'true')
                            self.logInVal = 'false'
                        }
                        else {
                            //auth.signOut();
                            console.log("Please Validate Email!")
                        }
                    }
                    else{
                        console.log("User is not logged in")
                    }
                });

            },


            signOut: function () {
                var self = this;

                firebase.auth().signOut().then(function() {
                    console.log("sign out")
                    self.loggedin = 'false';
                    self.loginText = 'Login'
                    self.makeActive('');
                    Vue.cookie.set('login', 'false', 1)
                    self.$emit('login', 'false')
                }).catch(function(error) {
                    // An error happened.
                });

            },

            addAnimal: function () {

                firebase.database().ref('userID' + this.userID).push(this.cAnimal)




            },

            querydb: function () {

                var self = this;

                var query = firebase.database().ref('userID' + this.userID).orderByKey();
                query.once("value")
                    .then(function(snapshot) {
                        snapshot.forEach(function(childSnapshot) {

                            var key2 = childSnapshot.key;


                            // childData will be the actual contents of the child
                            var childData = childSnapshot.val();
                            console.log(childData);

                            //Here you can query the different informations about the animals
                            var childchild = childSnapshot.child("animalclass").val();

                            //console.log(key2);

                            var childchild = null;
                            console.log('This is the species: '+ childchild);



                            self.$emit('pushData', childData);



                        });
                    });

            },


            changeMap: function() {

                //this.reaction = this.selectMap.value;
                this.$emit('update', this.selectMap.value);

            }

        },





    }








</script>
