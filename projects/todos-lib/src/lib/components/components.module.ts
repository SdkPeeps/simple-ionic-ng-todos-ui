import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TodosItemComponent } from './todos-item/todos-item.component';
import { TodosListComponent } from './todos-list/todos-list.component';
import { StatusComponent } from './status/status.component';
import { TodoStatusComponent } from './todo-status/todo-status.component';


@NgModule({
  declarations: [
    TodosItemComponent,
    TodosListComponent,
    StatusComponent,
    TodoStatusComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [TodosItemComponent,
    TodosListComponent]
})
export class ComponentsModule {
}
