import mongoose from "mongoose"
import { BookSchema } from "../db/bookSchema.js"
import newError from "../../helpers/newErrorsMessage/newError.js"

export class BookHandler{
    constructor(){
        this.model = mongoose.model("books", BookSchema)
    }

    async GetAllBooks(){
        const result = await this.model.find()
        return {status : 200, data : {books : result}}
    }
}