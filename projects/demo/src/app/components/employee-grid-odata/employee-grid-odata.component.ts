import { Component, OnInit } from '@angular/core';
import { ODataConfiguration, ODataExecReturnType, ODataPagedResult, ODataQuery, ODataService, ODataServiceFactory } from 'angular-odata-v401';
import { NorthwindODataConfigurationFactory } from './NorthwindODataConfigurationFactory';
@Component({
  selector: 'app-employee-grid-odata',
  template: `
    <span>count : {{count}}</span>
    <br>
    <span>url : {{url}}</span>
    <br>
    <span>query : {{queryAsJson}}</span>
    <br>
    <span>totalcount : {{totalRecords}}</span>
    <br>
    <span>employees : {{_employees}}</span>
    <table>
      <thead>
        <ng-container *ngFor="let column of columns">
          <th>
            {{column}}
          </th>
        </ng-container>
      </thead>
      <tbody>
        <ng-container *ngFor="let employee of employees">
          <tr>
            <td>
              {{employee.EmployeeID}}
            </td>
            <td>
              {{employee.FirstName}}
            </td>
            <td>
              {{employee.LastName}}
            </td>
            <td>
              {{employee.BirthDate}}
            </td>
            <td>
              {{employee.City}}
            </td>
            <td>
              {{employee.Boss?.FirstName}}
            </td>
          </tr>
        </ng-container>
      </tbody>
    </table>

    
  `,
  providers: [{ provide: ODataConfiguration, useFactory: NorthwindODataConfigurationFactory }, ODataServiceFactory],
  styles: [
  ]
})
export class EmployeeGridODataComponent implements OnInit {
  private query: ODataQuery<any>;

  private odata: ODataService<any>;

  public count: number = 0;

  public totalRecords: number = 0;

  public queryAsJson: string = "";

  public url: string = "";

  public employees: any[] = [];

  public _employees: string = "";

  public columns = ['EmployeeID', 'FirstName', 'LastName', 'BirthDate', 'City', 'FirstName of Boss'];
  constructor(private odataFactory: ODataServiceFactory) {
    this.odata = this.odataFactory.CreateService<any>('Employees');
    this.query = this.odata.Query()
                           //.Expand('Orders')
                           .Select(['EmployeeID', 'FirstName', 'LastName', 'BirthDate', 'City', 'Boss/FirstName']);
    
    this.url = this.query.GetUrl();
    this.query.Exec(ODataExecReturnType.PagedResult)
              .subscribe({next:(pagedResult: ODataPagedResult<any>) => {
                  console.log(pagedResult.data);
                  this.employees = pagedResult.data;
                  this.count = this.employees.length;
                  this.totalRecords = pagedResult.count;
                  this.stringifyEmployees();
              }, error:(error) => {
                  this.employees = [];
                  this.count = 0;
                  this.totalRecords = 0;
                  this.stringifyEmployees();
                  console.log('ODataExecReturnType.PagedResult ERROR ' + error);
              }});

    this.queryAsJson = JSON.stringify(this.query, (key, value) => {
        if (key === 'http') {
            return undefined;
        }
        return value;
    }, 2);

    
  }

  ngOnInit(): void {
  }

  private stringifyEmployees(){
    this._employees = JSON.stringify(this.employees, (key, value) => {
      return value;
    }, 2);
  }

}
