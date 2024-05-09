import { isEmail } from "../helpers/emailValidation/emailValidation.js"
import newError from "../helpers/newErrorsMessage/newError.js"
import { User } from "../model/db/userSchema.js"
import { ValidatePassword } from "../helpers/hash256/hash.js"
import Jwt from "jsonwebtoken"

export class UserUsecase{
    constructor(userHandler){
        this.handler = userHandler
    }

    async RegisterUser(userData){
        let insertData = userData
        const validateEmail = isEmail(insertData.email)
        if(validateEmail === false){
            return newError.EmailnotValid.message
        }
        const userObj = new User(userData)
        userObj.HashPassword() 
        userObj.SetDefaultUserProfile()
        // console.log(userObj.GetUser())
        const result = await this.handler.RegisterUser(userObj.GetUser())
        return result
    }

    async GetAllUser(){
        const result = await this.handler.GetAllUser()
        // console.log(result)
        return result
    }

    async Login(loginData){
        const result = await this.handler.Login(loginData)
        if(result.status !== 200){
            return result
        }
        const validate = ValidatePassword(loginData.password, result.data.loginUser.password)
        // console.log(validate)
        if(validate === false){
            return {status : 401, data : newError.InvalidCredentials.message}
        }
        //sign token
        const uname = {username : result.data.loginUser.username}
        const token = Jwt.sign(uname, process.env.TOKEN_SEC, {expiresIn : process.env.AUTH_TIMEOUT})
        // console.log(typeof(token))
        return {status : 200, data : {token : token, username : result.data.loginUser.username}}
    }

    async GetUserByUsername(username){
        const result = await this.handler.GetUserByUsername(username)
        return result
    }

    async CheckUsername(username){
        const result = await this.handler.CheckUsername(username)
        return result
    }

    async CheckEmail(email){
        const result = await this.handler.CheckEmail(email)
        return result
    }
}