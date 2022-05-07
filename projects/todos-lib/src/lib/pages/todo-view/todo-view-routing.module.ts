import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoViewPage } from './todo-view.page';

const routes: Routes = [
  {
    path: ':todoId',
    component: TodoViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoViewPageRoutingModule {}
