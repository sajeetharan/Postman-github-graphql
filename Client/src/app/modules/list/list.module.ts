import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {path: '', component:ListComponent}
]

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  providers:[
    
  ]
})
export class ListModule { }
