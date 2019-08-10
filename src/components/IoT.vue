<template>
  <div></div>
</template>

<script>
  const AWS = require('aws-sdk')
  const AWSIoTData = require('aws-iot-device-sdk')

  const AWSConfiguration = {
    poolId: 'us-east-1:d5dc8a12-3bc5-4152-aa92-a8267fc24359', // 'YourCognitoIdentityPoolId'
    host: 'au33be31eziux-ats.iot.us-east-1.amazonaws.com', // 'YourAwsIoTEndpoint', e.g. 'prefix.iot.us-east-1.amazonaws.com'
    region: 'us-east-1' // 'YourAwsRegion', e.g. 'us-east-1'
  }
  const ridesTopic = 'serverless-zoo-rides'

  export default {
    name: 'IoT',
    data () {
      return {
        init: false
      }
    },
    mounted: function () {
      console.log('IoT mounted')

      const _store = this.$store

      const clientId = 'serverless-zoo-client-' + (Math.floor((Math.random() * 100000) + 1))
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
              console.log('CREDS:', data)
              if (!err) {
                mqttClient.updateWebSocketCredentials(data.Credentials.AccessKeyId,
                  data.Credentials.SecretKey,
                  data.Credentials.SessionToken)
              // } else {
              //   console.log('error retrieving credentials: ' + err)
              }
            })
          } else {
            console.log('error retrieving identity:' + err)
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

      mqttClient.on('connect', function () {
        console.log('mqttClient connected')
        mqttClient.subscribe(ridesTopic)
        mqttClient.subscribe('parkAlert')
      })

      mqttClient.on('error', function (err) {
        console.log('mqttClient error:', err)
        getCreds()
      })

      mqttClient.on('message', function (topic, payload) {
        console.log(payload.toString())
        const msg = JSON.parse(payload.toString())
        console.log('IoT::onMessage: ', msg)
        if (topic === 'parkAlert') _store.commit('setParkAlert', msg)
        // ride updates use the ridesTopic
        if (topic === ridesTopic) _store.commit('updateRideTimes', msg)
      })
    }
  }
</script>