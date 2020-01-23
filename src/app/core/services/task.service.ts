import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task, AddTaskRequest, UpdateTaskRequest } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private urlService: string = 'https://simpletaskmanagerc.azurewebsites.net/Tasks/';
  constructor(private http: HttpClient) { }

  getAllTasks(idUser: string): Observable<Task[]> {
    let url: string = this.urlService + 'getAllTasks/' + idUser;
    return this.http.get<Task[]>(url);
  }

  postNewTask(request: AddTaskRequest): Observable<any>{
    var body = JSON.parse(JSON.stringify(request));
    let url: string = this.urlService + 'addTask';
    return this.http.post<any>(url, body);
  }

  postUpdateTask(request: UpdateTaskRequest): Observable<any>{
    var body = JSON.parse(JSON.stringify(request));
    let url: string = this.urlService + 'updateTask';
    return this.http.post<any>(url, body);
  }
}
