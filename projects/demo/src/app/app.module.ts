import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AngularOdataV401Module } from 'angular-odata-v401';

import { AppComponent } from './app.component';
import { EmployeeGridODataComponent } from './components/employee-grid-odata/employee-grid-odata.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeGridODataComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,AngularOdataV401Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
