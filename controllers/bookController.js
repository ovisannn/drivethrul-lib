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
}