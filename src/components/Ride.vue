<template>
  <div id="ride">
    <b-card 
      :title="ride.name"
      :sub-title="ride.info.area"
      :img-src="ride.info.image"
      img-alt="Image"
      img-top
      tag="article"
      class="mb-2"
      style="max-width: 50rem;"
    >
      <b-card-text>
        {{ ride.info.description }}
      </b-card-text>
      <img :src="image" />
      <b-button @click="$refs.file.click()" block href="#" variant="primary"  type="file">Add ride photo</b-button>
      <input id="file" accept="image/jpeg" type="file" ref="file" style="display: none" @change="onFileChange"/> 
    </b-card>
  </div>
</template>

<script>
const axios = require('axios')
export default {
  name: 'Ride',
  data () {
    return {
      image: '',
      ride: {
        name: null,
        info: {
          image: 'null',
          description: null,
          area: null
        },
        slide: 0,
        sliding: null
      }
    }
  },
  methods: {
    refreshPage: function () {
      // Exit if the application hasn't initialized the ride list
      if (!this.$store.getters.isInitialized) return

      const ride = this.rides.find((ride) => (ride.id === this.$route.params.rideId))
      this.ride.name = ride.name
      this.ride.info.image = ride.image
      this.ride.info.description = ride.info.description
      this.ride.info.area = ride.info.area
    },
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    },
    fileSelected () {
      console.log(this.$refs.file.files)
    },
    onFileChange (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files[0])
    },
    createImage (file) {
      // var image = new Image()
      let reader = new FileReader()
      const MAX_IMAGE_SIZE = 5000000
      reader.onload = (e) => {
        console.log('length: ', e.target.result.includes('data:image/jpeg'))
        if (!e.target.result.includes('data:image/jpeg')) {
          return alert('Wrong file type - JPG only.')
        }
        if (e.target.result.length > MAX_IMAGE_SIZE) {
          return alert('Image is loo large - 5Mb maximum')
        }
        this.image = e.target.result
        this.uploadImage()
      }
      reader.readAsDataURL(file)
    },
    uploadImage: async function () {
      const API_ENDPOINT = 'https://77iz7yeqw7.execute-api.us-west-2.amazonaws.com/Prod/'
      // Get the presigned URL
      const response = await axios({
        method: 'GET',
        url: API_ENDPOINT
      })
      console.log('Response: ', response.data)
      console.log('Uploading: ', this.image)
      let binary = atob(this.image.split(',')[1])
      let array = []
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i))
      }
      let blobData = new Blob([new Uint8Array(array)], {type: 'image/jpeg'})
      console.log('Uploading to: ', response.data.uploadURL)
      const result = await fetch(response.data.uploadURL, {
        method: 'PUT',
        body: blobData
      })
      console.log('Result: ', result)
      // Final URL for the user doesn't need the query string params
      this.uploadURL = response.data.uploadURL.split('?')[0]
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

<style scoped>
img {
  width: 80%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
</style>
