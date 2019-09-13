<template>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <b-navbar-brand v-if="['Home'].indexOf($route.name) === 0" href="#">
      <router-link to="/"><img src="https://d1sjoqff4xix7z.cloudfront.net/images/theme-park-app-logo.png" width="100px" alt="Wyld Kingdom"></router-link>
    </b-navbar-brand>

    <b-navbar-nav>
      <b-nav-item v-if="['Home'].indexOf($route.name) != 0" to="/">
        <b-button size="sm" variant="light" class="ml-2 my-2 my-sm-0" right>Back</b-button>
      </b-nav-item>
    </b-navbar-nav>

    <!-- <b-navbar-toggle target="nav-collapse"></b-navbar-toggle> -->
    <!-- <b-collapse id="nav-collapse" is-nav> -->
      <!-- Right aligned nav items -->
      <!-- <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown text="Language" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav> -->
    <b-button size="sm" variant="light" class="ml-2 my-2 my-sm-0" right>Language</b-button>
    <b-button size="sm" variant="light" class="ml-2 my-2 my-sm-0" right>My Photos</b-button>
    <!-- </b-collapse> -->
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
