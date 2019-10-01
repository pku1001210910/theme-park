/*

  Welcome Workshopper!
  This is the application configuration file.

  This is the ONLY file you need to modify in the front-end application.
  Each section is separated by MODULE # for you to modify.

*/
export const appConfig = {
  // MODULE 2- BACKEND
  api: {
    locationsURL: ''
  },
  // MODULE 3 - REALTIME
  iot: {
    poolId: '', // 'YourCognitoIdentityPoolId'
    host: '', // 'YourAwsIoTEndpoint', e.g. 'prefix.iot.us-east-1.amazonaws.com'
    region: 'us-west-2' // 'YourAwsRegion', e.g. 'us-east-1'
  },
  initApi: {
    url: ''
  },
  // MODULE 4 - PHOTOS
  photos: {
    uploadURL: '',
    galleryURL: '',
    finalBucketName: ''
  },
  // STATIC - You don't need to modify anything below this comment.
  images: {
    parkMapURL: 'https://d15l97sovqpx31.cloudfront.net/images/theme-park-map-large.jpg',
    logoURL: 'https://d15l97sovqpx31.cloudfront.net/images/theme-park-logo-150.png'
  },
  icons: {
    restroom: 'https://d15l97sovqpx31.cloudfront.net/icons/icon-restroom.png',
    dining: 'https://d15l97sovqpx31.cloudfront.net/icons/icon-dining.png',
    atm: 'https://d15l97sovqpx31.cloudfront.net/icons/icon-atm.png'
  }
}
