// const {createPool} =require('mysql');

// const pool=createPool({
//     host:"localhost",
//     user:"root",
//     password:"",
//     connectionLimit:10
// })
 

// pool.query("select emp_email,emp_password from banks.Employee",(err,res)=>{
//     return console.log(res);
// })

const express=require('express');
const mysql=require('mysql');
const app=express();
const PORT =3000;

const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"banks"
})


con.connect((err)=>{
if(err){
    console.log(err);
}else{
    console.log("CONNECTED!!");
}
})

app.get("/login",(req,res)=>{
    con.query("select emp_email,emp_password from Employee",function(err,result,fields){
        if(err){
            console.log(err);
        }else{
           // res.send(result);
           data=JSON.parse(JSON.stringify(result));
           console.log(data);
           console.log(data[1].emp_password);
        }
    });
})

app.get("/emp_data",(req,res)=>{
    con.query("SELECT emp_id, emp_name, emp_email, emp_photo, emp_address, branch_name,bank_name FROM employee,bank_branch,bank WHERE employee.branch_id=bank_branch.branch_id AND bank_branch.bank_id=bank.bank_id",function(err,result,fields){
        if(err){
            console.log(err);
        }else{
           // res.send(result);
           data=JSON.parse(JSON.stringify(result));
           console.log(data);
           console.log(data[1]);
        }
    });
})

app.listen(PORT,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("On port 3000");
    }
})