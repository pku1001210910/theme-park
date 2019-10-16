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
    initState: function (items) {
      let initRideTimes
      items.map(item => {
        // Initial ride time valus - store until locations populaterd
        if (item.partitionKey === 'config' && item.message) {
          initRideTimes = item.message
        }
        if (item.partitionKey !== 'locations') return
        const key = item.sortKey.split('-')[0]
        switch (key) {
          // Facilities
          case 'facility':
            this.$store.commit('addFacility', {
              id: item.sortKey,
              name: item.name,
              lat: JSON.parse(item.map).lat.N,
              lng: JSON.parse(item.map).lng.N,
              type: item.type
            })
            break
          // Rides
          case 'ride':
            const ride = {
              id: item.sortKey,
              name: item.name,
              lat: JSON.parse(item.map).lat.N,
              lng: JSON.parse(item.map).lng.N,
              thumbnail: item.thumbnail,
              image: item.image,
              wait: null,
              inService: null
            }
            this.$store.commit('addRide', ride)
            break
        }
        // Now add init ride times
        if (initRideTimes) {
          this.$store.commit('updateRideTimes', initRideTimes)
        }
        this.$store.commit('setInitialized')
      })
    }
  },
  mounted: async function () {
    try {
      // For the workshop, if this isn't in the config, the user has not
      // attemped this module yet, so don't initalize.
      if (this.$appConfig.api.URL === '') return

      const response = await axios.get(`${this.$appConfig.api.URL}/InitState/`)
      console.log('ParkMap: ', response)
      this.initState(response.data.result.Items)
    } catch (err) {
      console.error(err)
    }
  }
}
</script>
<style>
  body {
    background: #00b0f3 !important;
  }
</style>
