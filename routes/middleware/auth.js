import Jwt from "jsonwebtoken";
import { BaseResponse } from "../../controllers/baseResponse.js";
import newError from "../../helpers/newErrorsMessage/newError.js";

export class CostumJwt{
    constructor(){
        this._secretKey = process.env.TOKEN_SEC
    }

    CookieJwtAuth(req, res, next){
        const token = req.cookies.token? req.cookies.token : req.body.token
       // console.log(token)
        try{
            const user = Jwt.verify(token, this._secretKey)
            req.user = user
            next()
        }catch(er){
            // console.log(er)
            res.clearCookie("token")
            const newResponse = new BaseResponse(401, newError.UnauthorizedError.message)
            return res.status(newResponse.GetStatus()).json(newResponse.GetResponse())
        }
    }
}