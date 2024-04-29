export class ProductUsecase{
    constructor(productHandler){
        this.handler = productHandler
    }

    async InsertProduct(productData){
        const insertData = productData
        const result = this.handler.InsertProduct(insertData)
        return result
    }

    async GetAllProducts(){
        const result = await this.handler.GetAllProducts()
        return result
    }

    async UpdateProductById(productId, data){
        const result = await this.handler.UpdateProductById(productId, data)
        return result
    }

    async DeleteProductById(productId){
        const result = await this.handler.DeleteProductById(productId)
        return result
    }
}