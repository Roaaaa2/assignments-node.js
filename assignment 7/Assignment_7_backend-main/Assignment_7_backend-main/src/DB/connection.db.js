// Connect to db with MongoDB .........................


import {MongoClient } from 'mongodb'
import { DB_URL } from '../../config/config.service.js';

const client = new MongoClient(DB_URL , {serverSelectionTimeoutMS:3000});

export const connectDB = async()=>{
    try{
        await client.connect()
        console.log(`DB Connected Successfully 😎`);
    }catch(error){
        console.log(`Fail To Connect on DB 🫠 ${error}`);

    }
}

export const db = client.db('Assignment_7')
//Assignment 8 ........................


// 1.
// Create an explicit collection named “books” with a validation rule to ensure that each document has a non-empty “title” field. (0.5 Grade)
// •
// URL: POST /collection/books
// 2.
// Create an implicit collection by inserting data directly into a new collection named
// “authors”. (0.5 Grade)
// •
// URL: POST /collection/authors
// 3.
// Create a capped collection named “logs” with a size limit of 1MB. (0.5 Grade)
// •
// URL: POST /collection/logs/capped
// 4.
// Create an index on the books collection for the title field. (0.5 Grade)
// •
// URL: POST /collection/books/index
// 5.
// Insert one document into the books collection. (0.5 Grade)
// •
// URL: POST /books
// 6.
// Insert multiple documents into the books collection with at least three records. (0.5 Grade)
// •
// URL: POST /books/batch


// Insert a new log into the logs collection. (0.5 Grade)
// •
// URL: POST /logs
// 8.
// Update the book with title “Future” change the year to be 2022. (0.5 Grade)
// •
// URL: PATCH/books/Future

// Find a Book with title “Brave New World”. (0.5 Grade)
// •
// URL: GET /books/title => /books/title?title=Brave New World
// 10.
// Find all books published between 1990 and 2010. (0.5 Grade)
// •
// URL: GET /books/year => /books/year?from=1990&to=2010
// 11.
// Find books where the genre includes "Science Fiction".(0.5 Grade)
// •
// URL: /books/genre?genre=Science Fiction


// 12.
// Skip the first two books, limit the results to the next three, sorted by year in descending order. (0.5 Grade)
// •
// URL: GET /books/skip-limit


// Find books where the year field stored as an integer. (0.5 Grade)
// •
// URL: GET /books/year-integer
// 14.
// Find all books where the genres field does not include any of the genres "Horror" or "Science Fiction". (0.5 Grade)
// •
// URL: GET /books/exclude-genres


// 15.
// Delete all books published before 2000. (0.5 Grade)
// •
// DELETE: GET /books/before-year?year=2000
// 16.
// Using aggregation Functions, Filter books published after 2000 and sort them by year descending. (0.5 Grade)
// •
// URL: GET /books/aggregate1


// 4
// 17.
// Using aggregation functions, Find all books published after the year 2000. For each matching book, show only the title, author, and year fields. (0.5 Grade)
// •
// URL: GET /books/aggregate2
// 18.
// Using aggregation functions,break an array of genres into separate documents. (0.5 Grade)
// •
// URL: GET /books/aggregate3
// 19.
// Using aggregation functions, Join the books collection with the logs collection. (1 Grade)
// •
// URL: GET /books/aggregate4


