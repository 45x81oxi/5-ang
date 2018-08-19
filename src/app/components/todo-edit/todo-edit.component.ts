import { Component, OnInit } from '@angular/core';
import { TodosService } from "../../services/todos.service";
import { Todo } from "../../models/Todo";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {
  todoId: string;
  todo: Todo;
  isReadOnly = true;

  constructor(
    public todoService: TodosService,
    public activatedRoute: ActivatedRoute,
    public  router: Router,
    public  toastr: ToastrService,
    public  spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    // Get user id
    this.todoId = this.activatedRoute.snapshot.params['id'];
    // Get user data
    this.todoService.getTodo(this.todoId).subscribe((data: Todo) => {
     this.todo = data;
    }, error => {
      this.toastr.error(error.message, 'Error');
    },() => {
      this.spinner.hide();
    });
  }

  onEdit(): void {
    this.isReadOnly = false;
    const updtTodo = Object.assign({}, this.todo);
    this.todoService.updateTodo(updtTodo).subscribe(() => {
      this.toastr.success('Todo successfully edit', 'Message');
      this.router.navigate(['/']);
    }, error => {
      this.toastr.error(error.message, 'Error');
    });
  }

}
