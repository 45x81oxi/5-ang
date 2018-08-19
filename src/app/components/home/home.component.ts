import { Component, OnInit } from '@angular/core';
import { TodosService } from "../../services/todos.service";
import { Todo } from "../../models/Todo";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  todos: Todo[];

  constructor(
    public todoService: TodosService,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService
  ) {}

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

  onDelete(id: number): void {
    this.spinner.show();
    if (id) {
      this.todoService.deleteTodo(id).subscribe(() => {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.toastr.success('Todo deleted success', 'Message');
      }, error => {
        this.toastr.error(error.message, 'Error');
      }, () => {
        this.spinner.hide();
      });
    }
  }
}
