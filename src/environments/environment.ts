// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: 'AIzaSyAZ4Oes2AnSQoq9IbMzIxsWzVn7b0YxKLM',
    authDomain: 'tu-tienda-9994c.firebaseapp.com',
    projectId: 'tu-tienda-9994c',
    storageBucket: 'tu-tienda-9994c.appspot.com',
    messagingSenderId: '855265724547',
    appId: '1:855265724547:web:82424df37c05569d6173b6',
    measurementId: 'G-QQ0BMQZXJL'
  },

  WS_PATH: 'http://localhost:8080/tienda/rs/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
