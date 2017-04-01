<template lang="html" xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div>
        <h2>{{ message }}</h2>

        <div>
            <input v-model="message">
        </div>

        <select v-model="selected">
            <option v-for="animal in animals" v-bind:value="animal.text">
                {{ animal.text }}
            </option>
        </select>
        <span>Selected: {{ selected }}</span>
        <small><button v-on:click="showAnimal(selected)">show</button></small><br>
        <span v-model="NowSelected">TEST Selected: {{ NowSelected }}</span>
    </div>
</template>

<script>
    export default {
      data: function() {
        return {
          message: 'Hello from Vue.js!',
            selected: 'White Stork',
            animals: [
                { text: 'White Stork', value: 'A' },
                { text: 'Black Stork', value: 'B' },
                { text: 'Squirrel', value: 'C' }
            ]
        }
      },
    methods: {
        showAnimal: function (selected) {
            NowSelected: selected;

        }
    }
    };




</script>

<style lang="sass" scoped>
    div {
        background-color: #efefef;
        padding: 10px;
        margin: 10px 0;
    }
</style>