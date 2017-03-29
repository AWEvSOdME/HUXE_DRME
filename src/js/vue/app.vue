<template lang="html">
    <div>
        <h2>{{ message }}</h2>

        <div>
            <input v-model="message">
        </div>
    </div>
</template>

<script>
    export default {
      data: function() {
        return {
          message: 'Hello from Vue.js!'
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