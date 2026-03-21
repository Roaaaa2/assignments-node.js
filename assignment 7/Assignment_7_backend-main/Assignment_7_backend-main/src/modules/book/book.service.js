// Logic

import { BooksModel } from "../../DB/model/book.model.js"
import { LogsModel } from "../../DB/model/log.model.js"
// Insert one document into the books collection. (0.5 Grade)

export const InsertDocumentInBooks =async (inputs)=>{
    const result = await BooksModel.insertOne(inputs)
    return result
}

// Insert multiple documents into the books collection with at least three records. (0.5 Grade)
export const InsertDocumentsInBooks =async (inputs)=>{
    const result = await BooksModel.insertMany(inputs)
    return result
}

// 8.
// Update the book with title “Future” change the year to be 2022. (0.5 Grade)
export const updateBookWithTitle =async (inputs)=>{
    const {title , year} = inputs
    const result = await BooksModel.updateOne({title: title} ,{$set:{year: year}}  )
    if(!result.matchedCount){
        throw new Error('Not Matched On DB .' , {cause:{state:404}})
    }
    return result
}

// 9.
// Find a Book with title “Brave New World”. (0.5 Grade)

export const getBooksWithTitle =async (title)=>{
    const result = await BooksModel.find({title} ).toArray()
    if(!result.length){
        throw new Error('Not Matched On DB .' , {cause:{state:404}})
    }
    return result
}

// 10.
// Find all books published between 1990 and 2010. (0.5 Grade)

export const getBooksWithYears =async (from , to )=>{

    const result = await BooksModel.find( {year:{ $gt: from, $lt: to }} ).toArray()
    if(!result.length){
        throw new Error('No books found in this year range' , {cause:{state:404}})
    }
    return result
}


// 11.
// Find books where the genre includes "Science Fiction".(0.5 Grade)
// •
// URL: /books/genre?genre=Science Fiction

export const getBooksWithGenre =async (genre )=>{

    const result = await BooksModel.find( {genres: genre} ).toArray()
    if(!result.length){
        throw new Error('No books found in this ' , {cause:{state:404}})
    }
    return result
}


// 12.
// Skip the first two books, limit the results to the next three, sorted by year in descending order. (0.5 Grade)
// •
// URL: GET /books/skip-limit

// skip(2)
//limit(3)
//sort(year: -1)


export const getBooksWithRules =async (genre )=>{

    const result = await BooksModel.find({}).skip(2).limit(3).sort({year:-1}).toArray()
    if(!result.length){
        throw new Error('No books found in this ' , {cause:{state:404}})
    }
    return result
}


// 13.
// Find books where the year field stored as an integer. (0.5 Grade)


export const getBooksWithYearInteger =async ()=>{

    const result = await BooksModel.find({year:{$type:"int"}}).toArray()
    if(!result.length){
        throw new Error('No books found in this ' , {cause:{state:404}})
    }
    return result
}

// 14.
// Find all books where the genres field does not include any of the genres "Horror" or "Science Fiction". (0.5 Grade)

//nin ???


export const getBooksWithExcludeGenres =async ()=>{

    const result = await BooksModel.find({genres: { $nin: ["Horror", "Science Fiction"] }}).toArray()
    if(!result.length){
        throw new Error('No books found in this ' , {cause:{state:404}})
    }
    return result
}

// 15.
// Delete all books published before 2000. (0.5 Grade)

export const deleteBooksBefore2000=async (year)=>{

    const result = await BooksModel.deleteMany({ year : {$lt : year }})
    if(!result.deletedCount){
        throw new Error('No books found in this ' , {cause:{state:404}})
    }
    return result
}

// 16.
// Using aggregation Functions, Filter books published after 2000 and sort them by year descending. (0.5 Grade)

export const GetWithAggregate1 =async()=>{

    const result =await  BooksModel.aggregate(
        [
            {
                $match:{year: {$gt:2000 }}

            },
            {
                $sort:{year:-1}

            }
        ]
    ).toArray()
    if(!result.length){
        throw new Error('No books found in this ' , {cause:{state:404}})
    }

    return result
}

// 17.
// Using aggregation functions,
//  Find all books published after the year 2000. For each matching book, 
// show only the title, author, and year fields. (0.5 Grade)
export const GetWithAggregate2 =async()=>{

    const result =await BooksModel.aggregate(
        [
            {
                $match:{year: {$gt:2000 }}

            },
            {
                $project:{
                    title:1 , author:1 , year:1 , _id:0

                }
            },
            {
                $sort:{year:-1}

            }
        ]
    ).toArray()
    if(!result.length){
        throw new Error('No books found in this ' , {cause:{state:404}})
    }

    return result
}


// 18.
// Using aggregation functions,break an array of genres into separate documents. (0.5 Grade)
export const GetWithAggregate3 =async()=>{

    const result = await BooksModel.aggregate([
        {
            $unwind: "$genres"
        },
        {
            $project:{
                title:1 , genres:1 , _id:0
            }
        }
    ]).toArray();
    if(!result.length){
        throw new Error('No books found in this ' , {cause:{state:404}})
    }

    return result
}

// 19.
// Using aggregation functions, Join the books collection with the logs collection. (1 Grade)
// export const GetWithAggregate4 =async()=>{

//     const result = await BooksModel.aggregate([
//         {
//             $lookup: {
//                 from: "logs",        // اسم الـ collection التاني
//                 localField: "_id",     // field في books
//                 foreignField: "book_id",// field في logs
//                 as: "logs"
//             }
//         }
//     ]).toArray();
//     if(!result.length){
//         throw new Error('No books found in this ' , {cause:{state:404}})
//     }

//     return result
// }


export const GetWithAggregate4 =async()=>{

    const result = await LogsModel.aggregate([
        
        {$lookup: {
                from: "books",      
                localField: "book_id",     
                foreignField: "_id",
                as: "bookDetails"
            },
        },
        
        {
                $project:{
                    _id:0 , book_id:0

                }
        }
        
    ]).toArray();
    if(!result.length){
        throw new Error('No books found in this ' , {cause:{state:404}})
    }

    return result
}









