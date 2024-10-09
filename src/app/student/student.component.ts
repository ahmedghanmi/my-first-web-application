import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { studentdata } from './student.model';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {

  showadd!: boolean;
  showupdate!: boolean;
  studentmodelobj: studentdata = new studentdata()
  allstudentdata:any;
  formValue!: FormGroup
  api: ApiService; // Correct type

  constructor(private formBuilder: FormBuilder, api: ApiService,private router:Router) {
    this.api = api; // Assign api to the class property
  }
  logout(){
    
    const confirmation=confirm('do you want to logout?');
       if (confirmation){
        
        localStorage.removeItem('token');
        this.router.navigate(['login']);
       
        
 
       }
   }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      Mobile: ['', Validators.required], // Correct field name
      city: ['', Validators.required],
    })
    this.getdata()
   

  }

  add() {
    this.showadd = true;
    this.showupdate = false;
  }

  edit(data:any) {
    this.showadd = false;
    this.showupdate = true;
    this.studentmodelobj.id=data.id;

    this.formValue.controls['name'].setValue(data.name)
    this.formValue.controls['email'].setValue(data.email)
    this.formValue.controls['Mobile'].setValue(data.Mobile)
    this.formValue.controls['city'].setValue(data.city)

  }


  // update student
  update(){

    this.studentmodelobj.name = this.formValue.value.name;
    this.studentmodelobj.email = this.formValue.value.email;
    this.studentmodelobj.Mobile = this.formValue.value.Mobile;
    this.studentmodelobj.city = this.formValue.value.city;

   this.api.updatestudent(this.studentmodelobj,this.studentmodelobj.id).subscribe(res=>{
     
    
    this.formValue.reset();
    this.getdata();
    alert("record update sucessfully!")
   },
   err=>{
    alert("somthing went wrong !!!")
   }
   
   )

  }

  addstudent() {
    this.studentmodelobj.name = this.formValue.value.name;
    this.studentmodelobj.email = this.formValue.value.email;
    this.studentmodelobj.Mobile = this.formValue.value.Mobile;
    this.studentmodelobj.city = this.formValue.value.city;
    this.api.poststudent(this.studentmodelobj).subscribe(res=>{
       console.log(res)
       this.formValue.reset()
       alert("record added sucessfully");
       this.getdata()
    },
    err=>{

       alert("somthing went wrong !!!")


    })
   
  }
  
  
    //get data
    getdata(){
      this.api.getstudent()
      .subscribe(res=>{
       this.allstudentdata= res;
       
      })

    }
    //delete
    deletestudent(data:any){
      if(confirm("are you sure to delete?"))
   this.api.deletestudent(data.id)
   .subscribe(res=>{

    alert("record delete sucessfully!");
    this.getdata();
   })

    }
 

}