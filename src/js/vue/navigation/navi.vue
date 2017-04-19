<template>

<div>
    <div id="navi">

        <nav v-bind:class="active" v-on:click.prevent class="navMenu">
            <a href="#" v-if="!loggedin" class="login" v-on:click="makeActive('login'), makeModalActive('log')" @click="showModal = true">{{ loginText }}</a>
            <a href="#" v-if="loggedin" class="login" v-on:click="makeActive(''), signOut()" >{{ loginText }}</a>
            <a href="#" class="services" v-on:click="makeActive('services')">Settings</a>
            <a href="#" class="contact" v-on:click="makeActive('contact')">Contact</a>
        </nav>
        <p>You chose <b>{{ active }}</b></p>

        <div>
            <form id="addAnimal" v-on:submit.prevent="addAnimal">
                <select name="species" v-model="newAnimal.species">
                    <option value="mamal">mamal</option>
                    <option value="bird">bird</option>
                    <option value="fish">fish</option>
                    <option value="amphib">amphib</option>
                </select>

                <!--input type="text" v-model="newAnimal.species" placeholder="Spec"-->
                <input type="text" v-model="newAnimal.animal" placeholder="Kind of Animal">
                <input type="text" v-model="newAnimal.name" placeholder="Name">
                <input type="text" v-model="newAnimal.lat" placeholder="latitude">
                <input type="text" v-model="newAnimal.lon" placeholder="longitude">
                <input type="submit" value="Add TO DATABASE">
            </form>

            <button v-on:click="querydb()">QueryDB</button>

        </div>


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
            <modal v-if="showModal" @close="showModal = false">
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
                    <div class="modhalfright" v-if="!loggedin">
                        <form id="form2" v-on:submit.prevent="login()">
                             <div class="form-group">
                                <label>Email</label>
                                <input v-bind:class="{ lala: isActive }" type="email" v-model="loguser.lemail" placeholder="">
                                 <label>Password</label>
                                <input v-bind:class="{ lala: isActive }" type="password" v-model="loguser.password" placeholder="">
                                <input type="submit" class="loginButton" value="LOGIN">
                            </div>
                        </form>
                    </div>
                </div>
                    <!-- SIGN IN -->
                    <div v-else-if="retActive()==='new'">
                        <div class="modhalfleft">
                            <img class="modImgRight" src="../../../img/footsteps_right.png">
                        </div>
                        <div class="modhalfright">
                        <form slot = body id="form" v-on:submit.prevent="authentication">
                            <div class="form-group">
                                <label>Email <span class="errorInfo" v-show="!validation.email"> (Please provide a valid email address.)</span></label>
                                <input type="email" v-model="createuser.lemail" placeholder="">
                                <label>Password <span class="errorInfo" v-show="!validation.password"> (Password cannot be empty.)</span></label>
                                <input type="password" v-model="createuser.password" placeholder="">
                                <input type="submit" class="createButton" value="CREATE USER">
                            </div>
                        </form></div>
                    </div>
                </div>

                <!-- slot = footer>
                    <button @click="signOut()">Logout</button>
                </div-->

            </modal>

        </div>

    </div>

</div>

</template>


<script>

    import Vue from 'vueCommon';

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

    var auth = firebase.auth();

    export default {

        name: 'LOGIN',
        component: Vue.component('modal', {
            template: '#modal-template',   },
        ),
        data() {
            return {
            newAnimal: {

                    species: '',
                    animal: '',
                    name: '',
                    lat: '',
                    lon: ''

            },
            active: 'home',
            activeMod: 'log',
            currentRoute: window.location.pathname,
            showModal: false,
            logActive: true,
            loggedin: false,
            isActive: false,
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

        }},

        computed: {
            validation: function () {
                return {
                    password: !!this.createuser.password.trim(),
                    email: emailRE.test(this.createuser.lemail)
                }
            },
            isValid: function () {
                var validation = this.validation
                return Object.keys(validation).every(function (key) {
                    return validation[key]
                })
            }
        },
        watch: {
            showModal:function (val) {

                if(val === true){
                    this.makeActive('login')
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
                    auth.createUserWithEmailAndPassword(this.createuser.lemail, this.createuser.password).then(function(user) {



                        if (user.emailVerified)
                        {
                            console.log("Email is already verified")

                        }
                        else
                        {
                            user.sendEmailVerification();
                            auth.signOut();
                            console.log("Verification Mail was sent");
                            self.showModal = false;
                            self.doAlert('Verification Mail was sent');

                        }

                        self.createuser.lemail="";
                        self.createuser.password="";



                    }).catch(function (error) {


                       console.log(error);
                       self.doAlert(error.message)


                    });
                }
                else{

                }

            },
            login: function () {
                //Check and write UserID
                var self = this;
                this.check();

                    auth.signInWithEmailAndPassword(this.loguser.lemail, this.loguser.password).then(function (user) {

                    }).catch(function (error) {
                        console.log("NO LOGIN POSSIBLE");
                        var message = 'Invalid e-mail or password!'
                        self.doAlert(message);
                        self.isActive = true;

                    });



            },
            check: function () {

                // Check function for Login and writing user.uid
                var self = this;


                auth.onAuthStateChanged(function (user) {

                    if(user) {
                        if (user.emailVerified) {

                            self.userID = user.uid;
                            self.showModal = false;


                            self.loguser.lemail="";
                            self.loguser.password="";

                            self.loggedin = true;

                            console.log("User is logged in")
                            self.makeActive('');

                            self.loginText = 'Logout'
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

                auth.signOut().then(function() {
                    console.log("sign out")
                    self.loggedin = false;
                    self.loginText = 'Login'
                    self.makeActive('');
                }).catch(function(error) {
                    // An error happened.
                });

            },

            addAnimal: function () {

                    firebase.database().ref('userID' + this.userID).push(this.newAnimal)
                    this.newAnimal.species='',
                    this.newAnimal.animal='',
                    this.newAnimal.name='',
                    this.newAnimal.lat='',
                    this.newAnimal.lon=''



            },

            querydb: function () {

                var query = firebase.database().ref('userID' + this.userID).orderByKey();
                query.once("value")
                    .then(function(snapshot) {
                        snapshot.forEach(function(childSnapshot) {

                            var key2 = childSnapshot.key;
                            // childData will be the actual contents of the child
                            var childData = childSnapshot.val();

                            //Here you can query the different informations about the animals
                            var childchild = childSnapshot.child("species").val();

                            console.log(key2);
                            console.log(childData);
                            console.log('This is the species: '+ childchild);

                        });
                    });

            },
            doAlert(alertMessage){
                alert('Error: ' + alertMessage)
            }

        },

    }



</script>
