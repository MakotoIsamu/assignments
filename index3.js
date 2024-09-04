const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const path = require('path');

// Create HTTP server
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        if (req.url === '/signup') {
            // Serve the signup form
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
                <h1>Signup Form</h1>
                <form action="/signup" method="POST">
                    <label for="username">Username:</label><br>
                    <input type="text" id="username" name="username"><br><br>
                    <label for="password">Password:</label><br>
                    <input type="password" id="password" name="password"><br><br>
                    <button type="submit">Signup</button>
                </form>
            `);
        } else if (req.url === '/allusers') {
            // Read users from the file and display them
            fs.readFile(path.join(__dirname, 'user.txt'), 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error reading user data');
                } else {
                    // Remove passwords and display usernames only
                    const users = data.split('\n').map(line => {
                        const [username] = line.split(':');
                        return username ? `Username: ${username}` : '';
                    }).filter(line => line !== '').join('<br>');
                    
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(`<h1>All Users</h1><p>${users}</p>`);
                }
            });
        } else {
            // Handle undefined routes
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
        }
    } else if (req.method === 'POST' && req.url === '/signup') {
        // Handle form submission
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const parsedData = qs.parse(body);
            const { username, password } = parsedData;

            // Store username and password in user.txt
            fs.appendFile(path.join(__dirname, 'user.txt'), `${username}:${password}\n`, err => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error saving user data');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end('<h1>Thank You for Signup...!!!</h1>');
                }
            });
        });
    }
});

// Server listens on port 8080
server.listen(8080, () => {
    console.log('Server running on port 8080');
});
