import Vue from 'vueCommon';
import App from './app.vue';
import * as components from './components'

export default components


var app = new Vue({
    el: '#app',
    components: {App},
    template: `<app></app>`
});


