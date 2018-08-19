import { NgModule } from '@angular/core';
import { RouterModule,Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { AboutComponent } from "./components/about/about.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { TodoEditComponent } from "./components/todo-edit/todo-edit.component";
import { TodoAddComponent } from "./components/todo-add/todo-add.component";

const routes: Routes =[
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'todo/:id', component: TodoEditComponent },
  { path: 'todo-add', component: TodoAddComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule {
}
