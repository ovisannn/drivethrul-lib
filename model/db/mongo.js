import mongoose from "mongoose";

export class mongoodb{
    constructor(username, password, dbName){
        // mongodb+srv://ovisannn:Vqam8WrJcYl5KCCx@cluster0.hl4u9ei.mongodb.net/?retryWrites=true&w=majority
        // this.uri = `mongodb://${uri}/${name}`
        // mongodb://cyruslk:<MY_PASS_HERE>@franklinford-shard-00-00-3dveb.mongodb.net:27017,franklinford-shard-00-01-3dveb.mongodb.net:27017,franklinford-shard-00-02-3dveb.mongodb.net:27017/test?ssl=true&replicaSet=FranklinFord-shard-0&authSource=admin&retryWrites=true&w=majority"
        // this.uri = `mongodb+srv://${username}:${password}@cluster0.hl4u9ei.mongodb.net/${dbName}?retryWrites=true&w=majority`
        // this.uri = `mongodb+srv://ovisannn:L9SDMMv0bkxuRstN@cluster0.g96sldh.mongodb.net/${dbName}?retryWrites=true&w=majority`
        this.uri = `mongodb+srv://${username}:${password}@cluster0.g96sldh.mongodb.net/${dbName}?retryWrites=true&w=majority`
    }

    init(){
        const dbase = mongoose.connection
        dbase.on('error', (error)=>{
        console.log(error)
        })
        dbase.once('connected', () =>{
        console.log(`database connected on ${this.uri}`)
        })
        return mongoose.connect(this.uri)
    }
}