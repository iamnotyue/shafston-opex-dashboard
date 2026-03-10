const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 8099;
const dir = __dirname;
http.createServer((req, res) => {
  const file = path.join(dir, req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(file);
  const types = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json'};
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, {'Content-Type': types[ext] || 'text/plain'});
    res.end(data);
  });
}).listen(port, () => console.log('Serving on http://localhost:' + port));
