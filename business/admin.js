import { isEmail } from "../helpers/emailValidation/emailValidation.js"
import newError from "../helpers/newErrorsMessage/newError.js"
import { AdminSchema } from "../model/db/adminSchema.js"
import { ValidatePassword } from "../helpers/hash256/hash.js"
import Jwt from "jsonwebtoken"

export class AdminUsecase{
    constructor(adminHandler){
        this.handler = adminHandler
    }

    async Login(loginData){
        const result = await this.handler.Login(loginData)
        if(result.status !== 200){
            return result
        }
        const validate = ValidatePassword(loginData.password, result.data.loginAdmin.password)
        // console.log(validate)
        if(validate === false){
            return {status : 401, data : newError.InvalidCredentials.message}
        }
        //sign token
        const token = Jwt.sign(result.data, process.env.TOKEN_SEC, {expiresIn : process.env.AUTH_TIMEOUT})
        // console.log(typeof(token))
        return {status : 200, data : {token : token, username : result.data.loginAdmin.username}}
    }

    async GetAdminByUsername(username){
        const result = await this.handler.GetAdminByUsername(username)
        return result
    }
}