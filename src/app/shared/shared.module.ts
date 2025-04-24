import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';



@NgModule({
  declarations: [
    SideBarComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SideBarComponent,
    NavBarComponent
  ]
})
export class SharedModule { }
