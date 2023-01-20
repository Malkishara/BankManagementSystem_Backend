
const express=require('express');
const mysql=require('mysql');
const app=express();
const PORT =3000;
const cors=require('cors');

//app.use(express.json);
app.use(cors());

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
    con.query("SELECT  emp_email, emp_password FROM employee",function(err,result,fields){
        if(err){
            console.log(err);
        }else{
            //res.send(result);
            
           data=JSON.parse(JSON.stringify(result));
           console.log(data);
           res.send(data);
           console.log(data[1]);
         }
    });
})

app.get("/",(req,res)=>{
    res.json({"users":["user1","user2","user3"]})
})

app.get("/emp_data",(req,res)=>{
    con.query("SELECT emp_id, emp_name, emp_email, emp_photo, emp_address, branch_name,bank_name FROM employee,bank_branch,bank WHERE employee.branch_id=bank_branch.branch_id AND bank_branch.bank_id=bank.bank_id",function(err,result,fields){
        if(err){
            console.log(err);
        }else{
            //res.send(result);
            
           data=JSON.parse(JSON.stringify(result));
           console.log(data);
           res.send(data);
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