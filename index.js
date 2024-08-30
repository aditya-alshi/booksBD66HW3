let express = require('express');
let app = express();
let {
  getallBooks,
  getBookById
} = require('./data');

app.get('/books', (req, res) => {
  res.status(200).json({
    books: getallBooks()
  });
})

app.get('/books/details/:id', (req, res) => {
  let id = parseInt(req.params.id);
  res.status(200).json({
    book: getBookById(id)
  });
});

module.exports = {
  app
}