import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthLike, PostService } from '../post.service';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent implements OnInit {
  loadedLike:AuthLike[] = [];
  user_id : {id:string};
  like_counter:AuthLike;
  counter:number = 0;
  like_counters:{like:number};
  like:number;

  constructor(private post:PostService,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.user_id = {
      id:this.route.snapshot.params['id']
    };
    this.fetchLike();
  }
  likedButton(){
    this.counter = this.counter + 1;
    this.like_counter = {like:this.counter,id:this.user_id.id}
    this.like_counters = {like:this.counter}
    this.post.postLike(this.like_counter).subscribe(resdata=>{
    console.log(resdata);
    this.fetchLike();});
  }


  fetchLike(){
    this.post.fetchLike().pipe(map(resdata=>{
      const postArray:AuthLike[] = [];
      for(const key in resdata){
        if(resdata.hasOwnProperty(key)){
          postArray.push({ ...resdata[key]});
        }
      }
      return postArray;  
    })).subscribe(post=>{
      this.loadedLike = post;
    });
  }
  fetchid(){
    this.user_id = {
      id:this.route.snapshot.params['id']
    };
    this.route.params.subscribe((params:Params)=>{
      this.user_id.id=params['id'];
    });
  }
}
