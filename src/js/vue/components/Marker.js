import Leaflet from 'leaflet'
import Layer from './mixins/Layer'

const defaultOptions = Leaflet.Marker.prototype.options

// marker image fix
// https://github.com/PaulLeCam/react-leaflet/issues/255#issuecomment-261904061
delete Leaflet.Icon.Default.prototype._getIconUrl
Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: '../../img/squirrel.png',
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  iconSize: 50
})



//https://github.com/KoRiGaN/Vue2Leaflet/blob/c009c08f38f503a016586e01ceb4bc0fac33fd19/src/components/Marker.vue
//https://github.com/KoRiGaN/Vue2Leaflet/blob/c009c08f38f503a016586e01ceb4bc0fac33fd19/examples/index.html

export default {
    mixins: [ Layer ],

    props: {
        visible: {
            type: Boolean,
            custom: true,
            default: true,
        },
        latlng: {
            type: Object,
        },
        title: {
            type: String,
            custom: true,
            default: '',
        },
        icon: {
            custom: false,
            default: '',
        },
        popupcontent: {
            type: String,
            default: ''
        }
    },
    watch: {
        position (latlng) {
            this.$marker.setLatLng(latlng)
        },

        icon (icon) {
            this.$marker.setIcon(icon)
        }
    },

    created () {
        this.$marker = Leaflet.marker(this.latlng, {
            icon: this.icon
        })
        this.$marker.bindPopup(this.popupcontent)
        this.$setLayer(this.$marker)
    },

    mounted () {
        // passthru events
        const mapEvents = [
            'click', 'dblclick', 'mousedown', 'mouseover', 'mouseout', 'contextmenu', 'dragstart', 'drag', 'dragend',
            'move', 'add', 'remove', 'popupopen', 'popupopen'
        ]
        mapEvents.forEach(eventName => this.$marker.on(eventName, ev => this.$emit(eventName, ev)))
    },
    beforeDestroy() {
        //this.setVisible(false);
    },
    methods: {

        setVisible(newVal, oldVal) {
            if (newVal == oldVal) return;
            if (newVal) {
                this.mapObject.addTo(this.parent);
            } else {
                this.parent.removeLayer(this.mapObject);
            }
        },
    }
};