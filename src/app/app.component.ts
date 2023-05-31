import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { TaskApiservice } from './app.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  taskData: any = [];
  completedTask: any = [];
  unCompletedTask: any = [];
  constructor(private testApi: TaskApiservice) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.testApi.getPublicApi().subscribe((res) => {
      if (res) {
        console.log(res);
        this.taskData = res;
        this.taskData.map((ins: any) => {
          if (ins.completed == true) {
            this.completedTask.push(ins);
          } else {
            this.unCompletedTask.push(ins);
          }
        });
      }
    });
  }
  getUserCheck(e: any, item: any) {
    if (e.target.checked == true) {
      this.unCompletedTask.map((ins: any) => {
        if (ins.title == item) {
          ins.completed = true;

          alert('task is completed');
          this.unCompletedTask.splice(ins, 1);
          this.completedTask.push(ins);
        }
      });

      //   this.completedTask = this.completedTask.reverse();
    }
    console.log('test', this.unCompletedTask);
    console.log('test2', this.completedTask);
  }
}
