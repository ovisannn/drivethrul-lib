export class supportUseCase{
    constructor(supportHandler){
        this.handler = supportHandler
    }

    async GetAllSupport(){
        const result = await this.handler.GetAllSupport()
        return result
    }

    async GetSupportById(id){
        const result = await this.handler.GetSupportById(id)
        return result
    }

    async CreateSupport(insertData){
        const result = await this.handler.CreateSupport(insertData)
        return result
    }

    async UpdateSupport(id, updateData){
        const result = await this.handler.UpdateSupport(id, updateData)
        return result
    }

    async DeleteSupport(id){
        const result = await this.handler.DeleteSupport(id)
        return result
    }

    async DeleteAllSupport(){
        const result = await this.handler.DeleteAllSupport()
        return result
    }

    async GetSupportByTitle(title){
        const result = await this.handler.GetSupportByTitle(title)
        return result
    }
}