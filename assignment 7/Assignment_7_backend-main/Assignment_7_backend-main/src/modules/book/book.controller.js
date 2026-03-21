
import {Router} from 'express'
import { deleteBooksBefore2000, getBooksWithExcludeGenres, getBooksWithGenre, getBooksWithRules, getBooksWithTitle, getBooksWithYearInteger, getBooksWithYears, GetWithAggregate1, GetWithAggregate2, GetWithAggregate3, GetWithAggregate4, InsertDocumentInBooks, InsertDocumentsInBooks, updateBookWithTitle } from './book.service.js'


const router = Router() // app

// URL: POST /books
router.post('/' , async(req , res , next)=>{
    const create = await InsertDocumentInBooks(req.body)
    return res.status(201).json({message:'Insert Document Successfully😊😊 ' , create })
})

// URL: POST /books/batch
router.post('/batch' , async(req , res , next)=>{
    const create = await InsertDocumentsInBooks(req.body)
    return res.status(201).json({message:'Insert Document Successfully😊😊 ' , create })
})

// URL: PATCH/books/Future
router.patch('/Future' , async(req , res , next)=>{
    const result = await updateBookWithTitle(req.body)
    return res.status(201).json({message:'Update Document Successfully😊😊 ' , result })
})

// URL: GET /books/title => /books/title?title=Brave New World
// req.query.title......

router.get('/title' , async(req , res , next)=>{
    const result = await getBooksWithTitle(req.query.title)
    return res.status(200).json({message:'Get Document Successfully😊😊 ' , result })
})


// URL: GET /books/year => /books/year?from=1990&to=2010

router.get('/year' , async(req , res , next)=>{
    const from = Number(req.query.from);
    const to = Number(req.query.to);
    const result = await getBooksWithYears(from, to)
    return res.status(200).json({message:'Get Document Successfully😊😊 ' , result })
})

// •
// URL: GET/books/genre?genre=Science Fiction

router.get('/genre' , async(req , res , next)=>{
    const result = await getBooksWithGenre(req.query.genre)
    return res.status(200).json({message:'Get Document Successfully😊😊 ' , result })
})

// •
// URL: GET /books/skip-limit

router.get('/skip-limit' , async(req , res , next)=>{
    const result = await getBooksWithRules()
    return res.status(200).json({message:'Get Document Successfully😊😊 ' , result })
})
// URL: GET /books/year-integer
router.get('/year-integer' , async(req , res , next)=>{
    const result = await getBooksWithYearInteger()
    return res.status(200).json({message:'Get Document Successfully😊😊 ' , result })
})


// URL: GET /books/exclude-genres    

router.get('/exclude-genres' , async(req , res , next)=>{
    const result = await getBooksWithExcludeGenres()
    return res.status(200).json({message:'Get Document Successfully😊😊 ' , result })
})


// DELETE: GET /books/before-year?year=2000  

router.delete('/before-year' , async(req , res , next)=>{  // string
    const year = Number(req.query.year); // Number
    const result = await deleteBooksBefore2000(year)
    return res.status(200).json({message:'Delete Document Successfully😊😊 ' , result })
})

// URL: GET /books/aggregate1
router.get('/aggregate1' , async(req , res , next)=>{  // string
    const result =  await GetWithAggregate1()
    return res.status(200).json({message:'Get Document Successfully😊😊 ' , result})
})

// URL: GET /books/aggregate2

router.get('/aggregate2' , async(req , res , next)=>{  // string
    const result =  await GetWithAggregate2()
    return res.status(200).json({message:'Get Document Successfully😊😊 ' , result})
})
// •
// URL: GET /books/aggregate3
router.get('/aggregate3' , async(req , res , next)=>{  // string
    const result =  await GetWithAggregate3()
    return res.status(200).json({message:'Get Document Successfully😊😊 ' , result})
})
// •
// URL: GET /books/aggregate4

router.get('/aggregate4' , async(req , res , next)=>{  // string
    const result =  await GetWithAggregate4()
    return res.status(200).json({message:'Get Document Successfully😊😊 ' , result})
})

export default router 

