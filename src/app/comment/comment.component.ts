import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { PostService } from '../post.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  Comment = false;
  loadedPost: string[]=[];
  constructor(private post:PostService) { }

  ngOnInit(){
    this.post.fetchComment().pipe(map(resdata=>{
      const postArray: string[] = [];
      for(const index in resdata){
          postArray.push(index);
      }
      return postArray;  
    })).subscribe(post=>{
      console.log(post)
      this.loadedPost = post;
    });
  }
  createcomment(){
  this.Comment = !this.Comment;
  }
  onSubmit(form:NgForm){
    const value = form.value.Comment;
    // this.post.postComment(value).subscribe(resData => {
    //   console.log(resData)});
    console.log(value);
  }
}
