import mongoose from "mongoose"
import { Book, BookSchema } from "../db/bookSchema.js"
import { SearchObjectByKey } from "../../helpers/Search/search.js" 
import newError from "../../helpers/newErrorsMessage/newError.js"

export class BookHandler{
    constructor(){
        this.model = mongoose.model("books", BookSchema)
    }

    async GetAllBooks(){
        const result = await this.model.find()
        return {status : 200, data : {books : result}}
    }

    async GetBookByIsbn(isbn){
        const result = await this.model.findOne({isbn : isbn})
        if(result === null || result === undefined){
            return {status : 404, data : newError.BookDoesntExist.message}
        }
        return {status : 200, data : {book : result}}
    }

    async GetBookCopyByIsbnAndId(isbn, copyId){
        const result = await this.model.findOne({isbn : isbn})
        if(result === null || result === undefined){
            return {status : 404, data : newError.BookDoesntExist.message}
        }
        const book = new Book(result)

        const resCopy = SearchObjectByKey(book.copy, "id", copyId)
        
        if(resCopy === null || resCopy === undefined){
            return {status : 404, data : newError.BookDoesntExist.message}
        }

        return {status : 200, data : {copy : resCopy}}
    }

    async UpdateBookByIsbn(insertData){
        // console.log(insertData)
        const result = await this.model.findOneAndUpdate({isbn : insertData.isbn}, insertData, {
            new : true
        })
        return {status: 200, data : result.isbn}
    }
    async DeleteBookByIsbn(deleteData){
        const result = await this.model.deleteOne({isbn : isbn})
        if(result.deletedCount === 0){
            return {status : 404, data : newError.BookDoesntExist.message}
        }
        return {status : 200, data : {message : "Book deleted successfully"}}
    }

    async InsertBook(bookData){
        await this.model.create(insertData)

        const result = await this.model.find()
        return {status : 200, data : result}
    }

}