export class BookUsecase{
    constructor(bookHandler){
        this.handler = bookHandler
    }

    async GetAllBooks(){
        const result = await this.handler.GetAllBooks()
        return result
    }

    async GetBookByIsbn(isbn){
        const result = await this.handler.GetBookByIsbn(isbn)
        return result
    }

    async UpdateBookByIsbn(book){
        const result = await this.handler.UpdateBookByIsbn(book)
        return result
    }
    
    async DeleteBookByIsbn(deleteData){
        const result = await this.handler.DeleteBookByIsbn(deleteData)
        return result
    }

    async InsertBook(book){
        const result = await this.handler.InsertBook(book)
        return result
    }
}

