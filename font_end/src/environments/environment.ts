// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  //apiUrl: 'https://iis-uat2.scb.com.vn/barcode_api_phase2/api'
  // apiUrl: 'https://iis-uat2.scb.com.vn/rcm_api/api/v1'
  apiUrl: 'https://localhost:5001/api'
  //apiUrl: 'https://iis1-vhud.scb.com.vn/barcode_phase2_api/api'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
