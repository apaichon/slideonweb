const express = require('express');
// const serveStatic = require('serve-static');
// const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static('public'));
app.use('/markdown', express.static('markdown'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});