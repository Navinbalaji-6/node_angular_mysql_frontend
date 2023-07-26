import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-studencrud',
  templateUrl: './studencrud.component.html',
  styleUrls: ['./studencrud.component.css']
})
export class StudencrudComponent {

  StudentArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  name: string ="";
  course: string ="";
  fee: string ="";
  currentStudentID = "";

  constructor(private http: HttpClient ) 
  {
    this.getAllStudent();
  }

  ngOnInit(): void {
  }

  getAllStudent() { 
    this.http.get("http://localhost:5000/api/student/").subscribe(
      (resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.StudentArray = resultData.data;
      },
      (error: any) => {
        console.error('An error occurred:', error);
      }
    );
  }


  


  register()
  {
   // this.isLogin = false; 
   // alert("hi");
    let bodyData = {
      "name" : this.name,
      "course" : this.course,
      "fee" : this.fee,
    };

    this.http.post("http://localhost:5000/api/student/add",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Employee Registered Successfully")
        this.getAllStudent();
      //  this.name = '';
      //  this.address = '';
      //  this.mobile  = 0;
    });
  }

  setUpdate(data: any) 
  {
   this.name = data.name;
   this.course = data.course;
   this.fee = data.fee;
  

   this.currentStudentID = data.id;
 
  }

  UpdateRecords()
  {
    let bodyData = 
    {
      "name" : this.name,
      "course" : this.course,
      "fee" : this.fee
    };
    
    this.http.put("http://localhost:5000/api/student/update"+ "/"+ this.currentStudentID,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Registered Updated")
        this.getAllStudent();
      
    });
  }
 
  save()
  {
    if(this.currentStudentID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }       

  }


  setDelete(data: any)
  {
    this.http.delete("http://localhost:5000/api/student/delete"+ "/"+ data.id).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Deleted")
        this.getAllStudent();
    });
  }
}