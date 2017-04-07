<template>




    <div id="da">
        <ul is="transition-group">
            <li v-for="user in users" class="user" :key="user['.key']">
                <span>{{user.name}} - {{user.email}}</span>
                <button v-on:click="removeUser(user)">X</button>
            </li>
        </ul>
        <form id="form" v-on:submit.prevent="authentication()">
            <input type="text" v-model="newUser.name" placeholder="Username">
            <input type="email" v-model="newUser.email" placeholder="email@email.com">
            <input type="submit" value="Add User">
        </form>
        <ul class="errors">
            <li v-show="!validation.name">PLS INSERT</li>
            <li v-show="!validation.email">EZ PZ</li>
        </ul>



        <form id="form2" v-on:submit.prevent="login()">
            <input type="text" v-model="loguser.password" placeholder="password">
            <input type="email" v-model="loguser.lemail" placeholder="email">
            <input type="submit" value="LOGIN">
        </form>
        <ul class="errors">
            <li v-show="!validation.name">PLS INSERT</li>
            <li v-show="!validation.email">EZ PZ</li>
        </ul>


        <form id="form3" v-on:submit.prevent="check()">
            <input type="submit" value="check">
        </form>

        <button v-on:click="signOut()">Logout</button>

    </div>






</template>


<script>




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



    // Setup Firebase


        name: 'app',
        // element to mount to
        // initial data
        data () {
            return {
            newUser: {
                name: '',
                email: ''
            },
            users: '',
            loguser: {
                lemail: '',
                password: ''
            }
        }},
        // firebase binding
        // https://github.com/vuejs/vuefire
        firebase: {
                users: usersRef
            },
        // computed property for form validation state
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
        // methods
        methods: {
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
        }
    };


</script>

<style>
    body {
        font-family: Helvetica, Arial, sans-serif;
    }

    ul {
        padding: 0;
    }

    .user {
        height: 30px;
        line-height: 30px;
        padding: 10px;
        border-top: 1px solid #eee;
        overflow: hidden;
        transition: all .25s ease;
    }

    .user:last-child {
        border-bottom: 1px solid #eee;
    }

    .v-enter, .v-leave-active {
        height: 0;
        padding-top: 0;
        padding-bottom: 0;
        border-top-width: 0;
        border-bottom-width: 0;
    }

    .errors {
        color: #f00;
    }



</style>