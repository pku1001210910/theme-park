import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// initial state
const state = {
  rides: [],
  facilities: [],
  parkAlert: null,
  initialized: false
}

// getters
const getters = {
  isInitialized: (state) => state.initialized,
  getParkAlert: (state) => state.parkAlert,
  getRides: (state) => state.rides,
  getFacilities: (state) => state.facilities
}

// actions
const actions = {
}

// mutations
const mutations = {
  // App is ready
  setInitialized (state) {
    state.initialized = true
  },
  setParkAlert (state, parkAlert) {
    console.log('Park Alert! ', parkAlert)
    state.parkAlert = parkAlert
  },
  addRide (state, ride) {
    state.rides.push(ride)
  },
  addFacility (state, facility) {
    state.facilities.push(facility)
  },
  updateRideTimes (state, rideTimes) {
    // Convert list of waittimes msg to JSON and iterate
    JSON.parse(rideTimes).map(rideTime => {
      console.log(rideTime)
      // Find matching ride and update wait time.
      for (let i = 0; i < state.rides.length; i++) {
        if (state.rides[i].id === rideTime.rideId) {
          state.rides[i].wait = rideTime.wait
          state.rides[i].inService = rideTime.inService
          return
        }
      }
    })

    console.log('updateRideTimes: ', state.rides)
  }
}

export const store = new Vuex.Store({
  state,
  actions,
  getters,
  mutations
})
