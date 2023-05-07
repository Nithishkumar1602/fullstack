const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Home page route
app.get('/', (req, res) => {
  // Read the list of articles from the JSON file
  const articles = require('./eg12.json');
  res.render('home', { articles });
});

// Article route
app.get('/article/:id', (req, res) => {
  // Read the list of articles from the JSON file
  const articles = require('./eg12.json');
  const article = articles.find(article => article.id === req.params.id);
  if (!article) {
    res.status(404).send('Article not found');
  } else {
    res.render('article', { article });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
