import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ImplUIListDataBroker} from "app-base-lib";
import {IonListDataBroker} from "vicky-ionic-ng-lib";
import { Todo } from "../interfaces/todos.interface";
import { TodosDataBroker } from "../interfaces/todos-data-broker";
import { TodosDataBrokerConfig, URL_META_RAPID_API_CONFIG } from '../interfaces/todos-data-broker-config.interface';
import { TodosDataBrokerEvent } from "../interfaces/todos-data-broker-event.interface";
import { LoadingController, ToastController, Platform, AlertController } from '@ionic/angular';
import { map } from "rxjs/operators";
import { TodosDataBrokerSearchConstraint } from "../interfaces/todos-data-broker-search-constraint.interface";

export abstract class ImplTodosDataBroker extends IonListDataBroker<Todo, Todo,TodosDataBrokerSearchConstraint, TodosDataBrokerEvent> implements TodosDataBroker {

  constructor(private platform: Platform,  toastCtrl: ToastController,
    public alertCtrl: AlertController,
    loadingCtrl: LoadingController ,paginationOptions: {
    perPage: number;
    append?: boolean;
  }, fetchOneResultAsLatest: boolean=true){
    super(toastCtrl,loadingCtrl,paginationOptions,'id',fetchOneResultAsLatest);
  }

  abstract override getConfig():TodosDataBrokerConfig;
}
