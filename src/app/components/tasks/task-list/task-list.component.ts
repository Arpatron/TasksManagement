import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TodoList } from '../../../core/models/todo-list';
import { Task, UpdateTaskRequest } from '../../../core/models/task';
import { UserService } from '../../../core/services/user.service';
import { TaskService } from '../../../core/services/task.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  constructor(
    private _userService: UserService,
    private _taskService: TaskService
  ) { }

  myList: TodoList = new TodoList();
  todo: Task[] = [];
  done: Task[] = [];
  email: string = 'mail@mail.com';
  haveChanges: boolean = false;
  ngOnInit() {
    this.getUser();
  }

  getUser() {
    let user: User = this._userService.getStoredUser();
    if (user == null) {
      this._userService.getUser(this.email).subscribe(user => {
        this._userService.storeUser(user);
        this.getData(user.id);
      });
    }
    else {
      this.getData(user.id);
    }
  }

  getData(idUser: string) {
    this.myList.tasks = [];
    this._taskService.getAllTasks(idUser).subscribe(
      tasks => {
        tasks.forEach(task => {
          this.myList.tasks.push(task);
        });
        this.setUpLists();
      }
    );
  }

  setUpLists() {
    this.todo = this.myList.tasks.filter(x => x.isCompleted == false);
    this.done = this.myList.tasks.filter(x => x.isCompleted == true);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.haveChanges = true;
    }
  }

  save() {
    if (this.haveChanges) {
      let request: UpdateTaskRequest[] = this.setUpRequest();
      this._taskService.postUpdateTasks(request).subscribe(data => {
        this.haveChanges = false;
      });
    }
  }

  setUpRequest(): UpdateTaskRequest[] {
    let request: UpdateTaskRequest[] = [];
    this.todo.forEach(task => {
      request.push({
        idTask: task.id,
        isCompleted: false
      });
    });
    this.done.forEach(task => {
      request.push({
        idTask: task.id,
        isCompleted: true
      });
    });
    return request;
  }
}