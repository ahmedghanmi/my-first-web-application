import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import{FormGroup, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
 public signupForm !: FormGroup;


  constructor(private formbuilder : FormBuilder, private _http:HttpClient ,private router:Router){}
 ngOnInit():void{

  this.signupForm=this.formbuilder.group({
   fullname:[''],
   email:[''],
   mobile:[''],
   password:[''],


  })

 }
 signup(){
 this._http.post<any>("http://localhost:3000/signupusers",this.signupForm.value)
 .subscribe(res=>{

   alert("signup sucessfully!")
   this.signupForm.reset();
   this.router.navigate(['login']);
 },
 err=>{
  alert("somthing went wrong")
 }
 )

 }
}
