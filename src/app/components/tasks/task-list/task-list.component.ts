import { Component, OnInit } from '@angular/core';
import { TodoList } from 'src/app/core/models/todo-list';
import { States } from 'src/app/core/models/states.enum';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Task } from 'src/app/core/models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  constructor() { }
  myList: TodoList = new TodoList();
  todo: Task[] = [];
  done: Task[] = [];

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.myList.tasks = [];
    // Here we'll call the service, for now use moked data
    this.mokData();

    // call when the service retrieve data
    this.setUpLists();
  }

  setUpLists() {
    this.todo = this.myList.tasks.filter(x => x.state == States.undone);
    this.done = this.myList.tasks.filter(x => x.state == States.done);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  mokData() {
    this.myList.tasks.push({
      id: 0,
      description: 'Buy food',
      state: States.undone
    });
    this.myList.tasks.push({
      id: 1,
      description: 'Wash dishes',
      state: States.done
    });
    this.myList.tasks.push({
      id: 2,
      description: 'Go to gym',
      state: States.done
    });
    this.myList.tasks.push({
      id: 3,
      description: 'Read for a while',
      state: States.undone
    });
  }
}