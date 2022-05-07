import { EventEmitter, Inject, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../../abstracts/interfaces/todos.interface';


@Component({
  selector: 'todos-ui-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss']
})
export class TodosListComponent implements OnInit {
  //Property to confirm if the user has access to delete
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() view = new EventEmitter<any>();
  @Output() actionSheetClicked = new EventEmitter<any>();

  @Input()
  deletable!:boolean;

  @Input()
  editable!:boolean;

  @Input()
  todos!: Todo[];

  constructor() { }

  ngOnInit() {
  }

deleteFunc(todo: Todo) {
    this.delete.emit(todo);
  }
  editFunc(todo: Todo) {
    this.edit.emit(todo);
  }
  viewFunc(todo: Todo) {
    this.view.emit(todo);
  }
  actionSheetClickedFunc(todo: Todo) {
    this.actionSheetClicked.emit(todo);
  }

}
