

// logic ..................

import { db } from "../../DB/connection.db.js"

// Create an explicit collection named “books” with a validation rule to 
// ensure that each document has a non-empty “title” field. (0.5 Grade)
export const createBooksCollection =async ()=>{
    const result =  await db.createCollection('Books' , {validator:{ title: {$exists: true,$type: "string", $ne: ""}}})
    return result
}

// Create an implicit collection by inserting data directly into a new collection named
// “authors”. (0.5 Grade)

export const createAuthorCollection =async ()=>{
    const result =await db.collection("authors").insertOne({name:"Author1" , nationality:"British"})
    return result

}

// Create a capped collection named “logs” with a size limit of 1MB. (0.5 Grade)
export const createLogsCollection =async ()=>{
    const result =await db.createCollection('logs' , {capped:true , size : 1048576 ,max:2})
    return result

}
// Create an index on the books collection for the title field. (0.5 Grade)
export const createBooksIndex=async ()=>{
    const result =await db.collection('Books').createIndex({title : 1})
    return result

}
// Insert one document into the books collection. (0.5 Grade)

