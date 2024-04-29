import { User } from "../model/db/userSchema.js"
import { BaseResponse } from "./baseResponse.js"

export class UserController{
    constructor(userUsecase){
        this.usecase = userUsecase
    }

    async RegisterUserController(req, res){
        const userObj = new User(req.body)
        const userData = userObj.GetUser()
        const result = await this.usecase.RegisterUser(userData)
        const newResponse = new BaseResponse(result.status, result.data)
        return res.status(newResponse.GetStatus()).json(newResponse.GetResponse())
    }

    async GetAllUserController(req, res){
        const result = await this.usecase.GetAllUser()
        const newResponse = new BaseResponse(result.status, result.data)
        return res.status(newResponse.GetStatus()).json(newResponse.GetResponse())
    }

    async LoginController(req, res){
        const result = await this.usecase.Login(req.body)
        const token = result.data.token
        res.cookie("token", token, {
            httpOnly: false
        })
        const newResponse = new BaseResponse(result.status, result.data.token? result.data : result.data)
        return res.status(newResponse.GetStatus()).json(newResponse.GetResponse())
    }

    async GetUserByUsernameController (req, res){
        const username = req.params.username
        const result = await this.usecase.GetUserByUsername(username)
        const newResponse = new BaseResponse(result.status, result.data)
        return res.status(newResponse.GetStatus()).json(newResponse.GetResponse())
    }

    async CheckUsernameController (req, res){
        const username = req.params.username
        const result = await this.usecase.CheckUsername(username)
        const newResponse = new BaseResponse(result.status, result.data)
        return res.status(newResponse.GetStatus()).json(newResponse.GetResponse())
    }

    async CheckEmailController (req, res){
        const email = req.params.email
        const result = await this.usecase.CheckEmail(email)
        const newResponse = new BaseResponse(result.status, result.data)
        return res.status(newResponse.GetStatus()).json(newResponse.GetResponse())
    }
}