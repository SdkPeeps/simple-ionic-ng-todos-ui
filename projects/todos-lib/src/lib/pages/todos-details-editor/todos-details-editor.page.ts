import { Input} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { CRUD, EDITOR_CRUD_MODE, RESULT } from 'app-base-lib';
import { Todo } from '../../abstracts/interfaces/todos.interface';
import { TodosDataBrokerConfig, TodosDataBrokerServiceToken } from '../../abstracts/interfaces/todos-data-broker-config.interface';
import { TodosDataBroker } from '../../abstracts/interfaces/todos-data-broker';
import { Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { PAGE_SECTION_POSITION } from 'vicky-ionic-ng-lib';
import { TodosService } from '../../todos.service';


@Component({
  selector: 'todos-ui-todos-details-editor',
  templateUrl: './todos-details-editor.page.html',
  styleUrls: ['./todos-details-editor.page.scss'],
})
export class TodosDetailsEditorPage implements OnInit {

  @Input()
  private mode !: EDITOR_CRUD_MODE;

  /**
   *  Accessing the configuration of the library
   */
  private config!: TodosDataBrokerConfig;

  /**
   * Properties decorated with @Input are to be passed by the users detailed documentation can be find in the @config file
   */

  /**
   * btnPosition property sets where the main button would be placed
   * */
  @Input() btnPosition!: PAGE_SECTION_POSITION;
  /**  Property that stores the label of add button */
  @Input() addBtnText!: string;
    //Property that stores the label of Back button
  @Input() editBtnText!: string;

  get btnText(){
    return this.mode == CRUD.CREATE ? this.addBtnText : this.editBtnText;
  }

  //Property that stores the label of Confirm button
  @Input() confirmBtnText!: string;
  //Property that stores the page title
  @Input() pageTitle!: string;
  //Property that stores a boolean value for showing or hiding the title
  @Input() showTitle!: boolean;
  //Property that stores the validation message shown if the input field is empty
  @Input() validationMsg1!: string;
  //Property that stores the validation message shown if the url entered is not a valid number
  @Input() validationMsg2!: string;

  todoForm!: FormGroup;
  //Property that stores the results fetched from an api
  result!:Todo;

  stage:0|1 = 0;

// getting the availble position for the button. It can either be in the footer or the main page
  position = PAGE_SECTION_POSITION


  constructor(@Inject(TodosDataBrokerServiceToken) private todosDataBroker:TodosDataBroker,public modalCtlr: ModalController,
  private loadingCtrl: LoadingController,
  private formBuilder: FormBuilder) {

  }

   ngOnInit() {
     //Getting the config that stores the value of properties available in this page on page load
     this.config = this.todosDataBroker.getConfig();

    /**
     * The following properties would used the fallbacks if they are not set
     */
    //Assigning a value as the page title. The value is gotten through @Input() or the config file
    this.pageTitle = this.pageTitle || this.config.ui.pages.todosDetailEditor.title.label;

    //Assigning a value to the back btn label. The value is gotten through @Input() or the config file. If no value is set, it will use the fallback label 'Back'
    this.addBtnText = this.addBtnText || this.config.ui.pages.todosDetailEditor.buttons.main.backLabel || 'add';
    //Assigning a value to the back btn label. The value is gotten through @Input() or the config file. If no value is set, it will use the fallback label 'Back'
    this.editBtnText = this.editBtnText || this.config.ui.pages.todosDetailEditor.buttons.main.backLabel || 'edit';
    //Assigning a value to the confirm btn label. The value is gotten through @Input() or the config file. If no value is set, it will use the fallback label 'Confirm'
    this.confirmBtnText = this.confirmBtnText || this.config.ui.pages.todosDetailEditor.buttons.main.confirmLabel || 'confirm';
    //Assigning a value that determines if the page title should be shown or not. The value is gotten through @Input() or the config file.
    this.showTitle = this.showTitle || !this.config.ui.pages.todosDetailEditor.title.invisible;

    //Assigning a value that determines the button is shown. The value is gotten through @Input() or the config file. If no value is set, it will be shown in the content
    this.btnPosition = this.btnPosition ||  this.config.ui.general.buttons?.core.sectionPosition || this.position.IN_CONTENT ;

    //Assigning the first validation message. The value is gotten through @Input() or the config file. If no value is set, it will use the fallback
    this.validationMsg1 = this.validationMsg1 || this.config.ui.pages.todosDetailEditor.behavior.urlInfo.requiredValidationMsg || 'Field cannot be empty, please enter a title';

    //Assigning the second validation message. The value is gotten through @Input() or the config file. If no value is set, it will use the fallback
    this.validationMsg2 = this.validationMsg2 || this.config.ui.pages.todosDetailEditor.behavior.urlInfo.patternValidationMsg || 'Invalid URL format! Pls enter a description';


    this.todoForm = this.formBuilder.group({
      //Validating if url format is valid
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  get msg(){
    return this.todoForm.controls;
  }


  //This method performs a progress action when a user add a new url
  async next(){

    const todosConfig = this.config.ui.pages.todos;

    /**
     * The url is stored in a vaiable and would be passed a parameter when a request is made to the API
     */
    const url = this.todoForm.value.url;

    if(!url) return;

    const loading = await this.loadingCtrl.create({
      message: 'Loading url Info..',
      spinner: 'bubbles',
    });

    // Progress loader is shown while result is being fetched
    await loading.present();

  }

  //This method is called when the user need to go back after entering a url
  async back(){
    this.stage = 0;
    this.result = null!;
  }

  // This method is called when a user affirm that the info returned is correct
  async confirm(){
    if(this.stage == 1 ){

      const todo:Todo = this.result;

      if(todo){
        await this.modalCtlr.dismiss({
          reason:'success',
          data:todo,
        } as RESULT<Todo,any>);
      }
    }
  }


  // Method to close the todos editor
  async close(){
    await this.modalCtlr.dismiss({
      reason:'close'
    } as RESULT<Todo,any>);
  }
}
