import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { TaskListComponent } from './components/tasks/task-list/task-list.component';
import { TaskCreateComponent } from './components/tasks/task-create/task-create.component';

@NgModule({
  declarations: [
    HomeComponent,
    TaskListComponent,
    TaskCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class AppModule { }
