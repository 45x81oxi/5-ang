import { Component, OnInit, ViewChild } from '@angular/core';
import { TodosService } from "../../services/todos.service";
import { Router } from "@angular/router";
import { Todo } from "../../models/Todo";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { NgForm } from "@angular/forms";


@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  todos: Todo[];

  todo: Todo= {
    userId: 1,
    id: 201,
    title: '',
    completed: false
  };

  constructor(
    public todoService: TodosService,
    public router: Router,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.todoService.getTodos().subscribe((data: Todo[]) => {
      this.todos = data;
    }, error => {
      this.toastr.error(error.message, 'Error');
    }, () => {
      this.spinner.hide();
    });
  }


  onAdd(form): void {
    if (form.invalid) return;

    this.spinner.show();
    const newTodo = Object.assign({}, this.todo);
    this.todoService.addTodo(newTodo).subscribe(() => {
      this.todos.unshift(newTodo);
      this.toastr.success('Todo successfully added', 'Message');
      this.router.navigate(['/']);
    }, error => {
      this.toastr.error(error.message, 'Error');
    }, () => {
      this.spinner.hide();
    });
    this.form.resetForm();
  }

}
