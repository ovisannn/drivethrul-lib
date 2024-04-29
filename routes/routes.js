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
        this.app.get('/user/getAll', (req, res)=>{
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

        //video routes
        //delete video param = video id
        this.app.delete('/video/delete/videoId', (req, res, next)=>{
            this.controllerList.authHandler.CookieJwtAuth(req, res, next)
        }, (res, req)=>{
            this.controllerList.video.DeleteVideoByIdController(req, res)
        })
        //update video req = {video property} param = viedo id
        this.app.put('/video/update/:videoId', (req, res, next)=>{
            this.controllerList.authHandler.CookieJwtAuth(req, res, next)
        }, (res, req)=>{
            this.controllerList.video.UpdateVideoByIdController(req, res)
        })
        //add comment req = {username, comment, video._id, token} res={success/fail}*** 
        this.app.post('/video/comment/insert', (req, res, next)=>{
            this.controllerList.authHandler.CookieJwtAuth(req, res, next)
        }, (req, res)=>{
            return this.controllerList.video.InsertCommentController(req, res)
        })
        //get thumbnail res = [{video._id, videoUrl thumbnail}] ***
        this.app.get('/video/thumbnails', (req, res)=>{
            return this.controllerList.video.GetVideosThumbnailsController(req, res)
        })            
        //get product list req = {video._id} res = {product_id, linkproduct, title, price}***
        this.app.get('/video=:videoId/products', (req, res)=>{
            return this.controllerList.video.GetVideoProductsController(req, res)
        })
        //get comment list req = {video._id} res = {username, comment, date}***
        this.app.get('/video=:videoId/comment', (req, res)=>{
            return this.controllerList.video.GetVideoCommentsController(req, res)
        })
        //insert video req = { title, videoUrl, thumbnailUrl, description, username }
        this.app.post('/video/insert', (req, res)=>{
            return this.controllerList.video.InsertVideoController(req, res)
        })
        //post insert product in to video req = {videoId, productId}
        this.app.post('/video/product/insert', (req, res)=>{
            return this.controllerList.video.InsertProductIntoVideoController(req, res)
        })
        //get video by id param = {videoId}
        this.app.get('/video/:videoId', (req, res)=>{
            return this.controllerList.video.GetVideoByIdController(req, res)
        })
        //search video
        this.app.get('/video/search/:searchParam', (req, res)=>{
            return this.controllerList.video.SearchVideoController(req, res)
        })

        //product routes
        //insert product req = { name, username, url, description, price }
        this.app.post('/product/insert', (req, res)=>{
            return this.controllerList.product.InsertProductController(req, res)
        })
        //get all product
        this.app.get('/product/getAll', (req, res)=>{
            return this.controllerList.product.GetAllProductsController(req, res)
        }) 
        //update product by id
        this.app.put('/product/update/:productId', (req, res, next)=>{
            return this.authHandler.CookieJwtAuth(req, res, next)
        }, (req, res)=>{
            return this.controllerList.product.UpdateProductByIdController(req, res)
        })
        //delete product by id
        this.app.delete('/product/delete/:productId', (req, res, next)=>{
            return this.authHandler.CookieJwtAuth(req, res, next)
        }, (req, res)=>{
            return this.controllerList.product.DeleteProductByIdController(req, res)
        })
    }
}