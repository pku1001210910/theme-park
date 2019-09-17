<template>
  <div id="ride">
    <b-card title="Your photo gallery"/>      
                  
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
                  description="Wow!"
                  quote="Quote here"
                  hashtags="aws serverless reInvent2019"
                  twitter-user="jbesw"
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
    const API_ENDPOINT = this.$appConfig.photos.galleryURL
    const response = await axios({
      method: 'GET',
      url: API_ENDPOINT
    })
    console.log('Response: ', response.data)
    response.data.result.Items.map((photo) => {
      console.log(photo.sortKey)
      this.images.push(`https://theme-park-photos-finalbucket-12gwfuzf9oaz0.s3-us-west-2.amazonaws.com/${photo.sortKey}`)
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