import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './libraries/angular-material';
import { SmallLayoutComponent } from './layouts/small-layout/small-layout.component';
import { NoteComponent } from './components/note/note.component';
import { FroalaEditorModule } from 'angular-froala-wysiwyg';
import { ConfirmDialogModule } from './shared/components/confirm-dialog';
import { FindNoteComponent } from './components/find-note/find-note.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SmallLayoutComponent,
    NoteComponent,
    FindNoteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    FroalaEditorModule.forRoot(),
    ConfirmDialogModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
