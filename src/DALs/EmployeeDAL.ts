import connection from "../ConnectionManager";
import { Employee } from "../models/employee";


export class EmployeeDAL {
    public async createEmployee(emp: Employee){
        console.log(emp);
        let results = await connection.execute(
          'insert into employee(first_name,last_name,b_date,gender,dept_id) values (?,?,?,?,?)',
          [emp.first_name,emp.last_name,emp.b_date,emp.gender,emp.dept_id]
          );
         console.log(results);

        let empid= await this.getLastInsertID();
        console.log(empid["id"]);
        return +empid["id"];
    }

    public async getLastInsertID(){
        return new Promise((resolve, reject)=>{
            connection.execute('SELECT LAST_INSERT_ID() as id;', (error, elements)=>{
                if(error){
                    return reject(error);
                }
                console.log(elements[0]);
                return resolve(elements[0]);
            });
        });
    }

    public async getEmployee(employeeid:string){
        return new Promise((resolve, reject)=>{
            connection.execute('select * from employee where id=? ',[employeeid],  (error, elements)=>{
                if(error){
                    return reject(error);
                }
                console.log(elements[0]);
                return resolve(elements[0]);
            });
        });
    }
    public async getAllEmployees(){
        return new Promise((resolve, reject)=>{
            connection.execute('select * from employee',  (error, elements)=>{
                if(error){
                    return reject(error);
                }
                console.log(elements[0]);
                return resolve(elements);
            });
        });
    }

    public async updateEmployee(emp:Employee,employeeId:string){
        let results= await connection.execute(
            'update employee set last_name=? where id=? ',[emp.last_name,employeeId]
        );
    }
}
