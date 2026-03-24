
// Assignment 4 ...
const path = require('path')
const fs = require('fs')
const express = require('express')
const {randomUUID} = require('crypto')
const app = express()
let port =3000

const filePath = path.resolve('./users.json')
function getUsers(){
    return JSON.parse(fs.readFileSync(filePath , {encoding : 'utf-8'}))
}
function saveUsers(users){
    return fs.writeFileSync(filePath ,JSON.stringify( users ))
}
app.use(express.json())
// // Part1:Simple CRUD Operations Using Express.js:
// ı.For all the following tasks, you must use the fs module to read and write data from a JSON file (e.g.,
// users.json). Do not store or manage data using arrays. (2 Grades)

// 1. Create an API that adds a new user to your users stored in a JSON file. 
// (ensure that the email of the new user doesn’t exist before)(1
// Grades)
// o URL: POST /user

// get data from body
// read file 
// check if email is already exist
// push new user 
// save in file 
// res ..

app.post('/user' , (req , res , next)=>{
    try {
        // get data 
        const {userName , email , age} = req.body
        // read file 
        const users = getUsers()
        // check email
        const checkEmailExist = users.find((user)=>{
            return user.email === email
        })
        if(checkEmailExist){
            return res.status(409).json({message : "Email is Already Exist 😊" })
        }
        const newUser = {
            id :randomUUID() ,
            userName ,
            age , 
            email
        }
        users.push(newUser)

        // save in file
        saveUsers(users)

        res.status(200).json({message : "User Added Successfully ✅" , newUser : newUser})


    } catch (error) {
        res.status(500).json({message : "Invalid Routing ❌❌❌ " })
    }

})

// 2.  Create an API that updates an existing user's name, age, or email by their ID. 
// The user ID should be retrieved from the params. (1 Grade)
// Note: Remember to update the corresponding values in the JSON file
// o URL: PATCH /user/:id

// update by id 

// extract id using params
// get data 
// file 
// check
// save 
// res 
app.patch('/user/:id' ,(req , res , next)=>{
    try {
        // extract id 
        const {id} = req.params
        // get data
        const {userName , email , age} = req.body
        // read file
        const users = getUsers()

        // check user
            const userIndex = users.findIndex((user)=>{
                return user.id === id

            }) 
            if(userIndex===-1){
                return res.status(404).json({message : 'User ID Not Found .'})
            }

            // check email is exist & owner different 
            if(email &&  users.some( (user , index)=> user.email === email && index != userIndex )){
                    return res.status(409).json({message : 'Email is already exist .'})
            }
            let updatedFields =[]

            if(userName){ users[userIndex].userName= userName ; updatedFields.push('userName') }
            if(email){ users[userIndex].email = email;updatedFields.push('email') }
            if(age){ users[userIndex].age = age ; updatedFields.push('age') }


            saveUsers(users)
               // dynamic message
            let message = "User updated successfully.";

            if ( updatedFields.length === 1) {
                message = `User ${updatedFields[0]} updated successfully.`;
            }
            res.status(200).json({message : message })
    } catch (error) {
        res.status(500).json({message : "Invalid Routing ❌❌❌ " })
    }

})

// 3.
// Create an API that deletes a User by ID. The user id should be retrieved from either the request body or optional params. (1 Grade)
// Note: Remember to delete the user from the file
// o
// URL: DELETE /user{/:id}

// extract id 
// read file 
// check user 
// delete 
// save 
app.delete('/user{/:id}' , (req , res , next)=>{
    try {
        // extract 
        const {id} = req.params
        // read file
        const users = getUsers()
        // check user by id
        const userIndex = users.findIndex((user)=>{
            return user.id === id 

        })
        if(userIndex === -1){
            return res.status(404).json({message : 'User Not Found .'})
        }
        users.splice(userIndex, 1 )
        saveUsers(users)
        res.status(404).json({message : 'User with ID deleted successfully.'})
    } catch (error) {
        return res.status(500).json({message : "Invalid Routing ❌❌❌ " })
            
    }

})

// 4.Create an API that gets a user by their name.
//  The name will be provided as a query parameter. (1 Grade)
// URL: GET /user/getByName

// extract name 
// req.query 
// read
// search  & check
// res .
app.get('/user/getByName' , (req , res , next)=>{
    try {
        // extract name
        const name = req.query.userName

        // read file 
        const users = getUsers()
        
        // check & search
        const result = users.filter((user)=>{
            return user.userName.toLowerCase().includes(name.toLowerCase())
        })
        if (result.length ===0) {
            return res.status(404).json({ message: 'User  Name not found.' });
        }
        res.status(200).json({ message: 'Done Search' , users: result });
        
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong ❌' });
    }

})

// Create an API that gets all users from the JSON file. (1 Grade)
// URL: GET /user

app.get('/user' , (req , res , next)=>{
    // get data 
    // read file 
    // res 
    try {
        const users = getUsers()
        res.status(200).json({message : 'Get All Users' , users : users })
        
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong ❌' });
    }
})


// 6.
// Create an API that filters users by minimum age. (1 Grade)
// URL: GET /user/filter
app.get('/user/filter' , (req , res , next )=>{
    try {
         // minAge
        // extract age 
        const minAge = Number(req.query.age)

        // read file
        const users = getUsers()

        // check
        const results = users.filter((user)=>{
            return user.age >= minAge
        })
        if (results.length ===0) {
                return res.status(404).json({ message: 'No User found.' });
            }
            res.status(200).json({ message: 'Done Search' , users: results });


    } catch (error) {
        
        res.status(500).json({ message: 'Something went wrong ❌' });
    }
    }
)

// 7.
// Create an API that gets User by ID. (1 Grade)
// URL: GET /user/:id

app.get('/user/:id' , (req , res , next)=>{
    try {
        // extract id 
        const {id} = req.params
        // read file 
        const users = getUsers()

        // get user by id 
        const user = users.find((user)=>{
            return user.id === id 
        })
        if(!user){
            return res.status(404).json({ message: 'User  not found.' });
        }
        res.status(200).json({message : "Get User" , user : user})

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong ❌' });
    }

})
// AnyThing (all)

app.all('{/*dummy}' , (req , res , next)=>{
    return res.status(404).json({message : "Invalid application routing ❌"})

})

app.listen(port , ()=>{
    console.log(`Server is Running on port ${port} 🚀🚀🚀🚀🚀🚀`);
    
})

///////////////////////////////////////////////////////////////////////////////////////////////////



























