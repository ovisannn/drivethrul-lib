export class Router{
    constructor(app, controllerList){
        this.app = app
        this.controllerList = controllerList
    }

    routes(){
        //loan ticket
        //ok
        this.app.post('/loan/ticket/create',(req, res, next) =>{
            return this.controllerList.authHandler.CookieJwtAuth(req, res, next)
        }, (req, res) =>{
            return this.controllerList.bookLoan.CreateLoanTicketController(req, res)
        })

        //ok
        this.app.patch('/loan/ticket/:id/return',(req, res, next) =>{
            return this.controllerList.authHandler.CookieJwtAuth(req, res, next)
        }, (req, res)=>{
            return this.controllerList.bookLoan.ReturnLoanBookTicketController(req, res)
        })

        //ok
        this.app.patch('/loan/ticket/:id/confirm',(req, res, next) => {
            return this.controllerList.authHandler.CookieJwtAuth(req, res, next)
        }, (req, res) => {
            return this.controllerList.bookLoan.ConfirmLoanController(req, res)
        })

        //ok
        this.app.patch('/loan/ticket/:id/pickup',(req, res, next) => {
            return this.controllerList.authHandler.CookieJwtAuth(req, res, next)
        }, (req, res) => {
            return this.controllerList.bookLoan.PickUpBookController(req, res)
        })

        //ok
        this.app.get('/loan/ticket/:id',(req, res) => {
            return this.controllerList.bookLoan.GetLoanTicketById(req, res)
        })

        this.app.get('/loan/tickets/:username', (req, res) => {
            return this.controllerList.bookLoan.GetLoanTicketByUsername(req, res)
        })

        //book
        //ok
        this.app.get('/books', (req, res) => {
            return this.controllerList.book.GetAllBooksController(req, res)
        })

        //ok
        this.app.get('/book/:isbn', (req, res) => {
            return this.controllerList.book.GetBookByIsbnController(req, res)
        })

        this.app.patch('/book/:isbn', (req, res) => {
            return this.controllerList.book.UpdateBookByIsbnController(req, res)
        })

        this.app.delete('/book/:isbn', (req, res) => {
            return this.controllerList.book.DeleteBookByIsbnController(req, res)
        })

        this.app.post('/book/add', (req, res)=>{
            return this.controllerList.book.InsertBookController(req, res)
        })


        //user routes
        //register user req = {username, email, password} -> aman
        this.app.post('/user/register', (req, res)=>{
            return this.controllerList.user.RegisterUserController(req, res)
        })
        //get all user
        this.app.get('/user/getAll',(req, res, next)=>{
            return this.controllerList.authHandler.CookieJwtAuth(req, res, next)
        }, (req, res)=>{
            return this.controllerList.user.GetAllUserController(req, res)
        })
        //login req = {username, password} => aman
        this.app.post('/user/login', (req, res)=>{
            return this.controllerList.user.LoginController(req, res)
        })
        //get user by username req = {username}
        this.app.get("/user/:username", (req, res)=>{
            return this.controllerList.user.GetUserByUsernameController(req,res)
        })
        //check username is exist
        this.app.get("/user/username/check/:username", (req, res)=>{
            return this.controllerList.user.CheckUsernameController(req, res)
        })
        //check email is exist
        this.app.get("/user/email/check/:email", (req, res)=>{
            return this.controllerList.user.CheckEmailController(req, res)
        })
    }
}