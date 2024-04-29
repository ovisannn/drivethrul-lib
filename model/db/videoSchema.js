import mongoose from "mongoose";
// import { ObjectId } from "mongodb";

export const VideoSchema = mongoose.Schema({
    title : String,
    videoUrl : {
        type : String,
        require : true
    },
    thumbnailUrl : String,
    description : String,
    username : {
        type : String,
        require : true
    },
    products : [{
        prodId : mongoose.Schema.ObjectId
    }],
    comments : [{
        username : String,
        comment : String,
        date : Date
    }],
    createdAt : Date,
    updatedAt : Date
})

export function VideoModel(){
    return mongoose.model('videos', VideoSchema)
}

export class Video{
    constructor(data){
        this._id = data._id?  data._id : null
        this.title = data.title
        this.videoUrl = data.videoUrl
        this.thumbnailUrl = data.thumbnailUrl
        this.description = data.description
        this.username = data.username
        this.products = data.products? data.products : []
        this.comments = data.comments? data.comments : []
        this.createdAt = data.createdAt? data.createdAt : new Date()
        this.updatedAt = data.updatedAt? data.updatedAt : new Date()
    }

    GetVideo(){
        return this
    }

    GetVideoThumbnail(){
        //get thumbnail res = [{video._id, videoUrl thumbnail}]
        return {
            _id : this._id,
            videoUrl : this.videoUrl,
            thumbnailUrl : this.thumbnailUrl,
            title : this.title,
            username : this.username
        }
    }

    GetComments(){
        return this.comments
    }

    GetProducts(){
        return this.products
    }
}