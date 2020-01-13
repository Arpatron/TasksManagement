import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  title: string = 'My TO-DO List';
  user: string;

  ngOnInit() {
    this.setUpData();
  }

  setUpData() {
    // Here we will do the call service, then we'll bind the data
    this.user = 'Admin test';
  }

  logOut() {

  }
}
