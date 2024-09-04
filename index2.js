const http = require('http');
const fs = require('fs');
const path = require('path');

// Create HTTP server
const server = http.createServer((req, res) => {
    // Handling different routes
    switch (req.url) {
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1>Welcome to the Home Page</h1>');
            break;
        case '/aboutus':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h3>Welcome to the About Page</h3>');
            break;
        case '/contactus':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<a href="http://www.masaischool.com">Contact us at Masai School</a>');
            break;
        case '/index':
            // Reading the index.js file and sending it as a response
            fs.readFile(path.join(__dirname, 'index.js'), 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error loading index.js');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/javascript' });
                    res.end(data);
                }
            });
            break;
        default:
            // Handling 404 for undefined routes
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
            break;
    }
});

// Server listens on port 8080
server.listen(8080, () => {
    console.log('Server running on port 8080');
});
