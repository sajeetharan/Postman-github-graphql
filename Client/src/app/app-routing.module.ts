import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'list',
    loadChildren: () =>  
      import('./modules/list/list.module').then(m => m.ListModule)
  },
  {
    path:'details/:id',
    loadChildren: () =>  
      import('./modules/details/details.module').then(m => m.DetailsModule)
  },
  { path: '',   redirectTo: '/list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
