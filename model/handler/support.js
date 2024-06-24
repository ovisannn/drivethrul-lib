import { supportSchema } from "../db/supportSchema";

export class SupportHandler{
    constructor(){
        this.model = mongoose.model("support_tickets", supportSchema)
    }

    async CreateSupportTicket(insertData){
        const insertTicket = new this.model(insertData)
        try{await insertTicket.save()}
        catch(err){
            return {status : 500, data : newError.DbFailed.message}
        }
        return {status : 200}
    }

    async GetAllSupportTickets(){
        const result = await this.model.find()
        if(result === null || result === undefined){
            return {status : 404, data : newError.SupportTicketDoesntExist.message}
        }
        return {status : 200, data : result}
    }
    
    async GetSupportTicketById(id){
        const result = await this.model.findById(id)
        if(result === null || result === undefined){
            return {status : 404, data : newError.SupportTicketDoesntExist.message}
        }
        return {status : 200, data : result}
    }

    async PatchSupportTicket(insertData){
        const result = await this.model.findOneAndUpdate({_id : insertData.id}, insertData, {
            new : true
        })
        if(result === null || result === undefined){
            return {status : 404, data : newError.SupportTicketDoesntExist.message}
        }
        return {status : 200, data : result._id}
    }

    async DeleteSupportTicket(id){
        const result = await this.model.findByIdAndDelete(id)
        if(result === null || result === undefined){
            return {status : 404, data : newError.SupportTicketDoesntExist.message}
        }
        return {status : 200, data : result._id}
    }
}