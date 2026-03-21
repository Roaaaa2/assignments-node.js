// Part 3: (Using Node.js and MySQL) Answer the Questions below based on the given Scenario
// The small retail store needs a database to manage information about its products, suppliers, and sales.
// Database Requirements



// 1- Create the required tables for the retail store database based on 
// the tables structure and relationships. (0.5 Grade)


// Second .............................
// 1.Products Table:
// ProductID: Unique identifier for each product (integer, primary key, auto-increment).
// ProductName: Name of the product (text).
// Price: Price of the product (decimal).
// StockQuantity: Quantity of the product in stock (integer).
// SupplierID: ID of the supplier providing the product (integer, foreign key referencing Suppliers).

// Query .................................

// CREATE TABLE products(
//     product_id int PRIMARY key AUTO_INCREMENT ,
//     product_name varchar(100) not null ,
//     price decimal(10,2) not null  ,
//     stock_quantity INT not null ,
//     P_supplier_id INT NOT NULL,
//     CONSTRAINT FK_P_SUP FOREIGN KEY (P_supplier_id) REFERENCES suppliers (supplier_id)
//     on  DELETE CASCADE 
//     on UPDATE CASCADE
// ); 



// First ..........................
// 2.Suppliers Table:
// SupplierID: Unique identifier for each product (integer, primary key, auto-increment).
// SupplierName: Name of the supplier (text).
// ContactNumber: Supplier’s contact number (text).

// Query ...................

// CREATE TABLE suppliers(
//     supplier_id int PRIMARY key AUTO_INCREMENT ,
//     supplier_name varchar(100) not null ,
//     contact_number varchar(100) not null 
// );



// Third ..................................
// 3.Sales Table:
// SaleID: Unique identifier for each product (integer, primary key, auto-increment).
// ProductID: Reference to the product sold (integer, foreign key referencing Products).
// QuantitySold: Quantity of the product sold (integer).
// SaleDate: Date

// Query ................................

// CREATE TABLE sales(
//     sales_id int PRIMARY key AUTO_INCREMENT ,
//     quantity_sold INT not null ,
//     sale_date DATE not null ,
//     s_product_id INT NOT NULL, 
//     CONSTRAINT FK_P_Sales FOREIGN KEY (s_product_id) REFERENCES products (product_id)
//     on  DELETE CASCADE 
//     on UPDATE CASCADE
// ); 



// Connect database With Node.js ...............................

const express = require('express')
const app = express()
const port = 3000

const mysql2 = require('mysql2')

const db = mysql2.createConnection({
    host :'127.0.0.1' ,
    port : 3306 ,
    user:'root' ,
    password :'' ,
    database :'retail_db_assignment'
})

db.connect((error)=>{

    if(error){
        console.log('Fail to Connect on db 🫠🫠');
    }else{
        console.log('db Connected Success 😎😎');
    }


})
app.use(express.json())
// 2- Add a column “Category” to the Products table. (0.5 Grade)
app.post('/addCategory' , (req , res , next)=>{
    const insertedQuery = `ALTER TABLE products ADD COLUMN  category VARCHAR(100);`

    db.execute(insertedQuery , (error , result , fields)=>{
        if(error){
            return res.status(500).json({message : "Query Error"})
        }
        return res.status(201).json({message : "Added Done" , result })

    })
})
// 3 Remove the “Category” column from Products. (0.5 Grade)
app.post('/deleteCategory' , (req , res , next)=>{
    const deletedQuery = `ALTER TABLE products DROP COLUMN category;`

    db.execute(deletedQuery, (error , result , fields)=>{
        if(error){
            return res.status(500).json({message : "Query Error" , error: error.message })
        }
        return res.status(201).json({message : "Column 'category' removed successfully" , result })

    })
})

// 4- Change “ContactNumber” column in Suppliers to VARCHAR (15). (0.5 Grade)
app.post('/changeContactNumber' , (req , res , next)=>{

    const changedQuery = ` ALTER TABLE suppliers MODIFY COLUMN contact_number VARCHAR(15);`
    db.execute(changedQuery , (error , result , fields )=>{

        if(error){
            return res.status(500).json({message :"Query Error"})
        }
        return res.status(201).json({message : "Column 'contactNumber' modified successfully" , result})

    })
})

// 5 - Add a NOT NULL constraint to ProductName. (0.5 Grade)
app.post('/changeProductName' , (req , res , next)=>{

    const changedQuery = `ALTER TABLE products MODIFY COLUMN product_name VARCHAR(100) not null;`
    db.execute(changedQuery , (error , result , fields )=>{

        if(error){
            return res.status(500).json({message :"Query Error"})
        }
        return res.status(201).json({message : "Column 'ProductName' modified successfully" , result})

    })
})
// 6- Perform Basic Inserts: (0.5 Grade)

// a.Add a supplier with the name 'FreshFoods' and contact number '01001234567'.
    app.post('/addSupplier' , (req , res , next)=>{

    const changedQuery = `INSERT INTO suppliers (supplier_name, contact_number) VALUES ('FreshFoods', '01001234567');`
    db.execute(changedQuery , (error , result , fields )=>{

        if(error){
            return res.status(500).json({message :"Query Error"})
        }
        return res.status(201).json({message : "Supplier added successfully" , result})

    })
})


// b.Insert the following three products, all provided by 'FreshFoods':

