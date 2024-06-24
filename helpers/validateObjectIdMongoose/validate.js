import { ObjectId } from "mongodb"
import mongoose from "mongoose"

export function ValidateId(stringId){
    if(mongoose.Types.ObjectId.isValid(stringId)){
        if((String)(new ObjectId(stringId)) === stringId)
        return true
    }
    return false
}