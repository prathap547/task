import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent, MatPaginator } from '@angular/material';
import { TodoService } from '../todo.service';
import { ITodo } from './todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, AfterViewInit {

  constructor(public dialog: MatDialog, private todoService: TodoService) {
  }

  dataLength: any = TodoData.length;
  newDataID: any;
  dataValue: any;
  TodoDataDb: ITodo[];


  // initialize pagination
  length = 5;
  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 100];
  pageEvent: PageEvent;
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.getTodo();
  }

  getTodo(): void {
    this.todoService.getTodo()
      .subscribe(
        TodoDataDb => {
          this.TodoDataDb = TodoDataDb;
          this.dataSource = new MatTableDataSource(this.TodoDataDb);
        }
      );
  }

  ngAfterViewInit() {
    this.getTodo();
    // this.dataSource = new MatTableDataSource(this.TodoDataDb);
    // this.dataSource.paginator = this.paginator;

  }


  actionEdit(data) {
    alert(TodoData[data - 1].todo);
  }

  actionDelete(data) {
    // find the ID in the data
    const posData = TodoData.map(pos => pos.id).indexOf(data);
    TodoData.splice(posData, 1)
    alert(posData);
    this.reloadData();
  }

  openDialog(data): void {
    let currentID = data - 1;

    this.newDataID = Math.max.apply(Math, TodoData.map(newID => newID.id));

    if (!data) {
      this.dataValue = { id: this.newDataID + 1, todo: '', level: 1, date: new Date() }
    } else {
      this.dataValue = TodoData[currentID];
    }

    let dialogRef = this.dialog.open(DialogAddTodo, {
      width: '300px',
      height: '300px',
      data: this.dataValue
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (!data) {
          TodoData.push(result);
          this.TodoDataDb = TodoData;
          this.dataSource = new MatTableDataSource(this.TodoDataDb);
        } else {
          TodoData[currentID].todo = result.todo;
        }
      }
      // reinitialize table and paginator
      this.reloadData();
    });
  }


  reloadData() {
    this.dataSource = new MatTableDataSource(this.TodoDataDb);
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns = ['id', 'todo', 'date', 'action'];
  dataSource = new MatTableDataSource(this.TodoDataDb);

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'DialogAddTodo.html',
})
export class DialogAddTodo {

  constructor(
    public dialogRef: MatDialogRef<DialogAddTodo>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


var TodoData: ITodo[] = [
  { id: 1, todo: 'Todo-List-1', date: new Date() },
  { id: 2, todo: 'Todo-List-2', date: new Date() },
  { id: 3, todo: 'Todo-List-3', date: new Date() }
];

