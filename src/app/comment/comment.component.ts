import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { PostService,AuthComment } from '../post.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  Comment_toggle = false;
  loadedPost:AuthComment[] = [];
  user_id : {id:string};
  constructor(private post:PostService,
              private route:ActivatedRoute) { }


  ngOnInit(){
    this.user_id = {
      id:this.route.snapshot.params['id']
    };
    this.post.fetchComment().pipe(map((resdata:{[key:string]: AuthComment})=>{
      const postArray:AuthComment[] = [];
      for(const key in resdata){
        if(resdata.hasOwnProperty(key)){
          postArray.push({...resdata[key]});
        }
      }
      return postArray;  
    })
    ).subscribe(post=>{
      this.loadedPost = post;
    });
  }
  createcomment(){
  this.Comment_toggle = !this.Comment_toggle;
  }
  onSubmit(form:NgForm){
    const comment = form.value.Comment;
    let id = this.user_id.id;
    this.post.postComment({comment,id}).subscribe(resData => {
    console.log(resData)});
  }
}
