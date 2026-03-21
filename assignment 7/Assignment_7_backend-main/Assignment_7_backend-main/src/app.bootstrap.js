import express from 'express'


// file config ............................................
import { NODE_ENV, port } from '../config/config.service.js'

import { connectDB } from './DB/connection.db.js';

import { collectionRouter } from './modules/collection/index.js';
import { booksRouter } from './modules/book/index.js';
import { logsRouter } from './modules/log/index.js';

console.log({NODE_ENV});
async function bootstrap(){
const app = express()

// convert buffer data .....................
app.use(express.json())

// DB Check connect ...

await connectDB()

//application routing ......................
app.get('/' , (req , res , next )=>{
    res.send('Hello')
    
})

// Routing.........................

app.use('/collection',collectionRouter)
app.use('/books',booksRouter)
app.use('/logs', logsRouter)

// invalid routing ....................
app.use('{/*dummy}' , (req , res , next)=>{
        return res.status(404).json({message : "invalid routing "})
})
// Handle Error ....................
app.use((error ,  req , res , next )=>{

    const status = error.cause?.status?? 500

    return res.status(status).json({
        error_message :   status == 500? 'something went wrong ': error.message ??'something went wrong ',
        // Node-Env ...........................................(development OR  production )
        stack : NODE_ENV == 'development' ? error.stack : undefined
    })
})
app.listen(port , ()=>{
    console.log(`Listening on port ${port} 🚀🚀🚀🚀`);
    
})
}
export default bootstrap