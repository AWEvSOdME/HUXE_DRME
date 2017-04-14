<template>
<div>



    <div id="navi">
        <nav v-bind:class="active" v-on:click.prevent>
            <a href="#" class="home" v-on:click="makeActive('home')">Home</a>
            <a href="#" class="login" v-on:click="makeActive('log')" @click="showModal = true">login</a>
            <a href="#" class="services" v-on:click="makeActive('services')">Services</a>
            <a href="#" class="contact" v-on:click="makeActive('contact')">Contact</a>
        </nav>

        <p>You chose <b>{{ active }}</b></p>

<div>




</div>



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
        <div class="modal-mask" @click="$emit('close')">
            <div class="modal-wrapper">
                <div class="modal-container" @click.stop>

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
                            default footer
                            <button class="modal-default-button" @click="$emit('close')">
                                OK
                            </button>
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
            <nav v-bind:class="active" v-on:click.prevent>
                <a href="#" class="log" v-on:click="makeActive('log')">Login</a>
                <a href="#" class="new" v-on:click="makeActive('new')">New Account</a>
            </nav>


        </div>
        <div slot = body>
        <div  v-if="retActive()==='log'">
        <form  id="form2" v-on:submit.prevent="login()">
            <input type="email" v-model="loguser.lemail" placeholder="email">
            <input type="password" v-model="loguser.password" placeholder="password">
            <input type="submit" value="LOGIN">
        </form>
        </div>
            <div v-else-if="retActive()==='new'">

                <form slot = body id="form" v-on:submit.prevent="authentication">
                    <input type="email" v-model="createuser.email" placeholder="email@email.com">
                    <input type="password" v-model="createuser.password" placeholder="Password">
                    <input type="submit" value="Create User">

                    <ul class="errors">
                        <li v-show="!validation.email">Please provide a valid email address.</li>
                        <li v-show="!validation.name">Password cannot be empty.</li>
                    </ul>
                </form>


            </div>
        </div>



        <div slot = footer>
            <button @click="signOut()">Logout</button>
        </div>

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



    var usersRef = firebase.database().ref('users');
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
            currentRoute: window.location.pathname,
            showModal: false,
            logActive: true,

                users: '',
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
        firebase: {
            users: usersRef
        },



        computed: {
            validation: function () {
                return {
                    name: !!this.createuser.password.trim(),
                    email: emailRE.test(this.createuser.email)
                }
            },
            isValid: function () {
                var validation = this.validation
                return Object.keys(validation).every(function (key) {
                    return validation[key]
                })
            }
        },
        methods: {
            makeActive: function (beitem) {
                this.active = beitem;
            },

            retActive: function () {
                return this.active;

            },

            //Function for
            authentication: function () {
                if (this.isValid)
                {
                    auth.createUserWithEmailAndPassword(this.createuser.email, this.createuser.password)
                    {

                        this.createuser.email="";
                        this.createuser.password="";

                        var errorCode = "ERRORPLAN";
                        var errorMessage = "ERROR";

                    };
                }

            },
            login: function () {
                //Check and write UserID
                this.check();
                auth.signInWithEmailAndPassword(this.loguser.lemail, this.loguser.password).catch(function (error) {
                    console.log("ERRORORORO");


                    var errorCode = "ERRORPLAN";
                    var errorMessage = "ERROR";

                });


            },
            check: function () {

                // Check function for Login and writing user.uid
                var self = this;


                auth.onAuthStateChanged(function (user) {

                    if(user) {

                        self.userID = user.uid;
                        self.showModal = false;


                        this.loguser.email="";
                        this.loguser.password="";

                        console.log("User is logged in")
                    }
                    else {
                        console.log("User is not logged in")
                    }
                });

            },

            signOut: function () {
                auth.signOut().then(function() {
                    console.log("sign out")
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

            }

        },

    }



</script>




<style>

    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .10s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: 300px;
        margin: 0px auto;
        padding: 0px 0px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }

    .modal-header h3 {
        margin-top: 0;
        color: #42b983;
    }

    .modal-body {
        padding: 20px 30px;
        margin: 20px 0;
    }

    .modal-default-button {
        float: right;
    }
    .modal-footer{
        padding: 10px 10px;
    }

    /*
     * The following styles are auto-applied to elements with
     * transition="modal" when their visibility is toggled
     * by Vue.js.
     *
     * You can easily play with the modal transition by editing
     * these styles.
     */

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }


    a, a:visited {
        outline:none;
        color:#309dc1;
    }

    a:hover{
        text-decoration:none;
    }

    section, footer, header, aside, nav{
        display: block;
    }

    /*-------------------------
        The menu
    --------------------------*/

    nav{
        display:inline-block;
        margin:0px auto 0px;
        background-color:#5d5b66;
        box-shadow:0 1px 1px #ccc;
        border-radius:2px;
    }

    nav a{
        display:inline-block;
        padding: 20px 10px;
        color:#fff !important;
        font-weight:bold;
        font-size:16px;
        text-decoration:none !important;
        line-height:1;
        text-transform: uppercase;
        background-color:transparent;

        -webkit-transition:background-color 0.25s;
        -moz-transition:background-color 0.25s;
        transition:background-color 0.25s;
    }

    nav a:first-child{
        border-radius:2px 0 0 2px;
    }

    nav a:last-child{
        border-radius:0 2px 2px 0;
    }


    nav.log .log,
    nav.new .new,

    nav.home .home,
    nav.login .login,
    nav.services .services,
    nav.contact .contact{
        background-color: #ed5758;
    }

    p{
        font-size:22px;
        font-weight:bold;
        color:#7d9098;
    }

    p b{
        color:#ffffff;
        display:inline-block;
        padding:5px 10px;
        background-color:#c4d7e0;
        border-radius:2px;
        text-transform:uppercase;
        font-size:18px;
    }
    .resource {
        margin: 20px 0;
    }

</style>