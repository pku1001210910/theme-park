<template>
  <b-navbar toggleable="sm" fixed type="dark" variant="primary">
    <b-navbar-brand href="#">
      <router-link to="/"><img src="https://d1sjoqff4xix7z.cloudfront.net/images/theme-park-app-logo.png" width="100px" alt="Wyld Kingdom"></router-link>
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-nav-item v-if="['Home'].indexOf($route.name) != 0" >
      <router-link to="/"><b-button variant="light">Back to Map</b-button></router-link>
    </b-nav-item>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <!-- <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown>
        <Auth/>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>  
</template>

<script>
// import Auth from './Auth'
export default {
  name: 'NavBar',
  components: {
    // Auth
  }
}
</script>

<style>
</style>
