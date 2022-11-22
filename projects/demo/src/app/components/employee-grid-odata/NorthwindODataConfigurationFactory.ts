import { HttpHeaders, HttpParams } from '@angular/common/http';

import { ODataConfiguration } from 'angular-odata-v401';

export const NorthwindODataConfigurationFactory = (): ODataConfiguration =>{
  const config = new ODataConfiguration();
      config.baseUrl = 'https://odatateststef.azurewebsites.net/odata';

      // Set some new `customRequestOptions` here as an example
      config.customRequestOptions.headers = new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8',
          'Session': '123'
      });
      config.defaultRequestOptions.params = new HttpParams().set('Test1234','TestVal');

      return config;
}

/*export class NorthwindODataConfigurationFactory {

  constructor() {
      const config = new ODataConfiguration();
      config.baseUrl = 'https://odatateststef.azurewebsites.net/odata';

      // Set some new `customRequestOptions` here as an example
      config.customRequestOptions.headers = new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8',
          'Session': '123'
      });
      config.defaultRequestOptions.params = new HttpParams().set('Test1234','TestVal');

      return config;
  }
}*/