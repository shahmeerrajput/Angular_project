import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";


export interface AuthResponseData{
    kind:string,
    idToken:string,
    email: string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?:boolean,
}
export interface Authfetch{
    Image:string,
    title:string,
    Content: string
}

@Injectable({providedIn:"root"})
export class PostService {
    constructor(private http: HttpClient){}
    
    signup(email:string , password:string){
       return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC-eem5g-FGki_Ik7WRvCRJ44d2rbQ8qhE',
        {
            email:email,
            password:password,
            retunSecureToken:true
        });
    }

    login(email:string,password:string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC-eem5g-FGki_Ik7WRvCRJ44d2rbQ8qhE',
            {
                email:email,
                password:password,
                retunSecureToken:true
            });
    }
    postRequest(postData:{image:string; title:string;Content:string;})
    {
        return this.http.post<{name:string}>('https://ng-complete-guide-2ed00-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json'
        ,postData);
    }
    fetchdata(){
        return this.http.get<{[key:string]:Authfetch}>('https://ng-complete-guide-2ed00-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json');
    }

    postComment(Content:string)
    {
        return this.http.post<{name:string}>('https://ng-complete-guide-2ed00-default-rtdb.asia-southeast1.firebasedatabase.app/postscomment.json'
        ,Content);
    }
    fetchComment(){
        return this.http.get<{content:string}>('https://ng-complete-guide-2ed00-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json');
    }
}