# 📚 BookStore API

This is a **Node.js + Express + MongoDB** project that demonstrates CRUD operations, aggregation, and collection management.  

---

## 🛠️ Technologies Used
- **Node.js** (v18+)
- **Express.js**
- **MongoDB (Native Driver)**
- **Postman / REST Client** for testing
- **JavaScript (ES6 Modules)**

---

---

## 🚀 Features

### 1️⃣ Collections
- **Books**: Explicit collection with validation (`title` required)
- **Authors**: Implicit collection by inserting documents
- **Logs**: Tracks actions on books

### 2️⃣ CRUD Operations
- Create, Read, Update, Delete books
- Insert multiple documents
- Delete books before a certain year

### 3️⃣ Queries
- Find by **title**  
- Filter by **year range**  
- Filter by **genre**  
- Find **integer year** values

### 4️⃣ Aggregation
- Sort books by year (descending)
- Show selected fields (`title`, `author`, `year`)
- `$unwind` array of genres into separate documents
- `$lookup` to join **books** with **logs**

---

## 📦 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /collection/books | Create explicit books collection |
| POST   | /collection/authors | Create authors collection by insertion |
| POST   | /books/insert | Insert multiple book documents |
| GET    | /books/title?title=... | Get book by title |
| GET    | /books/year?from=YYYY&to=YYYY | Filter books by year range |
| GET    | /books/genre?genre=... | Filter books by genre |
| GET    | /books/year/type | Find books with year as integer |
| DELETE | /books/before-year?year=YYYY | Delete books before a year |
| GET    | /books/aggregate1 | Filter books after 2000 & sort |
| GET    | /books/aggregate2 | Show only title, author, year |
| GET    | /books/aggregate/unwind | Break genres array into documents |
| GET    | /books/aggregate4 | Join books with logs collection |

---

## ⚡ Example Requests

### Insert a book
```bash
POST /books/insert
Content-Type: application/json

{
  "title": "Dune",
  "author": "Frank Herbert",
  "year": 1965,
  "genres": ["Science Fiction", "Adventure"]
}
```
Filter books by genre
GET /books/genre?genre=Science Fiction

Aggregate: join books with logs
GET /books/aggregate4

****
Set environment variables (.env):

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/
PORT=3000


Run the server:
npm run start-dev

📚 Notes

MongoDB Native Driver is used, no Mongoose

All aggregation examples use $match, $project, $sort, $unwind, $lookup

Document PostMan For Testing:-
https://documenter.getpostman.com/view/46710820/2sBXVmg8sE




















