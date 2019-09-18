<template>
  <b-navbar  type="dark" variant="primary">
    <b-navbar-brand v-if="['Home'].indexOf($route.name) === 0" href="#">
      <router-link to="/"><img src="https://d1sjoqff4xix7z.cloudfront.net/images/theme-park-app-logo.png" width="100px" alt="Wyld Kingdom"></router-link>
    </b-navbar-brand>

      <b-button variant="outline-light" class="btn  ml-2 my-2 my-sm-0" v-if="['Home'].indexOf($route.name) != 0" to="/" size="sm">
        <font-awesome-icon icon="arrow-circle-left" size="2x"/>
      </b-button>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <!-- Language selector icon -->
        <b-dropdown v-if="languageCount > 1" id="languages" variant="outline-light" class="m-md-2 mr-2" right>
          <template v-slot:button-content><font-awesome-icon icon="globe" size="2x"/></template>
          <b-dropdown-header id="dropdown-header-label">Select language</b-dropdown-header>        
          <b-dropdown-item v-for="(lang) in $languages" :key="lang.code" @click="changeLanguage(lang.code)">{{ lang.language }}</b-dropdown-item>
        </b-dropdown>    
      </b-navbar-nav>
      <!-- Photo Gallery icon -->
      <b-button v-if="$appConfig.photos.galleryURL !== ''" variant="outline-light" class="btn  ml-2 my-2 my-sm-0" to="/photo-gallery" size="md">
        <font-awesome-icon icon="images" size="2x"/>
      </b-button>
  </b-navbar>
</template>

<script>

export default {
  name: 'NavBar',
  data: function () {
    return {
      lang: 'EN',
      languageCount: 1
    }
  },
  methods: {
    changeLanguage: function (lang) {
      this.$root.$i18n.locale = lang
    }
  },
  mounted () {
    // In the workshop, if only English is in installed, the languageCount is 1.
    // We hide the control since the workshop user hasn't yet reached the
    // language module. This is achieved with v-if in the template.
    this.languageCount = Object.keys(this.$languages).length
  }
}
</script>

<style>
</style>
