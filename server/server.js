// server/server.js (using CommonJS syntax since you used `require`)
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// This line gets the directory name of the current module file.
const __dirname = path.dirname(require.main.filename); 

// Serve static files from the 'public' directory
// The Dockerfile will copy the 'dist' contents INTO this 'public' folder.
app.use(express.static(path.join(__dirname, 'public'))); 
// 

// Handle all routes - send back index.html
app.get('*', (req, res) => {
  // Ensure the index.html is also served from the 'public' folder.
  res.sendFile(path.join(__dirname, 'public', 'index.html')); 
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});