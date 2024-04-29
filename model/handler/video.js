import mongoose from "mongoose"
import { VideoSchema, Video } from "../db/videoSchema.js"
import { UserSchema } from "../db/userSchema.js"
import { ProductSchema, Product } from "../db/productSchema.js"
import newError from "../../helpers/newErrorsMessage/newError.js"

export class VideoHandler{
    constructor(){
        this.model = mongoose.model("videos", VideoSchema)
        this.modelUser = mongoose.model("users", UserSchema)
        this.modelProduct = mongoose.model("products", ProductSchema)
    }

    async InsertVideo(insertData){
        const video = new this.model(insertData)
        const findUser = await this.modelUser.findOne({username : insertData.username})
        if(findUser === null){
            return {status : 404, data : newError.UserDoesntExist.message}
        }
        try{
            await video.save()
        }catch(error){
            return {status : 500, data : newError.DbFailed.message}
        }
        const insertedVideo =  await this.model.findOne({title : insertData.title, username : insertData.username})

        return {status : 200, data : {_id : insertedVideo._id}}
    }

    //mvp
    async InsertComment(insertComment){
        const data = insertComment
        const findVideo = await this.model.findById(data.videoId)
        if(findVideo === null){
            return {status : 404, data : newError.VideoDoesntExist.message}
        }
        const findUser = await this.modelUser.findOne({username : data.username})
        if(findUser === null){
            return {status : 404, data : newError.UserDoesntExist.message}
        }
        const comment = {
            username : findUser.username,
            comment : data.comment,
            date : Date.now()
        }
        findVideo.comments.push(comment)
        try{
            await findVideo.save()
        }catch(error){
            return {status : 500, data : newError.DbFailed.message}
        }

        return {status : 200, data : "success"}
    }

    //mvp
    async GetVideosThumbnails(){
        const resVideos = await this.model.find()
        if(resVideos === null|| resVideos === undefined){
            return {status : 404, data : newError.VideoDoesntExist.message}
        }
        var resThumbnails = []
        resVideos.map((video)=>{
            const videoObj = new Video(video)
            resThumbnails.push(videoObj.GetVideoThumbnail())
        })

        return {status : 200, data : {tumbnails : resThumbnails}}
    }

    //mvp
    async GetVideoComments(videoId){
        const resVideo = await this.model.findById(videoId)
        if(resVideo === null || resVideo === undefined){
            return {status : 404, data : newError.VideoDoesntExist.message}
        }
        const videoObj = new Video(resVideo)
       
        return {status : 200, data : {comments : videoObj.GetComments()}}
    }

    //mvp
    async GetVideoProducts(videoId){
        const resVideo = await this.model.findById(videoId)
        if(resVideo === null || resVideo === undefined){
            return {status : 404, data : newError.VideoDoesntExist.message}
        }
        const videoObj = new Video(resVideo)
        const productIds = videoObj.GetProducts()
        var products = []

        for (let i = 0; i < productIds.length; i++) {
            const product = await this.modelProduct.findById(productIds[i].prodId.toString())
            const prodObj = new Product(product)
            // console.log(prodObj.GetProduct())
            products.push(prodObj.GetProductsForEachVideo())
          }

        return {status : 200, data : {products: products}}
    }

    async InsertProductIntoVideo(insertData){
        console.log(insertData.productId)
        const resVideo = await this.model.findById(insertData.videoId)
        if(resVideo === null || resVideo === undefined){
            return {status : 404, data : newError.VideoDoesntExist.message}
        }
        const resProduct = await this.modelProduct.findById(insertData.productId)
        if(resProduct === null || resProduct === undefined){
            return {status : 404, data : newError.ProductDoesntExist.message}
        }
        const insert = {
            prodId : insertData.productId
        }
        resVideo.products.push(insert)
        try {
            await resVideo.save()
        }catch(error){
            return {status : 500, data : newError.DbFailed.message}
        }
        return {status : 200, data : "success"}
    }

    async GetVideoById(videoId){
        // console.log(videoId)
        let resVideo = await this.model.findById(videoId)
        if(resVideo === null || resVideo === undefined){
            return {status : 404, data : newError.VideoDoesntExist.message}
        }

        return {status : 200, data : {video : resVideo}}
    }

    async UpdateVideoById(videoId, data){
        const result = await this.model.findByIdAndUpdate(videoId, data, {returnDocument : 'after'}).catch(err=>{
            return newError.DbFailed.message
        })

        if (result === newError.DbFailed.message){
            return {status : 500, data : newError.DbFailed.message}
        }

        return {status : 200, data : {video : result}}
    }

    async DeleteVideoById(videoId){
        await this.model.findByIdAndDelete(videoId).catch(err=>{
            return {status : 500, data : newError.DbFailed.message}
        })

        return {status : 200, data : 'success'}
    }

    async SearchVideo(searchParam){
        const resVideos = await this.model.find({title : { $regex: searchParam, $options : 'i' }})
        if(resVideos === null|| resVideos === undefined){
            return {status : 404, data : newError.VideoDoesntExist.message}
        }
        var resThumbnails = []
        resVideos.map((video)=>{
            const videoObj = new Video(video)
            resThumbnails.push(videoObj.GetVideoThumbnail())
        })

        return {status : 200, data : {tumbnails : resThumbnails}}
    }
}