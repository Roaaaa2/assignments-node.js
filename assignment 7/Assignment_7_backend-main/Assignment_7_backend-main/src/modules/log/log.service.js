

// Insert a new log into the logs collection. (0.5 Grade)
// URL: POST /logs

import { LogsModel } from "../../DB/model/log.model.js"


export const InsertDocumentInLogs =async (inputs)=>{
    const result = await LogsModel.insertOne(inputs)
    return result
}