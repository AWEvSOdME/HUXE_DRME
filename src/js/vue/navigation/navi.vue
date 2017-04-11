<template>
<div>



    <div id="navi">
        <nav v-bind:class="active" v-on:click.prevent>
            <a href="#" class="home" v-on:click="makeActive('home')">Home</a>
            <a href="#" class="login" v-on:click="makeActive('login')" @click="showModal = true">login</a>
            <a href="#" class="services" v-on:click="makeActive('services')">Services</a>
            <a href="#" class="contact" v-on:click="makeActive('contact')">Contact</a>
        </nav>

        <p>You chose <b>{{ active }}</b></p>




<script type="text/x-template" id="modal-template">



    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <div class="modal-header">
                        <slot name="header">
                            default header
                        </slot>
                    </div>

                    <div class="modal-body">
                        <slot name="body">

                    <button class="modal-default-button">
                                OK
                            </button>

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

        <form slot = header id="form2" v-on:submit.prevent="login()">
            <input type="text" v-model="loguser.password" placeholder="password">
            <input type="email" v-model="loguser.lemail" placeholder="email">
            <input type="submit" value="LOGIN">
        </form>

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
        data () {
            return {
            newUser: {
                    name: '',
                    email: ''
                },
            active: 'home',
            currentRoute: window.location.pathname,
            showModal: false,

                users: '',
                loguser: {
                    lemail: '',
                    password: ''
                },

        }},
        firebase: {
            users: usersRef
        },
        component: Vue.component('modal', {
                template: '#modal-template',   },
        ),

        computed: {
            validation: function () {
                return {
                    name: !!this.newUser.name.trim(),
                    email: emailRE.test(this.newUser.email)
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
            addUser: function () {
                if (this.isValid) {
                    usersRef.push(this.newUser)
                    this.newUser.name = ''
                    this.newUser.email = ''
                }
            },
            removeUser: function (user) {
                usersRef.child(user['.key']).remove()
            },
            //Function for
            authentication: function () {
                if (this.isValid)
                {
                    firebase.auth().createUserWithEmailAndPassword(this.newUser.email, this.newUser.name)
                    {

                        this.newUser.email="";
                        this.newUser.name="";

                        var errorCode = "ERRORPLAN";
                        var errorMessage = "ERROR";

                    };
                }

            },
            login: function () {

                auth.signInWithEmailAndPassword(this.loguser.lemail, this.loguser.password).catch(function (error) {
                    console.log("ERRORORORO");


                    var errorCode = "ERRORPLAN";
                    var errorMessage = "ERROR";

                });


            },
            check: function () {

                auth.onAuthStateChanged(function (user) {
                    if(user) {
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
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: 300px;
        margin: 0px auto;
        padding: 20px 30px;
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
        margin: 20px 0;
    }

    .modal-default-button {
        float: right;
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
        margin:60px auto 45px;
        background-color:#5d5b66;
        box-shadow:0 1px 1px #ccc;
        border-radius:2px;
    }

    nav a{
        display:inline-block;
        padding: 18px 30px;
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