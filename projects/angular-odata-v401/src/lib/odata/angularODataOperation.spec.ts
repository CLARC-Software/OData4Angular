import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { ODataConfiguration, ODataOperation, ODataServiceFactory } from '.';
import { IEmployee } from './helpers/employee';
import { AngularOdataV401Module } from '../angular-odata-v401.module';

export class ODataOperationTest extends ODataOperation<IEmployee> {
    public Exec(): Observable<Array<IEmployee>> {
        return of(new Array<IEmployee>());
    }

    public GetUrl(): string {
        return 'http://test';
    }
}

describe('ODataOperation', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                HttpClient,
                ODataConfiguration,
                ODataServiceFactory
            ],
            imports: [
                AngularOdataV401Module.forRoot(),
                HttpClientTestingModule
            ]
        });
    });

    it('Expand(string)`1', inject([HttpClient, ODataConfiguration], (http: HttpClient, config: ODataConfiguration) => {
        // Assign
        const test = new ODataOperationTest('Employees', config, http);

        // Act
        test.Expand('x');

        // Assert
        expect(test['_expand']).toEqual(['x']);
    }));

    it('Expand(string)`2', inject([HttpClient, ODataConfiguration], (http: HttpClient, config: ODataConfiguration) => {
        // Assign
        const test = new ODataOperationTest('Employees', config, http);

        // Act
        test.Expand('x, y');

        // Assert
        expect(test['_expand']).toEqual( ['x', 'y']);
    }));

    it('Expand(string[])', inject([HttpClient, ODataConfiguration], (http: HttpClient, config: ODataConfiguration) => {
        // Assign
        const test = new ODataOperationTest('Employees', config, http);

        // Act
        test.Expand(['a', 'b', 'Boss.FirstName']);

        // Assert
        expect(test['_expand']).toEqual(['a', 'b', 'Boss.FirstName']);
    }));

    it('Select(string)', inject([HttpClient, ODataConfiguration], (http: HttpClient, config: ODataConfiguration) => {
        // Assign
        const test = new ODataOperationTest('Employees', config, http);

        // Act
        test.Select('x,y,z');

        // Assert
        expect(test['_select']).toEqual( ['x', 'y', 'z']);
    }));

    it('Select(string[])', inject([HttpClient, ODataConfiguration], (http: HttpClient, config: ODataConfiguration) => {
        // Assign
        const test = new ODataOperationTest('Employees', config, http);

        // Act
        test.Select(['a', 'b']);

        // Assert
        expect(test['_select']).toEqual(['a', 'b']);
    }));
});
