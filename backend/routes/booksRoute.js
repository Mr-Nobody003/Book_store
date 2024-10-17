import express from "express";
import { Book } from "../models/bookmodel.js";

const router = express.Router();

//Route to save a new book
router.post("/", async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response.status(404).send({
          message: "send all the required fields :title ,author,publishYear",
        });
      }
      const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
      };
  
      const book = await Book.create(newBook);
  
      return response.status(201).send(book);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  //route to get all books
  router.get("/", async (request, response) => {
    try {
      const books = await Book.find({});
      return response.status(200).json({
        count: books.length,
        data: books,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  //route for get one book by id
  router.get("/:id", async (request, response) => {
    try {
      const { id } = request.params;
  
      const book = await Book.findById(id);
      return response.status(200).json({ book });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  //route for update a book
  router.put("/:id", async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response.status(400).send({
          message: "send all the required feilds :title,author,publishYear",
        });
      }
  
      const { id } = request.params;
  
      const updatedbook = await Book.findByIdAndUpdate(id, request.body);
  
      if (!updatedbook) {
        return response.status(404).json({ message: "Book not found" });
      }
      return response.status(200).json({ message: "Book updated" });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  //route for delete
  router.delete("/:id", async (request, response) => {
    try {
      const { id } = request.params;
  
      const deleted = await Book.findByIdAndDelete(id);
  
      if (!deleted) {
        return response.status(404).json({ message: "Book not found" });
      }
      return response.status(200).send({ message: "Book deleted" });
    } catch (error) {
      console.log(error.message);
      return response.status(500).send({ message: error.message });
    }
  });
  
  export default router;