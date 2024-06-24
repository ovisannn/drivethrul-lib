import newError from "../helpers/newErrorsMessage/newError.js"
import { BookLoanSchema } from "../model/db/bookLoanSchema.js"
import { FormatDateToday,FormatDateWithDays } from "../helpers/dateFormater/dateFormater.js"
import { SearchThis } from "../helpers/Search/search.js"

export class BookLoanUsecase{
    constructor(bookLoanHandler, userHandler, bookHandler){
        this.handler = bookLoanHandler
        this.userHandler = userHandler
        this.bookHandler = bookHandler
    }

    async CreateLoanTicket(insertData, userData) {
        const findUser = await this.userHandler.GetUserByUsername(userData.username)
        
        if(findUser.status != 200){
            return {status : 404, data : newError.UserDoesntExist.message}
        }
       

        const findBook = await this.bookHandler.GetBookByIsbn(insertData.isbn)
        if(findBook.status != 200){
            return {status : 404, data : newError.BookDoesntExist.message}
        }

        const findCopy = await this.bookHandler.GetBookCopyByIsbnAndId(insertData.isbn, insertData.copyID)
        if(findCopy.status != 200){
            return {status : 404, data : newError.CopyDoesntExist.message}
        }

        const today = new Date()

        const insertLoan = {
            username : userData.username,
            isbn : insertData.isbn,
            copyID : insertData.copyID,
            status : 'WAITING CONFIRMATION',
            startDate : FormatDateToday(),
            returnDate : null,
            dueDate : FormatDateWithDays(14)

        }

        let isOccupied = false
        findBook.data.book.copy.forEach(element => {
            if(element.id == insertData.copyID){
                if(element.status == "OCCUPIED"){
                    isOccupied = true
                }
                element.status = "OCCUPIED"}
            });
        
        if(isOccupied){
            return {status : 406, data : newError.CopyIsOccupied.message}
        }
        const updateBook = await this.bookHandler.UpdateBookByIsbn(findBook.data.book)
        const createTicket = await this.handler.CreateLoanTicket(insertLoan)
        return createTicket
    }

    async ReturnLoanBook(id){
        //cek if the loan ticket active => cek loan status
        const result = await this.handler.GetLoanTicketById(id)

        if(result.data === null || result.data === undefined) {
            return {status : 404, data : newError.LoanTicketDoesntExist.message}
        }

        if(result.data.status === "COMPLETED"){
            return {status : 403, data : newError.LoanAlreadyCompleted.message}
        }
        result.data.status = "COMPLETED"
        //update loan ticket
        const updateTicket = await this.handler.UpdateLoanTicket(result.data)
        //update book

        const findBook = await this.bookHandler.GetBookByIsbn(result.data.isbn)
        if(findBook.status != 200){
            return {status : 404, data : newError.BookDoesntExist.message}
        }

        const findCopy = await this.bookHandler.GetBookCopyByIsbnAndId(result.data.isbn, result.data.copyID)
        console.log(findCopy.data.copy.id)
        if(findCopy.status != 200){
            return {status : 404, data : newError.CopyDoesntExist.message}
        }

        findBook.data.book.copy.forEach(element => {
            if(element.id == findCopy.data.copy.id){
                if(element.status == "OCCUPIED"){
                    element.status = "IN LIBRARY"
                }}
            });
        const updateBook = await this.bookHandler.UpdateBookByIsbn(findBook.data.book)

        return {status : 200, data : null}
    }

    async ConfirmLoan(id){
        const result = await this.handler.GetLoanTicketById(id)

        if(result.data === null || result.data === undefined) {
            return {status : 404, data : newError.LoanTicketDoesntExist.message}
        }
        
        if(result.data.status === "COMPLETED"){
            return {status : 403, data : newError.LoanAlreadyCompleted.message}
        }
        
        result.data.status = "READY TO PICK UP"
        // console.log(result)
        //update loan ticket
        const updateTicket = await this.handler.UpdateLoanTicket(result.data)
        return updateTicket
    }

    async PickUpBook(id){
        const result = await this.handler.GetLoanTicketById(id)

        if(result.data === null || result.data === undefined) {
            return {status : 404, data : newError.LoanTicketDoesntExist.message}
        }

        if(result.data.status === "COMPLETED"){
            return {status : 403, data : newError.LoanAlreadyCompleted.message}
        }

        result.data.status = "ACTIVE"
        //update loan ticket
        const updateTicket = await this.handler.UpdateLoanTicket(result.data)
        return updateTicket
    }

    async GetLoanTicketById(id) {
        const result = await this.handler.GetLoanTicketById(id)
        if(result.data === null || result.data === undefined) {
            return {status : 404, data : newError.LoanTicketDoesntExist.message}
        }
        return {status : 200, data : result.data}
    }

    async GetLoanTicketByUsername(username){
        const result = await this.handler.GetLoanTicketByUsername(username)
        if(result.data === null || result.data === undefined) {
            return {status : 404, data : newError.LoanTicketDoesntExist.message}
        }
        return {status : 200, data : result.data}
    }
}