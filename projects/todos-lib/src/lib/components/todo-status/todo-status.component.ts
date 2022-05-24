import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'todos-ui-todo-status',
  templateUrl: './todo-status.component.html',
  styleUrls: ['./todo-status.component.scss']
})
export class TodoStatusComponent implements OnInit {

  @Input()
  todo:Todo;

  constructor() { }

  ngOnInit(): void {
  }

}
