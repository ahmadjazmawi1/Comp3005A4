Assignment Description: 

This application is a comprehensive CRUD system which is implemented as a Full Stack application with the capability to execute CRUD operations on the Student database. It leverages Node.js and Express for the backend, and Pug.js for the frontend. 

All the operations can be accessed from the web page, including updating a students email given their student ID, Deleting a student, adding a student, and viewing all students. Viewing all students is in the table that is on the web page. When deleting an existing student or inserting a new one, the table will update to show the new table with the changes made. It grabs the most recent snapshot of the database. For updating the students email function however, I had to use a client.js file connected to the Frontend file that creates the request and receives a response (200 if it worked, 404 if student not found, 400 if email is duplicate). Due to this, the website has to be refreshed following an update to a students email. 


All the backend functions that communicate with the database are in the server.js file. 

To set up the database: 
1. Create a database called Comp3005_A4 using the default username and password (postgres for both)
2. Create the table using:
CREATE TABLE students (
	student_id SERIAL PRIMARY KEY, 
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL, 
	email TEXT NOT NULL UNIQUE, 
	enrollment_date DATE
);

3. Insert the data into the table using: 
INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES
('John', 'Doe', 'john.doe@example.com', '2023-09-01'),
('Jane', 'Smith', 'jane.smith@example.com', '2023-09-01'),
('Jim', 'Beam', 'jim.beam@example.com', '2023-09-02');

Stept to compile and run the application:

1. download the code from github and open the folder in vs code or other ide
2. open a terminal where the folder is, and type "npm install" to install the dependencies that the project requires
3. Once downloaded, type "npm start" to start the application
4. in the terminal it will show the link where the server is running. press Ctrl + right click to go to the website
5. The application is now running. you will see the table of students populated with student information if you followed steps 1 to 4 correctly

Explanation of each function:

The function app.get('/',  async (req, res)) is the default route, it renders the page by querying all the students in the database. This is what is called when you open the website. 

getAllStudents: an asyncronous helper function that gets all the students from the database, by querying the database using an SQL statement

app.post('/deleteStudent', async (req, res): the function that gets called when you click on "delete student" button. It makes sure there was text in the text box when pressing delete student button, to make sure no NAN values are supplied. If its good, it deletes the student by calling the deleteStudent helper and redirects to the '/' route, updating the table with the new data

async function deleteStudent: the helper function that queries the database using an SQL statement.

app.post('/updateEmail', async (req, res): the function that gets called when you click on "update email" button. Has an error handler to handle errors including the user not entering text into the box and clicking update email button,  or the email being a duplicate. calls the updateEmail function that queries the database. If the update worked, it redirects to the '/' route so that the table can be updated.

app.post('/addStudent',  async (req, res): the function that gets called when you click on "submit" button. It makes sure there was text in the text boxes when pressing submit button, to make sure no NAN values are supplied. If its good, it inserts the new student the student by calling the deleteStudent helper and redirects to the '/' route, updating the table with the new data

async function addStudent: function that inserts the new student into the database using an SQL insert statement. 



