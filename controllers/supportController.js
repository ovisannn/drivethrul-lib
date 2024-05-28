export class supportController{
    constructor(supportUseCase){
        this.useCase = supportUseCase
    }
    async GetAllSupport(){
        const result = await this.useCase.GetAllSupport()
        const newResponse = new BaseResponse(result.status, result.data)
        return res.status(newResponse.GetStatus()).json(newResponse.GetResponse())
    }
}