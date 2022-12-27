const { client } = require("../db");
const format = require('pg-format');


const add = async (req, res) => {
    try {
        const dept_name = req.body.dept_name 
        const emp_name = req.body.emp_name 
        const email = req.body.email 
        const dept_id = req.body.dept_id
        console.log("start excecution.......")
        let resp;
        if (dept_name && emp_name && email && dept_id){
            resp = await client.query(
               `INSERT INTO department(dept_name) VALUES('${dept_name}');

               INSERT INTO employee(emp_name,email,dept_id) VALUES
               ('${emp_name}','${email}',lastval())`);
       }else if(dept_name){
             resp = await client.query(
                `INSERT INTO department(dept_name) VALUES('${dept_name}')`);
        }else if(emp_name && email && dept_id){
            resp = await client.query(
               `INSERT INTO employee(emp_name,email,dept_id) VALUES
               ('${emp_name}','${email}',${dept_id})`);
           }else{
            resp = "can't insert the data "
        }
        res.send(resp)
    } catch (error) {
        res.send(error.message)
    }
}

const update = async(req,res)=>{
    try {
        const dept_id = req.body.dept_id
        const emp_id = req.body.emp_id
        const dept_name = req.body.dept_name
        const emp_name = req.body.emp_name
        const email = req.body.email
        console.log("start excecution.......")
        let resp;
        if(dept_name && dept_id){
             resp = await client.query(`UPDATE department SET 
             dept_name = '${dept_name}' WHERE dept_id = ${dept_id}`);
        }else if(emp_name && email && dept_id){
             resp = await client.query(`UPDATE employee SET 
             emp_name = '${emp_name}',email = '${email}' WHERE dept_id = ${dept_id}`);
        }else if(emp_name && emp_id){
            resp = await client.query(`UPDATE employee SET 
            emp_name = '${emp_name}' WHERE emp_id = ${emp_id}`);
        }else if(email && emp_id){
            resp = await client.query(`UPDATE employee SET 
            email = '${email}' WHERE emp_id = ${emp_id}`);
        }else{
            resp = "don't update"
        }
        res.send(resp)    
    } catch (error) {
        res.send(error.message)
    }
}

const remove = async (req, res) => {
    try {
        const dept_id = req.body.dept_id
        const dept_name = req.body.dept_name
        const emp_id = req.body.emp_id

        console.log("start excecution.......")
        let resp;
        if(dept_id){
         resp = await client.query(`DELETE FROM employee e USING department d
        WHERE e.dept_id = d.dept_id and d.dept_id = ${dept_id};

        DELETE FROM department d WHERE d.dept_id = ${dept_id};`);

    }else if (dept_name){
    resp = await client.query(`DELETE FROM employee e USING department d
    WHERE e.dept_id = d.dept_id  and d.dept_name = '${dept_name}';

      DELETE FROM department  d WHERE d.dept_name ='${dept_name}';`);
    }else{
        resp = "please provide valid details"
    }
    res.send(resp)
    } catch (error) {
        res.send(error.message)
    }
  }

  const find = async(req,res)=>{
    try {
        const dept_id = req.body.dept_id
        const dept_name = req.body.dept_name
        const emp_id = req.body.emp_id
        const emp_name = req.body.emp_name
        const limit = req.body.limit
        const offset = req.body.offset
        console.log("start excecution.......")
        let resp;
        if(dept_id ){
             resp = await client.query(`SELECT * FROM department,employee 
            WHERE department.dept_id = ${dept_id} AND employee.dept_id = ${dept_id}`);
        }else if (dept_name){
            resp = await client.query(`select * FROM department INNER JOIN 
            employee ON department.dept_id = employee.dept_id  
            WHERE department.dept_name ='${dept_name}'`)
        }else if(emp_id){
            resp = await client.query(`select * FROM employee INNER JOIN 
            department ON employee.dept_id = department.dept_id  
            WHERE employee.emp_id = ${emp_id};`);
        }else if (emp_name){
            resp = await client.query(`select * FROM employee INNER JOIN 
            department ON employee.dept_id = department.dept_id  
            WHERE employee.emp_name = '${emp_name}';`);
        } else{
             resp = await client.query(`SELECT * FROM department
        FULL OUTER JOIN employee ON department.dept_id = employee.dept_id 
        LIMIT ${limit}
        OFFSET ${offset}`);
        }
        res.send(resp.rows)  
    } catch (error) {
        res.send(error.message)
    }
}

module.exports = {add,find, update ,remove}