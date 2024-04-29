import { Product } from "../model/db/productSchema.js"
import { BaseResponse } from "./baseResponse.js"

export class ProductController{
    constructor(productUsecase){
        this.usecase = productUsecase
    }

    async InsertProductController(req, res){
        const reqProduct = req.body
        // console.log(reqProduct)
        const productObj = new Product(reqProduct)
        const result = await this.usecase.InsertProduct(productObj)
        const newResponse = new BaseResponse(result.status, result.data)
        return res.status(newResponse.GetStatus()).json(newResponse.GetResponse())
    }

    async GetAllProductsController(req, res){
        const result = await this.usecase.GetAllProducts()
        const newResponse = new BaseResponse(result.status, result.data)
        return res.status(newResponse.GetStatus()).json(newResponse.GetResponse())
    }

    async UpdateProductByIdController(req, res){
        const productId = req.params.productId
        const data = req.body
        const result = await this.usecase.UpdateProductById(productId, data)
        const newResponse = new BaseResponse(result.status, result.data)
        return res.status(newResponse.GetStatus()).json(newResponse.GetResponse())
    }

    async DeleteProductByIdController(req, res){
        const productId = req.params.productId
        const result = await this.usecase.DeleteProductById(productId)
        const newResponse = new BaseResponse(result.status, result.data)
        return res.status(newResponse.GetStatus()).json(newResponse.GetResponse())        
    }
}