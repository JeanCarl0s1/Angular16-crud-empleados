import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  employeeArray : any[] = [];
  currentStudentID = "";
  name: string ="";
  identification: string ="";
  charge: string ="";
  phone: string ="";
  salary: string ="";
  
  constructor(private http: HttpClient ) 
  {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.http.get("http://localhost:3000/empleados")
    .subscribe((resultData: any)=>
    {
       
        console.log(resultData);
        this.employeeArray = resultData;
    });
  }


  setUpdate(data: any) 
  {
   this.name = data.nombre;
   this.identification = data.identificacion;
   this.charge = data.cargo;
   this.phone = data.telefono;
   this.salary = data.salario;
   this.currentStudentID = data._id;
  }


  UpdateRecords()
  {
    let bodyData = {
      "nombre" : this.name,
      "identificacion" : this.identification,
      "cargo" : this.charge,
      "telefono" : this.phone,
      "salario" : this.salary
    };
    
    this.http.put("http://localhost:3000/empleados"+ "/"+this.currentStudentID,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Empleado actualizado")
        this.getAllEmployees();
      
    });
  }
  
  setDelete(data: any) {
    this.http.delete("http://localhost:3000/empleados"+ "/"+ data._id).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Empleado eliminado")
        this.getAllEmployees();
   
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
register()
  {
    let bodyData = {
      "nombre" : this.name,
      "identificacion" : this.identification,
      "cargo" : this.charge,
      "telefono" : this.phone,
      "salario" : this.salary
    };

    this.http.post("http://localhost:3000/empleados",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Empleado registrado")
         //this.getAllEmployee();
        this.name = '';
        this.identification = '';
        this.charge  = '';
        this.phone ='';
        this.salary = '';
        this.getAllEmployees();
    });
  }
}
