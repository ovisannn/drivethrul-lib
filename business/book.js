export class BookUsecase{
    constructor(bookHandler){
        this.handler = bookHandler
    }

    async GetAllBooks(){
        const result = await this.handler.GetAllBooks()
        return result
    }
}

