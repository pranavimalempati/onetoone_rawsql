const { client } = require("./db");

const express = require("express");
const main = express();
const router = require("./router/router");

require("dotenv").config();

const body_parser = require("body-parser");
const cors = require("cors");

main.use(body_parser.urlencoded({ extended: true }));
main.use(body_parser.json());
main.use("/", router);
main.use(cors());

async function run() {
  await client.connect();
  console.log(`datasource initialized...`);
  await client.query(
    `CREATE TABLE if not exists department(dept_id serial PRIMARY KEY,
      dept_name	VARCHAR(50) NOT NULL);
  
      CREATE TABLE if not exists employee(emp_id 	serial  PRIMARY KEY,
      emp_name VARCHAR(50)NOT NULL,
        email	VARCHAR (100)NOT NULL,
        dept_id INT unique,
        CONSTRAINT FK_employee_department  FOREIGN KEY(dept_id)
            REFERENCES department(dept_id));`
    )
console.log("tables created")
  main.listen(process.env.PORT, () => {
    console.log('server running at port',process.env.PORT);
  });
}
run();

