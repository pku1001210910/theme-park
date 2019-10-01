<template>
  <div id="ride">
    <b-card :title="$t('phrases.yourGallery')"/>      
                  
    <div>
      <gallery :images="images" :index="index" @close="index = null"></gallery>
      <div
        class="parkPhoto"
        v-for="(image, imageIndex) in images"
        :key="imageIndex"
        @click="index = imageIndex"
        :style="{ backgroundImage: 'url(' + image + ')', width: '400px', height: '300px' }"
      >
        <social-sharing :url="image"
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
import axios from 'axios'
export default {
  name: 'PhotoGallery',
  components: {
    'gallery': VueGallery
  },
  data () {
    return {
      images: [],
      index: null
    }
  },
  async mounted () {
    if (this.$appConfig.photos.galleryURL === '') return
    const API_ENDPOINT = this.$appConfig.photos.galleryURL
    const response = await axios({
      method: 'GET',
      url: API_ENDPOINT
    })
    console.log('Response: ', response.data)
    response.data.result.Items.map((photo) => {
      const photoURL = `https://${this.$appConfig.photos.finalBucketName}.s3-${this.$appConfig.iot.region}.amazonaws.com/${photo.objectName}`
      console.log('PhotoGallery adding: ', photoURL)
      this.images.push(photoURL)
    })
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