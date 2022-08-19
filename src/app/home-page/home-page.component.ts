import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { map } from 'rxjs/operators';
import { PostService,Authfetch, AuthLike } from '../post.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  like_counter:AuthLike;
  like:number;
  last_like:AuthLike;
  counter:number = 0;
  user_id : {id:string};
  loadedPost: Authfetch[]=[];
  loadedLike:AuthLike[] = [];
  createPost = false; 
  constructor(private post:PostService,
              private route_user:ActivatedRoute) { }

  ngOnInit(){
    this.user_id = {
      id:this.route_user.snapshot.params['id']
    };
    
    
    


    
  }

  ngDoCheck(){
    this.post.fetchLike().pipe(map(resdata=>{
      const postArray:AuthLike[] = [];
      for(const key in resdata){
        if(resdata.hasOwnProperty(key)){
          postArray.push({ ...resdata[key]});
        }
      }
      return postArray;  
    })).subscribe(post=>{
      console.log(post);
      this.loadedLike = post;
      this.last_like = this.loadedLike[this.loadedLike.length-1];
      this.like = this.last_like.like;
    });


    this.post.fetchdata().pipe(map(resdata=>{
      const postArray:Authfetch[] = [];
      for(const key in resdata){
        if(resdata.hasOwnProperty(key)){
          postArray.push({ ...resdata[key],key});
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

  likedButton(){
    this.counter = this.counter + 1;
    this.like_counter = {like:this.counter,id:this.user_id.id}
    this.post.postLike(this.like_counter).subscribe(resdata=>{
      console.log(resdata);
    })
  }

}
