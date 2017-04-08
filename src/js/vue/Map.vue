<template>
  <div class="component-vue-map">
    <div class="map-container" ref="map"></div>
    <slot></slot>
  </div>
</template>

<script>
  import Leaflet from 'leaflet'
  import LayerContainer from './components/mixins/LayerContainer'

  export default {

    mixins: [ LayerContainer ],

    props: {
      position: {
        type: Object,
        required: true
      },

      zoom: {
        type: Number,
        default: 13
      },

      minZoom: {
        type: Number
      },

      maxZoom: {
        type: Number
      },
        positionClick: {
            type: Object
        }
    },

    mounted () {
      this.$map = Leaflet.map(this.$refs.map, {
        center: this.position,
        zoom: this.zoom,
        minZoom: this.minZoom,
        maxZoom: this.maxZoom
      })


      // passthru events
      const mapEvents = [
        'click', 'dblclick', 'mousedown', 'mouseup', 'mouseover', 'mouseout', 'mousemove', 'contextmenu',
        'focus', 'blur', 'preclick', 'load', 'unload', 'viewreset', 'movestart', 'dragstart', 'drag', 'dragend',
        'zoomstart', 'zoomlevelschange', 'resize', 'autopanstart', 'layeradd', 'layerremove', 'baselayerchange',
        'overlayadd', 'overlayremove', 'locationfound', 'locationerror', 'popupopen', 'popupclose'
      ]
      mapEvents.forEach(eventName => this.$map.on(eventName, ev => this.$emit(eventName, ev)))

      // events with modified data
      this.$map.on('zoom', ev => this.$emit('zoom', {
        ...ev,
        zoom: this.$map.getZoom()
      }))
      this.$map.on('zoomend', ev => this.$emit('zoomend', {
        ...ev,
        zoom: this.$map.getZoom()
      }))
      this.$map.on('move', ev => this.$emit('move', {
        ...ev,
        position: this.$map.getCenter()
      }))
      this.$map.on('movend', ev => this.$emit('moveend', {
        ...ev,
        position: this.$map.getCenter()
      }))


      this.$setContainer(this.$map)
    },

    watch: {
      zoom (zoom) {
        this.$map.setZoom(zoom)
      },

      minZoom (minZoom) {
        this.$map.setMinZoom(minZoom)
      },

      maxZoom (maxZoom) {
        this.$map.setMaxZoom(maxZoom)
      },

      position (position) {
        this.$map.panTo({
          lat: position.lat,
          lng: position.lng
        })
      }
    },





  }
</script>

<style lang="sass" scoped>



</style>