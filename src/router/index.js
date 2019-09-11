import Vue from 'vue'
import Router from 'vue-router'
import Ride from '@/components/Ride'
import ParkMap from '@/components/ParkMap'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', name: 'Home', component: ParkMap },
    { path: '/ride/:rideId', name: 'Ride', component: Ride }
  ]
})
