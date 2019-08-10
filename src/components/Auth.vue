<template>
  <div class="auth">
    <b-button size="sm" class="my-2 my-sm-0" type="submit">Sign In</b-button>
  </div>
</template>

<script>
import Amplify, { Auth, Hub } from 'aws-amplify'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)

export default {
  name: 'auth',
  data () {
    return {
      state: {
        user: null,
        customState: null
      }
    }
  },
  components: {
    Auth,
    Hub
  },
  mounted () {
    console.log('Mounted')
    Hub.listen('auth', ({ payload: { event, data } }) => {
      // switch (event) {
      //   case 'signIn':
      //     this.setState({ user: data })
      //     break
      //   case 'signOut':
      //     this.setState({ user: null })
      //     break
      //   case 'customOAuthState':
      //     this.setState({ customState: data })
      // }
      console.log('HUB: ', event, data)
    })
  },
  created () {
    // Auth.federatedSignIn({provider: 'Google'})
  }
}
</script>

<style>
.auth {
  margin: 0 auto;
  width: 460px;
}
</style>