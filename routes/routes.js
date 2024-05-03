export class Router{
    constructor(app, controllerList){
        this.app = app
        this.controllerList = controllerList
    }

    routes(){
        //book
        this.app.get('/books', (req, res) => {
            return this.controllerList.book.GetAllBooksController(req, res)
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