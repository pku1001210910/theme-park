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
        // Don't process items that aren't locations
        if (location.partitionKey !== 'locations') return
        const key = location.sortKey.split('-')[0]
        switch (key) {
          // Facilities
          case 'facility':
            this.$store.commit('addFacility', {
              id: location.sortKey,
              name: location.name,
              lat: JSON.parse(location.map).lat.N,
              lng: JSON.parse(location.map).lng.N,
              type: location.type
            })
            break
          // Rides
          case 'ride':
            const ride = {
              id: location.sortKey,
              name: location.name,
              lat: JSON.parse(location.map).lat.N,
              lng: JSON.parse(location.map).lng.N,
              thumbnail: location.thumbnail,
              image: location.image,
              wait: null,
              inService: null,
              info: {
                description: JSON.parse(location.info).description.S,
                area: JSON.parse(location.info).area.S
              }
            }
            this.$store.commit('addRide', ride)
            break
        }
        this.$store.commit('setInitialized')
      })
    }
  },
  mounted: async function () {
    try {
      // For the workshop, if this isn't in the config, the user has not
      // attemped this module yet, so hide the feature.

      if (this.$appConfig.api.locationsURL === '') return
      const response = await axios.get(this.$appConfig.api.locationsURL)
      console.log('ParkMap: ', response)
      this.addLocations(response.data.result.Items)
    } catch (err) {
      console.error(err)
    }
  }
}
</script>
