import { InjectionToken } from '@angular/core';
import { TodosDataBroker } from './todos-data-broker';
import {IonUIDataBrokerConfig,IonUIDataBrokerUIPageConfig} from "vicky-ionic-ng-lib";
import { AppDataBrokerThirdPartyAPIConfig } from 'app-base-lib';

export type URL_META_API_LAYER_CONFIG = AppDataBrokerThirdPartyAPIConfig & {
  service:'api-layer',
};

export type URL_META_RAPID_API_CONFIG = AppDataBrokerThirdPartyAPIConfig & {
  service:'rapid-api',
  apiHost:string;
};

export type TodosDataBrokerConfig = IonUIDataBrokerConfig & {

  ui:{

    general:{
      custom?:{
        defaultFavicon?:string
      }
    },

    /**
     * contains all the properties related to the pages
     */
    pages:{
    /**
     * contains the properties related to the todos page
     */
      todos:IonUIDataBrokerUIPageConfig & {
        reconciliation:{
          intervalSecs:number,
        },
        behavior:{
          todoInfo:{
            progressMsg?:string,
            successMsg?:string
          }
        }

      }
    /**
     * @todosDetailEditor property contains all the properties related to the Todos Details Editor's page it has similar properties as the Todos page
     */
      todosDetailEditor:IonUIDataBrokerUIPageConfig & {

    /**
     * @buttons contains the properties that stores the label for the buttons on the todos-details-page
     */
        buttons:{
          main:{
        /**
         * This property stores the label/text of the button that takes the user to a previous action
         */
            backLabel?:string,
        /**
         * This property stores the label/text of the button that the users click when they need to confirm anything
         */
            confirmLabel?:string,
      /**
         * This property stores the label/text of the button that takes the user to another action
         */
            nextLabel?:string,
          }
        },

        behavior:{
          todoInfo:{
            progressMsg?:string,
            successMsg?:string,
            requiredValidationMsg?:string,
            patternValidationMsg?:string
          }
        }
      }
    },
  },
  /**
   * @thirdParty contains all the properties related to API functionalities of the library
   */
  thirdParty:{
    api:{
      urlMeta:URL_META_RAPID_API_CONFIG|URL_META_API_LAYER_CONFIG,
    },
  }
}

export const TodosDataBrokerServiceToken = new InjectionToken<TodosDataBroker>('TodosDataBrokerService');
