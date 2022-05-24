import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../../abstracts/interfaces/todos.interface';
import { NavController, SpinnerTypes } from '@ionic/angular';
import { TodosDataBroker } from '../../abstracts/interfaces/todos-data-broker';
import { TodosDataBrokerServiceToken, TodosDataBrokerConfig } from '../../abstracts/interfaces/todos-data-broker-config.interface';
import { Inject } from '@angular/core';
import { DataContextUiLoaderComponent, LOADER_STATE } from 'vicky-ionic-ng-lib';
import { ID } from 'app-base-lib';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.page.html',
  styleUrls: ['./todo-view.page.scss'],
})
export class TodoViewPage implements OnInit {

  loaderInitialData:Todo;

  todo!:Todo;

  config!: TodosDataBrokerConfig;

  /**
   * Stores the title of the page
   */
  public pageTitle!:string;

  /**
   * Determines if the page title should be shown
   */
  public showTitle!:boolean;
  
  @ViewChild(DataContextUiLoaderComponent,{static:true})
  private dataContextUILoaderComponent!:DataContextUiLoaderComponent;

  public spinnerType!: SpinnerTypes;

  private streamFunction:DataContextUILoaderStreamFunction;

  loaderState:LOADER_STATE;

  idConfig:DataCtxUILoaderIDConfig;

  constructor( @Inject(TodosDataBrokerServiceToken)
  private todosDataBroker:TodosDataBroker,private router:Router,private activatedRoute: ActivatedRoute,private navCtrl:NavController) {
    this.config = this.todosDataBroker.getConfig();

    this.loaderInitialData = this.router.getCurrentNavigation()?.extras?.state?.todo;
  }

  ngOnInit() {

    this.streamFunction = ( id:ID )=>{
      -;
    };

    this.spinnerType = this.config.ui.general.spinner.type || 'bubbles';
  }

  onDataChange( ev:DataCtxUILoaderDataChangeEvent<Todo> ){
    this.todo = ev.data;
  }

  /**Method creates a new todo. The logic is gotten from the data broker */
  onLoaderStateChange(state: LOADER_STATE){
    console.log(s + ' as ' + state)
  }

  onFatalError(){

    // show exit error toast
    this.todosDataBroker.showToast({
      message: this.config.ui.pages.todosViewsPage.behavior.exit?.crash?.message || 'Oops something went wrong. Please try again'
    });

    this.navCtrl.pop();
  }
}