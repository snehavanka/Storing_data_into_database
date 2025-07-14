from http.server import BaseHTTPRequestHandler, HTTPServer
import urllib.parse
import mysql.connector


db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="mysql@123",
    database="studentdb2"
)
cursor = db.cursor()

class StudentHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urllib.parse.urlparse(self.path)
        if parsed_path.path == '/get_student':
            query_params = urllib.parse.parse_qs(parsed_path.query)
            rollno = query_params.get('rollno', [None])[0]

            if not rollno:
                self.send_response(400)
                self.end_headers()
                self.wfile.write(b"Missing 'rollno' parameter")
                return

            try:
                cursor.execute("SELECT * FROM students WHERE rollno = %s", (rollno,))
                student = cursor.fetchone()

                if student:
                    
                    slno, name, rollno_db, sub1marks, sub2marks, sub3marks = student
                    response = (
                        f"slno:   { slno }\n"
                        f"name: { name }\n"
                        f"rollno: { rollno_db }\n"
                        f"sub1marks: { sub1marks }\n"
                        f"sub2marks: { sub2marks }\n"
                        f"sub3marks: { sub3marks }\n"
                    )
                    self.send_response(200)
                    self.send_header('Content-type', 'text/plain')
                    self.end_headers()
                    self.wfile.write(response.encode())
                else:
                    self.send_response(404)
                    self.end_headers()
                    self.wfile.write(b"Student not found")
            except mysql.connector.Error as err:
                self.send_response(500)
                self.end_headers()
                self.wfile.write(f"Database error: {err}".encode())

        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"Endpoint not found")


def run(server_class=HTTPServer, handler_class=StudentHandler, port=8081):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f"Server running at http://localhost:{port}/get_student?rollno=12")
    httpd.serve_forever()

if __name__ == '__main__':
    run()
