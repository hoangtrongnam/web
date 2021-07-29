import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import custom preload strategy
import { CustomPreloadingStrategyService } from '@_services/custom-preloading-strategy.service';

import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from '@/layouts/admin/admin.component';

import { AuthGuard } from './_helpers';
import { RoleComponent } from './pages/manager/role';
import { IndexComponent } from '@/layouts/customer/index/index.component';
import { ProductComponent } from './layouts/customer/manager/product/product.component';

//set preload: true for loading after appModule
const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@/layouts/customer/manager/manager.module').then(m => m.ManagerModule),
      }
    ]
  },
  // {
  //   path: '',
  //   component: AdminComponent,
  //   children: [
  //     {
  //       path: '',
  //       canActivate: [AuthGuard],
  //       loadChildren: () => import('@pages/manager/manager.module').then(m => m.ManagerModule), data: { preload: true }
  //     }
  //   ]
  // },
  // {
  //   path: 'login',
  //   component: LoginComponent
  // },
  
  {
    path: 'product',
    component: ProductComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloadingStrategyService })],
  exports: [RouterModule],
  providers: [CustomPreloadingStrategyService]
})
export class AppRoutingModule { }
