<template>
  <div id="ride">
    <b-card :title="$t('phrases.yourGallery')"/>      
                  
    <div>
      <gallery :photos="photos" :index="index" @close="index = null"></gallery>
      <div
        class="parkPhoto"
        v-for="(photo, photoIndex) in photos"
        :key="photoIndex"
        @click="index = photoIndex"
        :style="{ backgroundImage: 'url(' + photo + ')', width: '400px', height: '300px' }"
      >
        <social-sharing :url="photo"
          title="I completed the AWS Serverless Theme Park Workshop!"
          hashtags="aws serverless reInvent2019"
          inline-template>
          <div>
            <network network="twitter">
              <img class="hoverButton" src="@/assets/twitter_share.png"  style="width: 150px;left:125px;top:261px;position:relative;"/>
            </network>
          </div>
        </social-sharing>   
      </div>
    </div>
  </div>
</template>

<script>
import VueGallery from 'vue-gallery'
export default {
  name: 'PhotoGallery',
  components: {
    'gallery': VueGallery
  },
  data () {
    return {
      index: null
    }
  },
  computed: {
    photos () {
      console.log(this.$store.getters.getPhotos)
      return this.$store.getters.getPhotos
    }
  }
}
</script>

<style scoped>
  .parkPhoto {
    float: left;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    border: 1px solid #ebebeb;
    margin: 5px;
  }
</style>