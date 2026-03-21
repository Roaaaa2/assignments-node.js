
import {Router} from 'express'

import { InsertDocumentInLogs } from './log.service.js'

const router = Router() // app

// URL: POST /logs
router.post('/' , async(req , res , next)=>{
    const create = await InsertDocumentInLogs(req.body)
    return res.status(201).json({message:'Insert Document Successfully😊😊 ' , create })
})

export default router 