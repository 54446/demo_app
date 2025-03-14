import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomDatePipe } from './custom-date.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, ReactiveFormsModule, CustomDatePipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crudApp';

  tasks: any = [];
  newtask = "";
  editTaskId: string | null = null; 

  APIURL = "http://localhost:8000/"

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.get_tasks();
  }

  get_tasks() {
    this.http.get(this.APIURL + "get_tasks").subscribe((res) => {
      this.tasks = res;
    })
  }

  add_task() {
    let body = new FormData();
    let currentTime = new Date().toLocaleString();
    body.append('task', this.newtask);
    body.append('time', currentTime);
    this.http.post(this.APIURL + "add_task", body).subscribe((res) => {
      this.newtask = "";
      this.get_tasks();
    });
  }

  delete_task(id: string) {
    let body = new FormData();
    body.append('id', id);
    this.http.post(this.APIURL + "delete_task", body).subscribe(() => {
      this.get_tasks();
    });
  } 
  
  edit_task(id: string, task: string) {
    this.editTaskId = id;
    this.newtask = task;
  }

  update_task() {
    if (!this.editTaskId) return;

    let body = new FormData();
    body.append('id', this.editTaskId);
    body.append('task', this.newtask);

    this.http.put(this.APIURL + "update_task", body).subscribe(() => {
      this.editTaskId = null;
      this.newtask = "";
      this.get_tasks();
    });
  }
}

