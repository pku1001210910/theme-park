<template>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'ParkAlert',
  mounted () {
    console.log('ParkAlert::mounted')
  },
  computed: {
    parkAlert () { return this.$store.getters.getParkAlert }
  },
  watch: {
    parkAlert (msg) {
      console.log('ParkAlert: ', msg)

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: msg.title,
        text: msg.text,
        type: msg.type,
        confirmButtonText: msg.confirmButtonText
      })
    }
  }
}
</script>
