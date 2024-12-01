import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './domains/shared/components/layout/layout.component';
import {UsersComponent} from './domains/users/page/users/users.component';
import { NotFoundComponent } from './domains/info/page/not-found/not-found.component';
import { ListTreeComponent } from './domains/inventary/page/list-tree/list-tree.component';
import { AddTreeComponent } from './domains/inventary/page/add-tree/add-tree.component';
import { EditComponent } from './domains/inventary/page/edit/edit.component';

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
      },
      {
        path: 'addTree',
        component: AddTreeComponent,
      },
      {
        path: 'editTree/:id',
        component: EditComponent,
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
