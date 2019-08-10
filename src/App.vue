<template>
  <div id="app">
    <navBar/>
    <router-view></router-view>
    <iot/>
    <parkAlert/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import ParkMap from '@/components/ParkMap'
import ParkAlert from '@/components/ParkAlert'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    NavBar,
    ParkMap,
    ParkAlert
  },
  methods: {
    addLocations: function (locations) {
      locations.map(location => {
        const key = location.sortKey.S.split('-')[0]
        switch (key) {
          // Restrooms
          case 'facility':
            this.$store.commit('addFacility', {
              id: location.sortKey.S,
              name: location.name.S,
              lat: location.map.M.lat.N,
              lng: location.map.M.lng.N,
              type: location.type.S
            })
            break
          // Rides
          case 'ride':
            this.$store.commit('addRide', {
              id: location.sortKey.S,
              name: location.name.S,
              lat: location.map.M.lat.N,
              lng: location.map.M.lng.N,
              thumbnail: location.thumbnail.S,
              image: location.image.S,
              wait: null,
              inService: null,
              info: {
                description: location.info.M.description.S,
                area: location.info.M.area.S
              }
            })
            break
        }
        this.$store.commit('setInitialized')
      })
    }
  },
  mounted: async function () {
    try {
      const results = await axios.get(this.$appConfig.api.locationsURL)
      console.log('ParkMap: ', results)
      this.addLocations(results.data.Items)
    } catch (err) {
      console.error(err)
    }
  }
}
</script>
