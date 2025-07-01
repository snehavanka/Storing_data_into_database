const http = require('http');
const mysql = require('mysql2');


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sneha@123', 
  database: 'studentdb2'
});


db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});


const server = http.createServer((req, res) => {
  if (req.url === '/students' && req.method === 'GET') {
    const query = 'SELECT * FROM students';

    db.query(query, (err, results) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error querying the database.');
        return;
      }

      
      let html = `
        <html>
        <head>
          <title>Student List</title>
          <style>
            body { font-family: Arial; margin: 40px; }
            table { width: 80%; border-collapse: collapse; margin: auto; }
            th, td { padding: 10px; border: 1px solid #ddd; text-align: center; }
            th { background-color: #f0f0f0; }
            h2 { text-align: center; }
          </style>
        </head>
        <body>
          <h2>Student Details</h2>
          <table>
            <tr>
              <th>Sl No</th>
              <th>Name</th>
              <th>Roll No</th>
              <th>Sub1 Marks</th>
              <th>Sub2 Marks</th>
              <th>Sub3 Marks</th>
            </tr>`;

      results.forEach(student => {
        html += `
          <tr>
            <td>${student.sl_no}</td>
            <td>${student.name}</td>
            <td>${student.rollno}</td>
            <td>${student.sub1marks}</td>
            <td>${student.sub2marks}</td>
            <td>${student.sub3marks}</td>
          </tr>`;
      });

      html += `
          </table>
        </body>
        </html>`;

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    });

  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page not found.');
  }
});


server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/students');
});
