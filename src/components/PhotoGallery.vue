<template>
  <div id="ride">
    <b-card title="Your photo gallery"/>      
                  
    <div>
      <gallery :images="images" :index="index" @close="index = null"></gallery>
      <div
        class="image"
        v-for="(image, imageIndex) in images"
        :key="imageIndex"
        @click="index = imageIndex"
        :style="{ backgroundImage: 'url(' + image + ')', width: '400px', height: '300px' }"
      >
            <social-sharing url="https://theme-park-photos-finalbucket-12gwfuzf9oaz0.s3-us-west-2.amazonaws.com/ac288598-63ed-49a2-bd6e-ba1bb12e69e4.jpg"
                      title="I completed the AWS Serverless Theme Park Workshop!"
                      description="Wow!"
                      quote="Quote here"
                      hashtags="aws serverless reInvent2019"
                      twitter-user="jbesw"
                      inline-template>
      <div>
            <network network="twitter">
              <img class="hover-button" src="https://cdn3.iconfinder.com/data/icons/social-share-icons-1/256/twitter_share-512.png" width="50%"/>
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
  },
  methods: {
    refreshPage: function () {
    },
    onSlideStart (slide) {
    },
    onSlideEnd (slide) {
    },
    makeToast (title, body, variant = 'success') {
    },
    fileSelected () {
    },
    onFileChange (e) {
    },
    createImage (file) {
    },
    uploadImage: async function () {
    }
  },
  computed: {
  },
  created () {
  },
  watch: {
  }
}
</script>

<style scoped>
  .image {
    float: left;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    border: 1px solid #ebebeb;
    margin: 5px;
  }
  .hover-button {
    position: absolute;
    width: 150px;
    height: auto;
    left: 100px
  }
</style>