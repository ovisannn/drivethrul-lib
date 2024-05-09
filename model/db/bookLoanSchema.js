import mongoose from "mongoose";

export const BookLoanSchema = mongoose.Schema({
    isbn : {
        type : String,
        require : true
    },
    copyID : {
        type : String,
        require : true
    },
    username : {
        type : String,
        require : true
    },
    status : String,
    startDate : Date,
    returnDate : Date,
    dueDate : Date
})

export class BookLoan{
    constructor(data){
        this.isbn = data.isbn
        this.copyID = data.copyID
        this.username = data.username
        this.status = data.status
        this.startDate = data.startDate
        this.returnDate = data.returnDate
        this.dueDate = data.dueDate
    }
}