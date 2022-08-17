import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  isLoginMode = true;
  error:string = "";
  constructor(private post:PostService,
              private router:  Router){}

  loginForm: FormGroup;

  ngOnInit(){
    this.loginForm = new FormGroup({
      'email' : new FormControl(null,[Validators.required,Validators.email]),
      'password' : new FormControl(null,[Validators.required,Validators.minLength(8)])
    });
  }

  onSubmit(){
    const { email, password } = this.loginForm.value;
    if(this.isLoginMode){
      this.post.login(email,password).subscribe((resData:any) => {
      console.log(resData.email);
      this.router.navigate(['/home']);
    },(error:any) =>{
    console.log(error);
    this.error = 'An Error Occured';
    });
    }
    else
    {
    this.post.signup(email,password).subscribe(resData => {
      console.log(resData);
      this.router.navigate(['']);
    },error =>{
    console.log(error);
    this.error = 'An Error Occured';
    });
    }
    this.loginForm.reset();
  }
  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

}
