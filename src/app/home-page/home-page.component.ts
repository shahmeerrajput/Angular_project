import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params} from '@angular/router';
import { map } from 'rxjs/operators';
import { PostService,Authfetch, AuthLike } from '../post.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  user_id : {id:string};
  loadedPost: Authfetch[]=[];
  
  createPost = false; 
  constructor(private post:PostService,
              private route_user:ActivatedRoute) { }

  ngOnInit(){
    this.fetchPost();
  }
  createpost(){
    this.createPost = !this.createPost;
  }
  onSubmit(form:NgForm){
    const value = form.value;
    this.post.postRequest(value).subscribe(resData => {
      console.log(resData);
      this.fetchPost();
      });
  }
  
  fetchPost(){
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
  fetchid(){
    this.user_id = {
      id:this.route_user.snapshot.params['id']
    };
    this.route_user.params.subscribe((params:Params)=>{
      this.user_id.id=params['id'];
    });
  }
}
