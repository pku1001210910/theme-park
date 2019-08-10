<template>
  <div id="ride">
    <b-container class="m-4">
      <b-row><h4 class="text-uppercase">{{ ride.info.area }}</h4></b-row>
      <b-row class="mb-1"><h2>{{ ride.name }}</h2></b-row>
    </b-container>

    <div>
      <b-img-lazy fluid-grow :src="ride.image" alt="Responsive image"></b-img-lazy>
    </div>

    <b-container class="m-4">
      <b-row>
      <p>{{ ride.info.description }}</p>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Ride',
  data () {
    return {
      ride: {
        name: null,
        info: {
          image: null,
          description: null,
          area: null
        }
      }
    }
  },
  methods: {
    refreshPage: function () {
      // Exit if the application hasn't initialized the ride list
      if (!this.$store.getters.isInitialized) return

      const ride = this.rides.find((ride) => (ride.id === this.$route.params.rideId))
      this.ride.name = ride.name
      this.ride.image = ride.image
      this.ride.info.description = ride.info.description
      this.ride.info.area = ride.info.area
    }
  },
  computed: {
    rides () { return this.$store.getters.getRides }
  },
  created () {
    this.refreshPage()
  },
  watch: {
    rides (obj) {
      this.refreshPage()
    }
  }
}
</script>

<style>

</style>
