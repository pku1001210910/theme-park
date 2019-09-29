<template>
  <div></div>
</template>

<script>
  const AWS = require('aws-sdk')
  const AWSIoTData = require('aws-iot-device-sdk')
  const ridesTopic = 'theme-park-rides'
  const alertsTopic = 'theme-park-alerts'

  export default {
    name: 'IoT',
    data () {
      return {
        init: false
      }
    },
    mounted: function () {
      // For the workshop, if this isn't in the config, the user has not
      // attemped this module yet, so hide the feature.

      if (this.$appConfig.iot.poolId === '') return
      const AWSConfiguration = this.$appConfig.iot

      console.log('IoT mounted')
      const _store = this.$store

      const clientId = 'theme-park-client-' + (Math.floor((Math.random() * 100000) + 1))
      AWS.config.region = AWSConfiguration.region

      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: AWSConfiguration.poolId
      })

      const cognitoIdentity = new AWS.CognitoIdentity()
      const getCreds = function () {
        console.log('getCreds called')
        AWS.config.credentials.get(function (err, data) {
          if (!err) {
            console.log('retrieved identity: ' + AWS.config.credentials.identityId)
            var params = {
              IdentityId: AWS.config.credentials.identityId
            }
            cognitoIdentity.getCredentialsForIdentity(params, function (err, data) {
              console.log('Creds: ', data)
              if (!err) {
                mqttClient.updateWebSocketCredentials(data.Credentials.AccessKeyId,
                  data.Credentials.SecretKey,
                  data.Credentials.SessionToken)
              // } else {
              //   console.log('error retrieving credentials: ' + err)
              }
            })
          } else {
            console.log('Error retrieving identity:' + err)
          }
        })
      }

      const mqttClient = AWSIoTData.device({
        region: AWS.config.region,
        host: AWSConfiguration.host,
        clientId: clientId,
        protocol: 'wss',
        maximumReconnectTimeMs: 8000,
        debug: false,
        accessKeyId: '',
        secretKey: '',
        sessionToken: ''
      })

      // When first connected, subscribe to the topics we are interested in.
      mqttClient.on('connect', function () {
        console.log('mqttClient connected')
        mqttClient.subscribe(ridesTopic)
        mqttClient.subscribe(alertsTopic)
      })

      // Attempt to reconnect in the event of any error
      mqttClient.on('error', function (err) {
        console.log('mqttClient error:', err)
        getCreds()
      })

      // A message has arrived - parse to determine topic
      mqttClient.on('message', function (topic, payload) {
        const msg = JSON.parse(payload.toString())
        console.log('Message: ', msg)
        console.log('IoT::onMessage: ', topic)
        if (topic === alertsTopic) {
          console.log('Message: ', msg)
          _store.commit('setParkAlert', msg)
          return
        }
        // ride updates use the ridesTopic
        if (topic === ridesTopic) {
          _store.commit('updateRideTimes', msg)
        }
      })
    }
  }
</script>