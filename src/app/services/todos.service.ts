import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Todo } from "../models/Todo";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private apiUrl: string = environment.api_url;

  constructor(
    private http: HttpClient
  ) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}/todos`);
  }

  getTodo(id: string): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}/todos/${id}`);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/todos/${todo.id}`,todo);
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${this.apiUrl}/todos`, todo);
  }

  deleteTodo(id: number): Observable<Object> {
    return this.http.delete<Object>(`${this.apiUrl}/todos/${id}`);
  }
}
