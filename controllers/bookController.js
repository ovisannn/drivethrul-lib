import { Book } from "../model/db/bookSchema.js";
import { BaseResponse } from "./baseResponse.js";

export class BookController{
    constructor(bookUsecase){
        this.usecase = bookUsecase
    }

    async GetAllBooksController(req, res){
        const result = await this.usecase.GetAllBooks()
        const newResponse = new BaseResponse(result.status, result.data)
        return res.status(newResponse.GetStatus()).json(newResponse.GetResponse())
    }

    async GetBookByIsbnController(req, res){
        const isbn = req.params.isbn
        const result = await this.usecase.GetBookByIsbn(isbn)
        const newResponse = new BaseResponse(result.status, result.data)
        return res.status(newResponse.GetStatus()).json(newResponse.GetResponse())
    }

    async UpdateBookByIsbnController(req, res){
        const reqBook = req.body
        const result = await this.usecase.UpdateBookByIsbn(reqBook)
        const newResponse = new BaseResponse(result.status, result.data)
        return res.status(newResponse.GetStatus()).json(newResponse.GetResponse())
    }
    async DeleteBookByIsbnController(req, res){
        const isbn = req.params.isbn
        const result = await this.usecase.DeleteBookByIsbn(isbn)
        const newResponse = new BaseResponse(result.status, result.data)
        return res.status(newResponse.GetStatus()).json(newResponse.GetResponse())
    }

    async InserBookController(req, res){
        const reqBook = req.body
        const result = await this.usecase.InsertBook(reqBook)
        const newResponse = new BaseResponse(result.status, result.data)
        return res.status(newResponse.GetStatus()).json(newResponse.GetResponse())
    }
}