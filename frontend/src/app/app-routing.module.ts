import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './domains/shared/components/layout/layout.component';
import {UsersComponent} from './domains/users/page/users/users.component';
import { NotFoundComponent } from './domains/info/page/not-found/not-found.component';
import { ListTreeComponent } from './domains/inventary/page/list-tree/list-tree.component';

const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'inventario',
        component: ListTreeComponent,
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
