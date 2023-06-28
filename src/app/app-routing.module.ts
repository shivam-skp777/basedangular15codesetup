import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'un-auth',
  loadChildren: () => import('./unauth/unauth.module')
    .then(m => m.UnauthModule)
},
{
  path: 'auth',
  loadChildren: () => import('./auth/auth.module')
    .then(m => m.AuthModule),
    data:{test:'check'}
},
{path:'', redirectTo:'/un-auth/login', pathMatch:'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
