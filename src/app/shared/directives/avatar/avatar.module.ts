import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarDirective } from './avatar.directive';

@NgModule({
  declarations: [
    AvatarDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AvatarDirective
  ]
})
export class AvatarModule { }
