export class BaseResponse{
    constructor(status, data){ 
        if(status===200){
            this.meta = {
            status : status,
            message: "success"
            }
            this.data = data
        }else{
            this.meta={
                status : status,
                message: data
            }
        }
    }

    GetResponse(){
        return this
    }

    GetStatus(){
        return this.meta.status
    }
}
