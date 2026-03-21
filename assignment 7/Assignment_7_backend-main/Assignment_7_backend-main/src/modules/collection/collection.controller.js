import {Router} from 'express'
import { createAuthorCollection, createBooksCollection, createBooksIndex, createLogsCollection } from './collection.service.js'
// import { login, signup } from './auth.service.js'
const router = Router() // app

// URL: POST /collection/books
router.post('/books' , async(req , res , next)=>{
    const create = await createBooksCollection()
    return res.status(201).json({message: "Create Done"}) 
     // create return ❌❌because error Converting circular structure to JSON\n 

})

// URL: POST /collection/authors
router.post('/authors' , async(req , res , next)=>{
    const create = await createAuthorCollection()
    return res.status(201).json({message: "Create Done" })

})

// URL: POST /collection/logs/capped

router.post('/logs/capped' , async(req , res , next)=>{
    const create = await createLogsCollection()
    return res.status(201).json({message: "Create Done" , create}) 
    // create return ❌❌because error Converting circular structure to JSON\n 

})

// URL: POST /collection/books/index

router.post('/books/index' , async(req , res , next)=>{
    const create = await createBooksIndex()
    return res.status(201).json({message: "Create Done" , create}) 
})

// •
// URL: POST /books

export default router













