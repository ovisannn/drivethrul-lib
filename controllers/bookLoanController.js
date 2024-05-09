import { BaseResponse } from "./baseResponse.js";
import { BookLoan } from "../model/db/bookLoanSchema.js"

export class BookLoanController{
    constructor(bookLoanUsecase){
        this.usecase = bookLoanUsecase
    }

    async CreateLoanTicketController(req, res){
        const bookLoanObj = new BookLoan(req.body)
        const result = await this.usecase.CreateLoanTicket(bookLoanObj, req.user)

        const newResponse = new BaseResponse(result.status, result.data)
        return res.status(newResponse.GetStatus()).json(newResponse.GetResponse())

    }

    async ReturnLoanBookTicketController(req, res){
        const reqs = req.params.id
        const result = await this.usecase.ReturnLoanBook(reqs)

        const newResponse = new BaseResponse(result.status, result.data)
        return res.status(newResponse.GetStatus()).json(newResponse.GetResponse())
    }
}