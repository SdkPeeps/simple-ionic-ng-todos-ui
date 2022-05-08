import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../../abstracts/interfaces/todos.interface';
import { NavController, SpinnerTypes } from '@ionic/angular';
import { TodosDataBroker } from '../../abstracts/interfaces/todos-data-broker';
import { TodosDataBrokerServiceToken, TodosDataBrokerConfig } from '../../abstracts/interfaces/todos-data-broker-config.interface';
import { Inject } from '@angular/core';
import { LoaderComponent, LOADER_STATE } from 'vicky-ionic-ng-lib';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.page.html',
  styleUrls: ['./todo-view.page.scss'],
})
export class TodoViewPage implements OnInit {

  todo:Todo;

config!: TodosDataBrokerConfig;

@ViewChild(LoaderComponent,{static:true})
  private loaderComponent!:LoaderComponent;
  public spinnerType!: SpinnerTypes;

  constructor(@Inject(TodosDataBrokerServiceToken)
  private todosDataBroker:TodosDataBroker,private router:Router,private activatedRoute: ActivatedRoute,private navCtrl:NavController) {

      this.config = this.todosDataBroker.getConfig();
    this.todo = this.router.getCurrentNavigation()?.extras.state?.todo;
  }
  shouldRenderUIContent(){
    return !!this.todo;
  }

  ngOnInit() {
    this.spinnerType = this.config.ui.general.spinner.type || 'bubbles';
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if(!this.todo){
          if(!paramMap.has('id')) {
            this.forcedExit(); //
            return;
          }
          const todoId = paramMap.get('id') as string;
          this.todosDataBroker.loadOne({
            id:todoId,
          }).then( (result)=>{
            this.todo = result.data;
          },()=>{
            this.forcedExit();
          } );
        }
      }
    )
  }

   /**Method creates a new todo. The logic is gotten from the data broker */
   onLoaderStateChange(s: any){
    const state = s as unknown as LOADER_STATE;
    console.log(s + ' as ' + state)
}

  forcedExit(){
    // show exit error toast
    this.todosDataBroker.showToast({
      message: this.config.ui.pages.todosViewsPage.behavior.exit?.crash?.message || 'Oops something went wrong. Please try again'
    });

    this.navCtrl.pop();
  }

}
