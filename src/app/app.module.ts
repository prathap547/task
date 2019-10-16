import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import {
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatPaginatorModule,
  MatCheckboxModule,
  MatSelectModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule 
  } from '@angular/material';

import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryService } from './in-memory.service';


import { AppComponent } from './app.component';
import { TodoListComponent, DialogAddTodo } from './todo-list/todo-list.component';

import { TodoService } from './todo.service';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  imports:      [ BrowserModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule,

  MatDatepickerModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatPaginatorModule,
  MatCheckboxModule,
  MatSelectModule,
  MatDialogModule,
  MatNativeDateModule ,
  AngularFontAwesomeModule,
  HttpModule,
  HttpClientModule,
  HttpClientInMemoryWebApiModule.forRoot(InMemoryService)
    ],
  declarations: [ AppComponent, TodoListComponent, DialogAddTodo ],
  bootstrap:    [ AppComponent ],
  entryComponents: [DialogAddTodo],
  providers: [TodoService, HttpErrorHandler, MessageService]
  
})
export class AppModule { }
