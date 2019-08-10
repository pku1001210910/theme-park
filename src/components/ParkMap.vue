<template>
  <div id="map">
    <l-map
      ref="map"
      :min-zoom="minZoom"
      :max-zoom="maxZoom"
      :max-bounds="maxBounds"
      :crs="crs"
    >
      <!-- This is the theme park map background -->
      <l-image-overlay :url="url" :bounds="bounds" />

      <!-- List of facilities markers -->
      <l-marker v-for="facility in facilities" :lat-lng="facility" :key="facility.id">
        <l-icon :icon-anchor="[21, 0]">
          <b-button fluid class="p-1 bg-light">
            <b-img width="32px" height="32x" fluid :src="getIconFromType(facility.type)"></b-img>
          </b-button>                
        </l-icon>
        <l-popup :content="facility.name" />
      </l-marker>

      <!-- List of rides markers -->
      <l-marker v-for="ride in rides" :lat-lng="ride" :key="ride.id">
        <l-icon :icon-anchor="[50, 30]">
          <!-- <transition name="slide-fade" mode="out-in"> -->
            <div :key="ride.wait">
              <b-button variant="light" router-link :to="'/ride/' + ride.id">
                <b-media>
                  <b-img slot="aside" :src="ride.thumbnail" width="64" alt="placeholder"></b-img>
                  <div v-show="ride.inService"><b-badge :variant="getVariantFromWait(ride.wait)">{{ ride.wait }} mins</b-badge></div>
                  <div v-show="ride.inService===false"><b-badge  variant="danger">Out of service</b-badge></div>
                  <h6>{{ ride.name }}</h6>
                </b-media>
              </b-button>
              </div>
          <!-- </transition> -->
          </l-icon>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { CRS, Icon } from 'leaflet'
import { LMap, LImageOverlay, LMarker, LPopup, LPolyline, LIcon } from 'vue2-leaflet'
import { VPopover, VTooltip } from 'v-tooltip'

// Leaflet/Webpack bug workaround - https://github.com/Leaflet/Leaflet/issues/4968
delete Icon.Default.prototype._getIconUrl

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export default {
  name: 'ParkMap',
  components: {
    LMap,
    LImageOverlay,
    LMarker,
    LPopup,
    LPolyline,
    LIcon,
    VPopover,
    VTooltip
  },
  data () {
    return {
      url: this.$appConfig.images.parkMapURL,
      bounds: [[0, 0], [867, 1300]],
      minZoom: 0,
      maxZoom: 2,
      maxBounds: [[0, 0], [867, 1300]],
      crs: CRS.Simple,
      icons: this.$appConfig.icons
    }
  },
  computed: {
    rides () { return this.$store.getters.getRides },
    facilities () { return this.$store.getters.getFacilities }
  },
  methods: {
    getIconFromType: function (type) {
      return this.$appConfig.icons[type]
    },
    // Return color-coding based upon wait time
    getVariantFromWait: (wait) => {
      if (wait > 100) return 'danger'
      if (wait > 90) return 'warning'
      if (wait > 60) return 'info'
      if (wait > 0) return 'success'
    }
  },
  mounted: async function () {
    this.$refs.map.mapObject.setView([400, 750], 0)
    // this.$refs.map.mapObject.on('click', (event) => {
    //   console.log(event)
    // })
  }
}
</script>
<style>
@import "../../node_modules/leaflet/dist/leaflet.css";
#map {
  height: calc(100vh - 65px); 
  width: 100%;
}
.slide-fade-enter-active .slide-fade-leave-active {
  transition: opacity 3s;
}
.slide-fade-enter, .slide-fade-leave-to
{
  opacity: 0;
}  
</style>