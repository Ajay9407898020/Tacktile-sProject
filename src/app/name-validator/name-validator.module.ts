import { NameValidatorDirective } from './name-validators.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    NameValidatorDirective
  ],
  imports: [
    CommonModule
  ],
  exports : [
    NameValidatorDirective
  ]
})
export class NameValidatorModule { }
