import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MaterialModule } from './libraries/angular-material';
import { NoteEditorComponent } from './components/note-editor/note-editor.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ConfirmDialogModule } from './shared/components/confirm-dialog';
import { FindNoteComponent } from './components/find-note/find-note.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ComingSoonNoteModule } from './shared/components/coming-soon-note';
import { SmallLayoutComponent } from './layouts/small-layout/small-layout.component';
import { MediumLayoutComponent } from './layouts/medium-layout/medium-layout.component';
import { NoteViewComponent } from './components/note-view/note-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NoteEditorComponent,
    FindNoteComponent,
    SettingsComponent,
    SmallLayoutComponent,
    MediumLayoutComponent,
    NoteViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    ConfirmDialogModule,
    ReactiveFormsModule,
    ComingSoonNoteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
