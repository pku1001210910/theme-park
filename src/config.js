/*

  Welcome Workshopper!
  This is the application configuration file.

  This is the ONLY file you need to modify in the front-end application.
  Each section is separated by MODULE # for you to modify.

*/
export const appConfig = {
  // MODULE 2- BACKEND
  api: {
    locationsURL: 'https://ec526y0ru1.execute-api.us-west-2.amazonaws.com/Prod/locations'
  },
  // MODULE 3 - REALTIME
  iot: {
    poolId: 'us-west-2:542ee385-41a9-4031-b18e-82b331b562fd', // 'YourCognitoIdentityPoolId'
    host: 'au33be31eziux-ats.iot.us-west-2.amazonaws.com', // 'YourAwsIoTEndpoint', e.g. 'prefix.iot.us-east-1.amazonaws.com'
    region: 'us-west-2' // 'YourAwsRegion', e.g. 'us-east-1'
  },
  initApi: {
    url: 'https://5uglwghlde.execute-api.us-west-2.amazonaws.com/Prod/waitTimes/'
  },
  // MODULE 4 - PHOTOS
  photos: {
    uploadURL: 'https://77iz7yeqw7.execute-api.us-west-2.amazonaws.com/Prod/',
    galleryURL: 'https://8n85qqtn00.execute-api.us-west-2.amazonaws.com/Prod/photos/'
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
