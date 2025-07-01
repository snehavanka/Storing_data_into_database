const http = require('http');
const mysql = require('mysql2');
const querystring = require('querystring');

const PORT = 8080;


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sneha@123',  
  database: 'studentdb2'
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL');
});


let recordsAdded = 0;
const MAX_RECORDS = 10;

const formHTML = `
<!DOCTYPE html>
<html>
<head><title>Add Student</title></head>
<style>
h2{
    color:blue;
    text-align:center;
}
form{
    text-align:center;
}
submit{
    color:blue;
}
input{
color:black;
}</style>
<body>
  <h2>Add Student Record (${recordsAdded}/${MAX_RECORDS})</h2>
  <form method="POST" action="/add_student">
    <label>Sl No:</label>
    <input name="sl_no" required><br><br>
    <label>Name:</label>
    <input name="name" required><br><br>
    <label>Roll No:</label>
    <input name="rollno" required><br><br>
    <label>Subject 1 Marks:</label>
    <input name="sub1marks" required><br><br>
    <label>Subject 2 Marks:</label>
    <input name="sub2marks" required><br><br>
    <label>Subject 3 Marks:</label>
    <input name="sub3marks" required><br><br>
    <input type="submit" value="Add Student" ${recordsAdded >= MAX_RECORDS ? 'disabled' : ''}>
  </form>
  <p style="color:red;">${recordsAdded >= MAX_RECORDS ? 'Limit of 10 records reached.' : ''}</p>
</body>
</html>
`;

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(formHTML);
  }
  else if (req.method === 'POST' && req.url === '/add_student') {
    if (recordsAdded >= MAX_RECORDS) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end('<h3>Limit of 10 records reached. Cannot add more students.</h3><a href="/">Back</a>');
      return;
    }
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const data = querystring.parse(body);

      const { sl_no, name, rollno, sub1marks, sub2marks, sub3marks } = data;
      if (!sl_no || !name || !rollno || !sub1marks || !sub2marks || !sub3marks) {
        res.writeHead(400, {'Content-Type': 'text/html'});
        res.end('<h3>Error: Missing required fields.</h3><a href="/">Back</a>');
        return;
      }

      const query = `INSERT INTO students (sl_no, name, rollno, sub1marks, sub2marks, sub3marks) VALUES (?, ?, ?, ?, ?, ?)`;
      db.query(query, [sl_no, name, rollno, sub1marks, sub2marks, sub3marks], (err) => {
        if (err) {
          res.writeHead(500, {'Content-Type': 'text/html'});
          res.end(`<h3>Database error: ${err.message}</h3><a href="/">Back</a>`);
          return;
        }
        recordsAdded++;
        
        res.writeHead(302, {'Location': '/'});
        res.end();
      });
    });
  }
  else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Page Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
