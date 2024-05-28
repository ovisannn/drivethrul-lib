import mongoose from "mongoose";

export const supportSchema =mongoose.Schema({
    ticketSubject: String,
    email: String,
    priority: String,
    createdAt: Date,
    message: String,
    status: String,
    reply:[{
        replyDate: Date,
        usernames: String,
        replyMessage: String
    }]
})

export class SupportTicket{
    constructor(data){
        this._id = data._id? data._id : null
        this.ticketSubject = data.ticketSubject
        this.email = data.email
        this.priority = data.priority
        this.createdAt = data.createdAt
        this.message = data.message
        this.status = data.status
        this.reply = data.reply? data.reply : []
    }
}
