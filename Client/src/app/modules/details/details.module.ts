import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: '', component:DetailsComponent}
]
@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes)
  ]
})
export class DetailsModule { }
