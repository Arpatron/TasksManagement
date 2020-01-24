import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { TaskService } from 'src/app/core/services/task.service';
import { User } from 'src/app/core/models/user';
import { Task, AddTaskRequest } from 'src/app/core/models/task';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {

  constructor(
    private _userService: UserService,
    private _taskService: TaskService
  ) { }

  private user: User;
  description: string;

  ngOnInit() {
    this.user = this._userService.getStoredUser();
  }

  save(){
    let request: AddTaskRequest = {
      description: this.description,
      idUser: this.user.id
    }
    this._taskService.postNewTask(request).subscribe(data => {
      this.description = '';
    });
  }
}
