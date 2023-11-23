const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
require ('pug');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
// PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Comp3005_A4',
  password: 'postgres',
  port: 5432,
});

app.set('view engine', 'pug');
app.use(express.static('public'));



// Route to render the index page
app.get('/',  async (req, res) => {
  let students = await getAllStudents();
  res.render('index', { students:  students});
  
});

async function getAllStudents(){
  const results = await pool.query(`SELECT * FROM STUDENTS ORDER BY student_id`);
  return results.rows;
}

app.post('/deleteStudent', async (req, res) => {
  //to prevent the program from crashing when user presses delete student button without text in the input box
  try {
    await deleteStudent(req.body.student_id);
    // Redirect to the home page after deleting the student
    res.redirect('/');
  } catch (error) {
    console.error('Error adding student:', error.message);
    res.redirect('/');
  } 
});

async function deleteStudent(student_id){
  await pool.query(`DELETE FROM students WHERE student_id=${student_id}`);
}

// Route to handle adding a new student
app.post('/addStudent',  async (req, res) => {
  try {
    await addStudent(req.body.first_name, req.body.last_name, req.body.email, req.body.enrollment_date);
    // Redirect to the home page after adding the student
    res.redirect('/');
  } catch (error) {
    console.error('Error adding student:', error.message);
    res.redirect('/');
  } 

});

//function to query the database to add a student
async function addStudent(first_name, last_name, email, enrollment_date){
  return await pool.query(`INSERT INTO  students (first_name, last_name, email, enrollment_date) VALUES ('${first_name}', 
   '${last_name}', '${email}', '${enrollment_date}')`);
 
 }

// Route to handle updating a student's email generically
app.post('/updateEmail', async (req, res) => {
  try {
    
    // Update the email of the specified student in the database
    await updateStudentEmail(req.body.student_id, req.body.newEmail);

    // Redirect to the home page after updating the email
    res.redirect('/');
  } catch (error) {
    console.error('Error updating email:', error.message);
    res.redirect('/');
  }
});

async function updateStudentEmail(student_id, new_email){
    try {
    // Update the email of the specified student in the database
      const result = await pool.query('UPDATE students SET email = $1 WHERE student_id = $2 RETURNING *', [new_email, student_id]);
      
      return result.rows;
      } catch (error) {
        throw error;
      }
}



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});