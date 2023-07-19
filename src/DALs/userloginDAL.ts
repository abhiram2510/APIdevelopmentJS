import connection from "../ConnectionManager";
import { userLogin } from "../models/userLogin";


export class userLoginDAL{
    public async Login(userlogin:userLogin){
        return new Promise((resolve, reject)=>{
            connection.execute('select emp_id from userlogin where username=? and pass=?',[userlogin.username,userlogin.pass],  (error, rows)=>{
                if(error){
                    return reject(error);
                }
                return(resolve(rows[0]));
                
                });
        });

    }
    public async signUp(userlogin:userLogin){
        let results = await connection.execute(
            'insert into userlogin(emp_id,username,pass) values (?,?,?)',
            [userlogin.emp_id,userlogin.username,userlogin.pass]
            );

    }
}