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
    galleryURL: ''
  },
  // STATIC - You don't need to modify anything below this comment.
  images: {
    parkMapURL: 'https://d1sjoqff4xix7z.cloudfront.net/images/theme-park-map.jpg'
  },
  icons: {
    restroom: 'https://d1sjoqff4xix7z.cloudfront.net/icons/generic/002-unisex-symbol.png',
    dining: 'https://d1sjoqff4xix7z.cloudfront.net/icons/generic/073-wine-glasses.png',
    atm: 'https://d1sjoqff4xix7z.cloudfront.net/icons/generic/078-dollar-bill.png',
    shopping: 'https://d1sjoqff4xix7z.cloudfront.net/icons/generic/072-shopper-with-bags.png'
  }
}