// i.'Milk' with a price of 15.00 and stock quantity of 50.
// ii.'Bread' with a price of 10.00 and stock quantity of 30.
// iii.'Eggs' with a price of 20.00 and stock quantity of 40.


    app.post('/addProducts' , (req , res , next)=>{

    const changedQuery = `INSERT INTO products (product_name, price , stock_quantity,P_supplier_id )
        VALUES
        ('Milk', 15.00, 50, (SELECT supplier_id FROM suppliers WHERE supplier_name = 'FreshFoods')),
        ('Bread', 10.00, 30, (SELECT supplier_id FROM suppliers WHERE supplier_name = 'FreshFoods')),
        ('Eggs', 20.00, 40, (SELECT supplier_id FROM suppliers WHERE supplier_name = 'FreshFoods'));`
    db.execute(changedQuery , (error , result , fields )=>{
        if(error){
            return res.status(500).json({message :"Query Error"})
        }
        return res.status(201).json({message : "Products added successfully" , result})

    })
})
// c.Add a record for the sale of 2 units of 'Milk' made on '2025-05-20'.
    app.post('/addSales' , (req , res , next)=>{

    const changedQuery = `INSERT INTO sales (quantity_sold, sale_date, s_product_id)
                VALUES (
                    2,
                    '2025-05-20',
                    (SELECT product_id FROM products WHERE product_name = 'Milk' LIMIT 1)
                );`
    db.execute(changedQuery , (error , result , fields )=>{
        if(error){
            return res.status(500).json({message :"Query Error"})
        }
        return res.status(201).json({message : "Sales added successfully" , result})

    })
})


// 7 Update the price of 'Bread' to 25.00. (0.5 Grade)
    app.post('/updateProduct' , (req , res , next)=>{

    const changedQuery = `update products SET price = 25.00 where product_name = 'Bread'`
    db.execute(changedQuery , (error , result , fields )=>{
        if(error){
            return res.status(500).json({message :"Query Error"})
        }
        return res.status(201).json({message : "product updated successfully" , result})

    })
})
// 8 Delete the product 'Eggs'. (0.5 Grade)
    app.post('/deleteProduct' , (req , res , next)=>{

    const changedQuery = `delete from products where product_name = 'Eggs'`
    db.execute(changedQuery , (error , result , fields )=>{
        if(error){
            return res.status(500).json({message :"Query Error"})
        }
        return res.status(201).json({message : "product deleted successfully" , result})

    })
})
// 9-  Retrieve the total quantity sold for each product. (0.5 Grade)

    app.post('/retrieveQuantity' , (req , res , next)=>{

    const changedQuery = `SELECT p.product_name,SUM(s.quantity_sold) AS total_sold
                FROM products p
                JOIN sales s 
                    ON p.product_id = s.s_product_id
                GROUP BY p.product_id, p.product_name;`
    db.execute(changedQuery , (error , result , fields )=>{
        if(error){
            return res.status(500).json({message :"Query Error"})
        }
        return res.status(201).json({message : "Retrieve the total quantity sold successfully" , result})

    })
})

// 10- Get the product with the highest stock. (0.5 Grade)
    app.post('/highestStock' , (req , res , next)=>{

    const changedQuery =  `
        SELECT *
        FROM products
        ORDER BY stock_quantity DESC
        LIMIT 1;
    `
    db.execute(changedQuery , (error , result , fields )=>{
        if(error){
            return res.status(500).json({message :"Query Error"})
        }
        if (!result?.length ) {
            return res.status(404).json({message: "No products found"});
        }
        return res.status(201).json({message : " Get the highest stock successfully" , result})

    })
})

// 11 - Find suppliers with names starting with 'F'. (0.5 Grade)
    app.post('/findSuppliersWithName' , (req , res , next)=>{

    const changedQuery =`SELECT *
                FROM suppliers
                WHERE supplier_name LIKE 'F%';`
    db.execute(changedQuery , (error , result , fields )=>{
        if(error){
            return res.status(500).json({message :"Query Error"})
        }
        if (!result?.length ) {
            return res.status(404).json({message: "No Suppliers found with name F"});
        }
        return res.status(201).json({message : " find Suppliers With Name successfully" , result})

    })
})

// 12- Show all products that have never been sold. (0.5 Grade)
    app.post('/findProductNeverSold' , (req , res , next)=>{

    const changedQuery = `SELECT p.*
                FROM products p
                LEFT JOIN sales s
                ON p.product_id = s.s_product_id
                WHERE s.s_product_id IS NULL;`

    db.execute(changedQuery , (error , result , fields )=>{
        if(error){
            return res.status(500).json({message :"Query Error"})
        }
        if (!result?.length ) {
            return res.status(404).json({message: "No products found"});
        }
        return res.status(201).json({message : " all products that have never been sold successfully" , result})

    })
})

// 13- Get all sales along with product name and sale date. (0.5 Grade)
    app.post('/GetSales' , (req , res , next)=>{

    const changedQuery = `SELECT 
            p.product_name,
            s.quantity_sold,
            s.sale_date
            FROM sales s
            JOIN products p
            ON s.s_product_id = p.product_id;`

    db.execute(changedQuery , (error , result , fields )=>{
        if(error){
            return res.status(500).json({message :"Query Error"})
        }
        return res.status(201).json({message : "Get all sales along with product name and sale date successfully" , result})

    })
})

// 14- Create a user “store_manager” and give them SELECT, INSERT, and UPDATE permissions on all tables. (0.5 Grade)

// CREATE USER 'store_manager'@'localhost' IDENTIFIED BY '123456';

// GRANT SELECT, INSERT, UPDATE
// ON retail_store.*
// TO 'store_manager'@'localhost';



// 15- Revoke UPDATE permission from “store_manager”. (0.5 Grade)
// REVOKE UPDATE
// ON retail_store.*
// FROM 'store_manager'@'localhost';


// 16- Grant DELETE permission to “store_manager” only on the Sales table. (0.5 Grade) 

// GRANT DELETE
// ON retail_store.sales
// TO 'store_manager'@'localhost';



app.listen(port , ()=>{
    console.log(`Listening on port ${port} 🚀🚀🚀🚀`);
})
