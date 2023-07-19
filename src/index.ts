///Importing packages and other bodys
import express, { Express, Request, Response, response } from "express";
import * as bodyParser from "body-parser";
import { Employee } from "./models/employee";
import { EmployeeDAL } from "./DALs/EmployeeDAL";
import { Department } from "./models/department";
import { DepartmentDAL } from "./DALs/DepartmentDAL";
import { userLogin } from "./models/userLogin";
import { request } from "http";
import { userLoginDAL } from "./DALs/userloginDAL";
import { EmpResponse } from "./models/empresponse";

//Declaring the constants
const app: Express = express();
const port = 3000;
const path= require('path');
const cors=require('cors');

let empDAL=new EmployeeDAL();
let depDAL= new DepartmentDAL();
let userDAL=new userLoginDAL();



//Using API's
let corsOptions={origin:'*'};

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.get("/", (req: Request, res: Response) => {
  res.send("My first node page");
});

app.post('/api/v1/employees/createEmployee',async (req:Request, res:Response)=>{
    let emp:Employee = JSON.parse(JSON.stringify(req.body));
    empDAL.createEmployee(emp);
    res.send("Recieved Properly!!");
});

app.post('/api/v1/userLogin', async (req:Request, res:Response)=>{
    console.log(req.body);
    let user:userLogin=JSON.parse(JSON.stringify(req.body));
    let emp_id=await userDAL.Login(user);
    if(emp_id=="" || emp_id==null){
        let response= new EmpResponse;
        response.errorMessage="User Not found!";
        res.send(response)
    }
    else{
        let response= new EmpResponse;
        let jsonStr:string = JSON.stringify(emp_id)
        console.log(jsonStr)
        let jsonObj = JSON.parse(jsonStr)
        let empid: string = jsonObj.emp_id
        console.log(empid)
        let employee= await empDAL.getEmployee(empid);
        response.data= employee;
        res.send(response);
    }
});

app.post('/api/v1/signUp',async(req:Request,res:Response)=>{
    let emp:Employee=req.body;
    let userlogin:userLogin= req.body;
    let empid=await empDAL.createEmployee(emp)
    userlogin.emp_id=empid;
    await userDAL.signUp(userlogin);
    res.send("Thank you for signing up")
})

app.post('/api/v1/departments/createDepartment', async(req:Request, res:Response)=>{
    let dep:Department=JSON.parse(JSON.stringify(req.body))
    depDAL.createDepartment(dep);
    res.send("Recieved Department");

})

app.put('/api/v1/employees/updateEmployee/:employeeid',async(req:Request,res:Response)=>{
    var id=req.params["employeeid"];
    let emp:Employee=JSON.parse(JSON.stringify(req.body))
    empDAL.updateEmployee(emp,id);
    res.send("Updated Succesfully");

});

app.get('/api/v1/employees/viewEmployees/:employeeid',async(req:Request,res:Response)=>{
    var id=req.params["employeeid"];
    let employees=await empDAL.getEmployee(id);
    res.send(employees);
})

app.get('/api/v1/employees/viewEmployees',async(req:Request,res:Response)=>{
    let employees=await empDAL.getAllEmployees();
    res.send(employees);
})

app.listen(port, () => {
    console.log(`App is now listening!`);
});


//Exporting the app together
export default app;