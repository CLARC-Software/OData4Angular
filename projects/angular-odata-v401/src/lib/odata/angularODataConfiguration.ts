import { HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ODataMetadataResult } from './angularODataMetadataResult';
import { ODataPagedResult } from './angularODataPagedResult';
import { IODataResponseModel } from './angularODataResponseModel';
import { ODataUtils } from './angularODataUtils';

export class KeyConfigs {
    public filter = '$filter';
    public top = '$top';
    public skip = '$skip';
    public orderBy = '$orderby';
    public select = '$select';
    public search = '$search';
    public expand = '$expand';
    public apply = '$apply';
    public count = '$count';
    public maxPerPage = 'odata.maxpagesize';
    public metadata = 'odata.metadata';
    public responseCount = '@odata.count';
    public responseNextLink = '@odata.nextLink';
}

@Injectable()
export class ODataConfiguration {
    private readonly _postHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    private _baseUrl = 'http://localhost/odata';

    public keys: KeyConfigs = new KeyConfigs();

    public defaultRequestOptions: {
        headers: HttpHeaders;
        observe: 'response';
        params?: HttpParams;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    } = { headers: new HttpHeaders(), observe: 'response' };

    public postRequestOptions: {
        headers: HttpHeaders;
        observe: 'response';
        params?: HttpParams;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    } = { headers: this._postHeaders, observe: 'response' };

    public customRequestOptions: {
        headers: HttpHeaders;
        observe: 'response';
        params?: HttpParams;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    } = { headers: new HttpHeaders(), observe: 'response' };

    set baseUrl(baseUrl: string) {
        this._baseUrl = baseUrl.replace(/\/+$/, '');
    }

    get baseUrl(): string {
        return this._baseUrl;
    }

    public getEntitiesUri(typeName: string): string {
        if (typeName) {
            return `${this.baseUrl}/${this.sanitizeTypeName(typeName)}`;
        }
        return this.baseUrl;
    }

    public getEntityUri(key: any, typeName: string): string {
        return `${this.getEntitiesUri(typeName)}(${ODataUtils.quoteValue(key)})`;
    }

    public handleError(err: any, caught: any): void {
        console.warn('OData error: ', err, caught);
    }

    public extractQueryResultDataAsNumber(res: HttpResponse<number>): number {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }

        return (res && res.body) as number;
    }

    public extractQueryResultData<T>(res: HttpResponse<IODataResponseModel<T>>): T[] {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }

        return (res && res.body && res.body.value) as T[];
    }

    public extractQueryResultDataWithCount<T>(res: HttpResponse<IODataResponseModel<T>>): ODataPagedResult<T> {
        let pagedResult: ODataPagedResult<T>;

        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }

        const body: any = res.body;
        let entities: T[] = body.value;
        delete body.value;
        if(!Array.isArray(entities)){
          entities = [];
        }
        pagedResult = body;
        pagedResult.data = entities;

        const parseResult = ODataUtils.tryParseInt(body[`${this.keys.responseCount}`]);
        if (parseResult.valid) {
            pagedResult.count = parseResult.value;
        } else {
            console.warn('Cannot determine OData entities count. Falling back to collection length.');
            pagedResult.count = entities.length;
        }

        if (body[`${this.keys.responseNextLink}`]) {
            pagedResult.nextLink = body[`${this.keys.responseNextLink}`];
        }

        return pagedResult;
    }

    public extractQueryResultDataWithMetadata<T>(res: HttpResponse<IODataResponseModel<T>>): ODataMetadataResult<T> {
      let result: ODataMetadataResult<T>; 

      if (res.status < 200 || res.status >= 300) {
          throw new Error('Bad response status: ' + res.status);
      }

      const body: any = res.body;
      let entities: T[] = body.value;
      delete body.value;
      if(!Array.isArray(entities)){
        entities = [];
      }
      result = body;
      result.data = entities;

      const parseResult = ODataUtils.tryParseInt(body[`${this.keys.responseCount}`]);
      if (parseResult.valid) {
          result.count = parseResult.value;
      } else {
          console.warn('Cannot determine OData entities count. Falling back to collection length.');
          result.count = entities.length;
      }

      if (body[`${this.keys.responseNextLink}`]) {
          result.nextLink = body[`${this.keys.responseNextLink}`];
      }

      return result;
    }

    private sanitizeTypeName(typeName: string): string {
        return typeName.replace(/\/+$/, '').replace(/^\/+/, '');
    }
}
