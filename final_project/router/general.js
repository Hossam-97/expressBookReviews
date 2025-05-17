const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books,null,4));
  
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  new Promise ((resolve,reject)=>{
const book = books[isbn];
if (book) resolve(book);
else reject("Book not found");
})
.then((book)=> res.status(200).json(book))
.catch((err) => res.status(404).json({message:err}))
 });
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  new Promise((resolve) => {
    const filteredBooks = Object.values(books).filter(book => book.author === author);
    resolve(filteredBooks);
  }).then(result => {
    res.status(200).json(result.length ? result : { message: "No books by that author" });
  });
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
  new Promise((resolve) => {
    const filteredBooks = Object.values(books).filter(book => book.title === title);
    resolve(filteredBooks);
  }).then(result => {
    res.status(200).json(result.length ? result : { message: "No books by that author" });
  });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if(book) {
  return res.status(200).json(book.reviews);
}
return res.status(404).json({message: "Book not found"});
  });

module.exports.general = public_users;
