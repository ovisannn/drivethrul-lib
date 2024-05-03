import mongoose from "mongoose";
import { AdminSchema } from "../db/adminSchema.js";
import newError from "../../helpers/newErrorsMessage/newError.js";

export class AdminHandler{
    constructor(){
        this.model = mongoose.model("administrator" ,AdminSchema)
    }

    async AdminLogin(loginInsert){
        const loginAdmin = await this.model.findOne({username : loginInsert.username})
        if(loginAdmin == null || loginAdmin == undefined){
            return {status : 404, data : newError.UserDoesntExist.message}
        }
        return {status : 200, data : {loginAdmin}}
    }
}