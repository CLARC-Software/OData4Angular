import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';



@NgModule({
  declarations: [
  ],
  imports: [ CommonModule
  ],
  exports: [
  ]
})
export class AngularOdataV401Module { 

  public static forRoot(): ModuleWithProviders<AngularOdataV401Module> {
    return {
      ngModule: AngularOdataV401Module
    };
  }

}
