// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyC9B7EkZcsS4fZ8FJCiq3FfHQ5QwTgkko8',
    authDomain: 'med-chat-63cf5.firebaseapp.com',
    databaseURL: 'https://med-chat-63cf5.firebaseio.com',
    projectId: 'med-chat-63cf5',
    storageBucket: 'med-chat-63cf5.appspot.com',
    messagingSenderId: '541220649365'
  },
  clinicServer: 'http://localhost:3000'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
