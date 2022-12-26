const { client } = require("../db");
const format = require('pg-format');


const add = async (req, res) => {
    try {
        const dept_name = req.body.dept_name
        const emp_name = req.body.emp_name
        const email = req.body.email
        const dept_id = req.body.dept_id
        console.log("start excecution.......")
        const resp = await client.query(
            `INSERT INTO department(dept_name) VALUES('${dept_name}');

            INSERT INTO employee(emp_name,email,dept_id) VALUES
            ('${emp_name}','${email}',${dept_id})`
            );
        res.send(resp)
    } catch (error) {
        res.send(error.message)
    }
}

const updatedept = async (req, res) => {
    try {
        const dept_name = req.body.dept_name
        const dept_id = req.body.dept_id
        console.log("start excecution.......")
        const resp = await client.query(`UPDATE department SET dept_name = '${dept_name}' WHERE dept_id = ${dept_id}`);
        res.send(resp)
    } catch (error) {
        res.send(error.message)
    }
  }

const updateemp = async (req, res) => {
  try {
      const emp_name = req.body.emp_name
      const email = req.body.email
      const emp_id = req.body.emp_id
      console.log("start excecution.......")
      const resp = await client.query(`UPDATE employee SET emp_name = '${emp_name}',email = '${email}' WHERE emp_id = ${emp_id}`);
      res.send(resp)
  } catch (error) {
      res.send(error.message)
  }
}

const deleteemp = async (req, res) => {
    try {
        const emp_id = req.params.emp_id
        console.log("start excecution.......")
        const resp = await client.query(`DELETE FROM employee WHERE emp_id =${emp_id}`);
        res.send(resp)
    } catch (error) {
        res.send(error.message)
    }
  }

  const deletedept = async (req, res) => {
    try {
        const dept_id = req.params.dept_id
        console.log("start excecution.......")
        const resp = await client.query(`DELETE FROM department WHERE dept_id =${dept_id}`);
        res.send(resp)
    } catch (error) {
        res.send(error.message)
    }
  }

  const findBydeptId = async (req, res) => {
    try {
        const dept_id = req.params.dept_id
        console.log("start excecution.......")
        const resp = await client.query(`SELECT * FROM department,employee 
        WHERE department.dept_id = ${dept_id} AND employee.dept_id = ${dept_id};`);
        res.send(resp.rows)
    } catch (error) {
        res.send(error.message)
    }
}

const findAll = async (req, res) => {
    try {
        console.log("start excecution.......")
        const resp = await client.query(`SELECT * FROM department
        FULL OUTER JOIN employee ON department.dept_id = employee.dept_id `);
        res.send(resp.rows)
    } catch (error) {
        res.send(error.message)
    }
}




module.exports = {add, updatedept,updateemp,deletedept,deleteemp,findBydeptId,findAll}