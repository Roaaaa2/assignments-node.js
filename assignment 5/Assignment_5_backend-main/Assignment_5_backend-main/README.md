# Retail Store Database Project (Node.js & MySQL)

This project demonstrates how to use **Node.js** with **MySQL** to manage a small retail store database.
It covers database creation, table relationships, CRUD operations, joins, and user permissions.

---

## 📌 Project Description

The database manages:

* Products
* Suppliers
* Sales

The project includes SQL queries executed through Node.js endpoints, as required.

---

## 🗂 Database Tables

### 1️⃣ Suppliers

* `supplier_id` (INT, PK, AUTO_INCREMENT)
* `supplier_name` (VARCHAR)
* `contact_number` (VARCHAR)

### 2️⃣ Products

* `product_id` (INT, PK, AUTO_INCREMENT)
* `product_name` (VARCHAR, NOT NULL)
* `price` (DECIMAL)
* `stock_quantity` (INT)
* `p_supplier_id` (INT, FK → suppliers.supplier_id)

### 3️⃣ Sales

* `sales_id` (INT, PK, AUTO_INCREMENT)
* `quantity_sold` (INT)
* `sale_date` (DATE)
* `s_product_id` (INT, FK → products.product_id)

---

## 🛠 Technologies Used

* Node.js
* Express.js
* MySQL
* XAMPP
* MySQL2 Package

---

## ⚙️ Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/your-username/retail-store-db.git
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

4. Make sure:

* MySQL is running (XAMPP)
* Database is created
* Tables are created using the provided SQL queries

---

## 🔗 API Endpoints

| Method | Endpoint                  | Description                     |
| ------ | ------------------------- | ------------------------------- |
| POST   | `/addSupplier`            | Add a new supplier              |
| POST   | `/addProducts`            | Insert multiple products        |
| POST   | `/addSale`                | Add a sale record               |
| PUT    | `/updateBreadPrice`       | Update product price            |
| DELETE | `/deleteEggs`             | Delete a product                |
| GET    | `/totalQuantitySold`      | Total quantity sold per product |
| GET    | `/highestStockProduct`    | Product with highest stock      |
| GET    | `/suppliersStartingWithF` | Suppliers starting with 'F'     |
| GET    | `/unsoldProducts`         | Products never sold             |
| GET    | `/salesDetails`           | Sales with product names        |

---

## 🔐 User Permissions (SQL Only)

```sql
CREATE USER 'store_manager'@'localhost' IDENTIFIED BY '123456';

GRANT SELECT, INSERT, UPDATE
ON retail_store.*
TO 'store_manager'@'localhost';

REVOKE UPDATE
ON retail_store.*
FROM 'store_manager'@'localhost';

GRANT DELETE
ON retail_store.sales
TO 'store_manager'@'localhost';
```

---

## ✅ Features Covered

* CREATE, ALTER, INSERT, UPDATE, DELETE
* JOIN & Aggregate functions
* Foreign Keys & CASCADE
* MySQL User Permissions

---

## 👩‍💻 Author

**Rahma**

---

## 📄 License

This project is for educational purposes.
