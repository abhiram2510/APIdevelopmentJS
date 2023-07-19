import connection from "../ConnectionManager";
import { Department } from "../models/department";



export class DepartmentDAL{
    public async createDepartment(dep:Department){
        let result= connection.execute(
            'insert into department(name) values(?)',
            [dep.name]
        )
        console.log(result);
    }
}