# Storing_data_into_database
storing the data into the database and retrieving the data from the database through the web page 

This project is a simple, pure Node.js-based web application that allows users to:
Add student records through a form (server.js)
View all student records in a table (studentdetails.js)
It uses MySQL to store and retrieve student data and has no dependencies on external frameworks like Express.
✨ Features
Add student records (limited to 10 entries)
Store data such as Sl. No, Name, Roll Number, and 3 Subject Marks
View all stored student records in a neat HTML table
Built using native Node.js http module
Uses mysql2 for database operations
## Tech Stack
Node.js (no frameworks)
MySQL database
mysql2 Node.js package
HTML + Inline CSS for front-end rendering
## Project Structure
project-folder/
├── server.js               # Server for adding student records via form
├── studentdetails.js       # Server to display all student records in table format
├── schema.sql              # SQL script to create database and table
└── README.md               # Project documentation

## Database Setup
Start your MySQL server
Run the following SQL to create the database and table:

CREATE DATABASE IF NOT EXISTS studentdb2;
USE studentdb2;

CREATE TABLE IF NOT EXISTS students (
  sl_no INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  rollno VARCHAR(20) NOT NULL,
  sub1marks INT NOT NULL,
  sub2marks INT NOT NULL,
  sub3marks INT NOT NULL
);

## How to Run the Project

1. Add Student Records (server.js)

This file displays a form to add student records and stores them in the MySQL database.

## Steps:
node server.js
Open http://localhost:8080 in your browser.
Fill in the form with student details.
Submit the form (max 10 records allowed).

2. View Student Details (studentdetails.js)
This file displays all student records stored in the database as an HTML table.
## Steps:
node studentdetails.js
Open http://localhost:3000/students in your browser.
You will see a table with all stored student records.
## How It Works

server.js
Serves an HTML form on /
Accepts POST requests on /add_student
Stores form data in the MySQL students table
Tracks how many records have been added (max 10)
studentdetails.js
Listens on /students for GET requests
Queries all records from the students table
Displays data in an HTML table with basic styling
## Notes

Database credentials are hardcoded for demo purposes. Do not use hardcoded passwords in production.
Both files use mysql2, ensure it's installed:
npm install mysql2
Error handling is built-in for database connection and data insertion.

