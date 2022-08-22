import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import {HttpClientModule} from '@angular/common/http';
import { HomePageComponent } from './home-page/home-page.component'
import {  RouterModule, Routes } from '@angular/router';
import { CommentComponent } from './comment/comment.component';
import { LikesComponent } from './likes/likes.component';


const appRoutes:Routes =[
  { path:'', component:LoginFormComponent},
  { path:'home',component:HomePageComponent},
  { path:'comment/:id',component:CommentComponent},
  { path:'like/:id',component:LikesComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    HomePageComponent,
    CommentComponent,
    LikesComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
