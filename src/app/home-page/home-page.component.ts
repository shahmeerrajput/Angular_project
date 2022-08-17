import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { PostService,Authfetch } from '../post.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  loadedPost: Authfetch[]=[];
  createPost = false; 
  constructor(private post:PostService,
              private route:Router) { }

  ngOnInit(): void {
    this.post.fetchdata().pipe(map(resdata=>{
      const postArray:Authfetch[] = [];
      for(const key in resdata){
        if(resdata.hasOwnProperty(key)){
          postArray.push({ ...resdata[key]});
        }
      }
      return postArray;  
    })).subscribe(post=>{
      console.log(post)
      this.loadedPost = post;
    });
  }

  createpost(){
    this.createPost = !this.createPost;
  }

  onSubmit(form:NgForm){
    const value = form.value;
    this.post.postRequest(value).subscribe(resData => {
      console.log(resData)});
  }

  createLike(){

  }

  createComment(){
    this.route.navigate(['/comment']);
  }

}
