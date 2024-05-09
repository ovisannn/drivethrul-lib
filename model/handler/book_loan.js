import mongoose, { mongo } from "mongoose";
import { BookLoanSchema } from "../db/bookLoanSchema.js";
import newError from "../../helpers/newErrorsMessage/newError.js";

export class BookLoanHandler{
    constructor(){
        this.model = mongoose.model("book_loan", BookLoanSchema)
    }

    async CreateLoanTicket(insertData){
        await this.model.create(insertData)

        const result = await this.model.find()
        return {status : 200, data : result}
    }

    async GetLoanTicketById(id){
        const result = await this.model.find(id)
        if(result === null || result === undefined) {
            return {status : 404, data : newError.LoanTicketDoesntExist.message}
        }
        return {status : 200, data : result}
    }

    async UpdateLoanTicket(insertData){
        const result = await this.model.findOneAndUpdate({id : insertData.id}, insertData, {
            new : true
        })
        return {status: 200, data : result.isbn}
    }
}