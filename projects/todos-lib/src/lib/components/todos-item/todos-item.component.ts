import { EventEmitter } from '@angular/core';
import { Component, OnInit, Input, Output } from '@angular/core';
import { Todo } from '../../abstracts/interfaces/todos.interface';

@Component({
  selector: 'todos-ui-todos-item',
  templateUrl: './todos-item.component.html',
  styleUrls: ['./todos-item.component.scss'],
})
export class TodosItemComponent implements OnInit {

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() view = new EventEmitter<any>();
  @Output() actionSheetClicked = new EventEmitter<any>();

  @Input()
  todo!: Todo;
  //Property to confirm if the user has access to delete

  @Input() deletable!: boolean;
  @Input() editable!: boolean;

  constructor() {}

  ngOnInit() {

  }

  deleteFunc(ev: Event) {
    this.delete.emit();
  }
  editFunc(ev: Event) {
    this.edit.emit();
  }
  viewFunc(ev: Event) {
    this.view.emit();
  }
  actionSheetClickedFunc(ev: Event) {
    this.actionSheetClicked.emit();
  }

}
