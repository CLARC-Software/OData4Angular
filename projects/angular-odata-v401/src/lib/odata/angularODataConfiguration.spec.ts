import { HttpResponse, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AngularOdataV401Module } from '../angular-odata-v401.module';
import { ODataConfiguration, ODataServiceFactory } from '.';
import { IEmployee } from './helpers/employee';

import { HttpResponseEmployeeBuilder } from './helpers/httpResponseEmployeeBuilder';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ODataConfiguration', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ODataConfiguration,
                ODataServiceFactory,
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting()
            ],
            imports: [
                AngularOdataV401Module.forRoot()
            ]
        });
    });

    it('baseUrl', () => {
        // Assign
        const config = new ODataConfiguration();
        config.baseUrl = 'http://test.org/odata';

        // Act and Assert
        expect(config.baseUrl).toBe('http://test.org/odata');
    });

    it('baseUrl_baseUrlWithEndingSlash', () => {
        // Assign
        const config = new ODataConfiguration();
        config.baseUrl = 'http://test.org/odata/';

        // Act and Assert
        expect(config.baseUrl).toBe('http://test.org/odata');
    });

    it('baseUrl_baseUrlWithEndingSlashes', () => {
        // Assign
        const config = new ODataConfiguration();
        config.baseUrl = 'http://test.org/odata//';

        // Act and Assert
        expect(config.baseUrl).toBe('http://test.org/odata');
    });

    it('getEntitiesUri', () => {
        // Assign
        const config = new ODataConfiguration();
        config.baseUrl = 'http://test.org/odata';

        // Act
        const result = config.getEntitiesUri('Employees');

        // Assert
        expect(result).toBe('http://test.org/odata/Employees');
    });

    it('getEntitiesUri_typeNameWithEndingSlash', () => {
        // Assign
        const config = new ODataConfiguration();
        config.baseUrl = 'http://test.org/odata';

        // Act
        const result = config.getEntitiesUri('Employees/');

        // Assert
        expect(result).toBe('http://test.org/odata/Employees');
    });

    it('getEntitiesUri_typeNameWithStartingSlash', () => {
        // Assign
        const config = new ODataConfiguration();
        config.baseUrl = 'http://test.org/odata//';

        // Act
        const result = config.getEntitiesUri('/Employees');

        // Assert
        expect(result).toBe('http://test.org/odata/Employees');
    });

    it('getEntitiesUri_emptyTypeName', () => {
        // Assign
        const config = new ODataConfiguration();
        config.baseUrl = 'http://test.org/odata';

        // Act
        const result = config.getEntitiesUri('');

        // Assert
        expect(result).toBe('http://test.org/odata');
    });

    it('getEntityUri_number', () => {
        // Assign
        const config = new ODataConfiguration();
        config.baseUrl = 'http://test.org/odata';

        // Act
        const result = config.getEntityUri(123, 'Employees');

        // Assert
        expect(result).toBe('http://test.org/odata/Employees(123)');
    });

    it('getEntityUri_string', () => {
        // Assign
        const config = new ODataConfiguration();
        config.baseUrl = 'http://test.org/odata';

        // Act
        const result = config.getEntityUri('abc', 'Employees');

        // Assert
        expect(result).toBe('http://test.org/odata/Employees(\'abc\')');
    });

    it('getEntityUri_guid', () => {
        // Assign
        const config = new ODataConfiguration();
        config.baseUrl = 'http://test.org/odata';

        // Act
        const result = config.getEntityUri('311807af-9d88-470b-8628-f1e42350c158', 'Employees');

        // Assert
        expect(result).toBe('http://test.org/odata/Employees(311807af-9d88-470b-8628-f1e42350c158)');
    });

    it('extractQueryResultDataAsNumber', () => {
        // Assign
        const httpResponse = new HttpResponse<number>({
            body: 3,
            status: 200
        });

        // Act
        const config = new ODataConfiguration();
        const result: number = config.extractQueryResultDataAsNumber(httpResponse);

        // Assert
        expect(result).toBe(3);
    });

    it('extractQueryResultData', () => {
        // Assign
        const httpResponse = new HttpResponseEmployeeBuilder()
            .withODataCount(3)
            .build();

        // Act
        const config = new ODataConfiguration();
        const results = config.extractQueryResultData<IEmployee>(httpResponse);

        // Assert
        expect(results.length).toBe(2);
    });

    it('extractQueryResultDataWithCount', () => {
        // Assign
        const httpResponse = new HttpResponseEmployeeBuilder()
            .withODataCount(3)
            .build();

        // Act
        const config = new ODataConfiguration();
        const pagedResult = config.extractQueryResultDataWithCount<IEmployee>(httpResponse);

        // Assert
        expect(pagedResult.count).toBe(3);
        expect(pagedResult.data.length).toBe(2);
    });

    it('extractQueryResultDataWithCount (@odata.count is missing)', () => {
        // Assign
        const httpResponse = new HttpResponseEmployeeBuilder()
            .removeODataCount()
            .build();

        // Act
        const config = new ODataConfiguration();
        const pagedResult = config.extractQueryResultDataWithCount<IEmployee>(httpResponse);

        // Assert
        expect(pagedResult.count).toBe(2);
        expect(pagedResult.data.length).toBe(2); 
    });

    it('extractQueryResultDataWithCount (@odata.count is invalid)', () => {
        // Assign
        const httpResponse = new HttpResponseEmployeeBuilder()
            .withODataCount('xyz')
            .build();

        // Act
        const config = new ODataConfiguration();
        const pagedResult = config.extractQueryResultDataWithCount<IEmployee>(httpResponse);

        // Assert
        expect(pagedResult.count).toBe(2);
        expect(pagedResult.data.length).toBe(2);
    });

    it('extractQueryResultDataWithCount with @odata.nextLink', () => {
        // Assign
        const httpResponse = new HttpResponseEmployeeBuilder()
            .withODataNextLink('xyz')
            .build();

        // Act
        const config = new ODataConfiguration();
        const pagedResult = config.extractQueryResultDataWithCount<IEmployee>(httpResponse);

        // Assert
        expect(pagedResult.nextLink).toBe('xyz');
    });
});
