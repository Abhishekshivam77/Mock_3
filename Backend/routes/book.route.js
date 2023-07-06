const express = require("express");
const {BookModel} = require("../models/book.model");


const BookRoute = express.Router();

//Below is the API Route to add a book;
BookRoute.post('/add',async(req,res)=>{
    try {
        const book = new BookModel(req.body);
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        console.log(error);
        res.status(500).send('ERROR');
    }
});

//gettin Books Data ROute;
// BookRoute.get('/', async(req,res)=>{
//     try {
//         let query = {};
//         if(req.query.genre){
//             query.genre =req.query.genre;

//         }

//     } catch (error) {
        
//     }
// })
BookRoute.get('/', async (req, res) => {
    try {
      let query = {};
      if (req.query.genre) {
        query.genre = req.query.genre;
      }
      let sort = {};
      if (req.query.sortByPrice) {
        sort.price = req.query.sortByPrice;
      }
      const books = await BookModel.find(query).sort(sort);
      res.json(books);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });
  
  // Below is the API Route to  Delete Book 
  
  BookRoute.delete('/del/:id', async (req, res) => {
    try {
      const book = await BookModel.findByIdAndDelete(req.params.id);
      if (!book) {
        return res.status(404).send('Book not Present');
      }
      res.send('Book deleted successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });
  
  // Below is the API Route to  Filter Books 
  BookRoute.get('/filter', async (req, res) => {
    try {
      const books = await BookModel.find({ genre: req.query.genre });
      res.json(books);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });
  
  ////Below is the API Route to  Sort Books 
  BookRoute.get('/sort', async (req, res) => {
    try {
      const sort = {};
      sort[req.query.sortBy] = req.query.order;
      const books = await BookModel.find().sort(sort);
      res.json(books);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });





module.exports = {
    BookRoute
}