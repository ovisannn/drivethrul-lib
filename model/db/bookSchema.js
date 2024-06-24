import mongoose from "mongoose";

export const BookSchema = mongoose.Schema({
    title : String,
    isbn : String,
    pageCount : Number,
    publishedDate : Date,
    thumbnailUrl : String,
    shortDescription : String,
    longDescription : String,
    status : String,
    authors : [String],
    categories : [String],
    copy : [{
        "id" : String,
        "status" : String
    }]
})

export class Book{
    constructor(data){
        this._id = data._id?  data._id : null
        this.title = data.title
        this.isbn = data.isbn
        this.pageCount = data.pageCount
        this.publishedDate = data.publishedDate
        this.thumbnailUrl = data.thumbnailUrl
        this.shortDescription = data.shortDescription
        this.longDescription = data.longDescription
        this.status = data.status
        this.copy = data.copy
    }

    GetBook(){
        return this
    }
}