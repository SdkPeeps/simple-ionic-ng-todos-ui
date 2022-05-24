import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodoViewPageRoutingModule } from './todo-view-routing.module';

import { TodoViewPage } from './todo-view.page';
import { TodoStatusComponent } from '../../components/todo-status/todo-status.component';
import { DataCtxUILoaderModule } from 'vicky-ionic-ng-lib';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodoViewPageRoutingModule,
    DataCtxUILoaderModule
  ],
  declarations: [TodoViewPage,TodoStatusComponent]
})
export class TodoViewPageModule {}
