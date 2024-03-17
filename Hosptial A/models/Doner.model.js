const mongoose = require("mongoose")
const validator = require('validator')

const donerSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    
    age:{
        type:Number,
        required:true,
        validate(val){
            if(val <= 0 ){
                throw new Error("age must be positive number ")
            }
        }
    },
    city:{
        type:String,
        required:true

    },
    bloodAmount:{
        type:Number,
        required:true
    },

    bloodType:{

        type:String,
        required:true

    },
    hospital:{
        type:String,
        required:true

    },

  
    gender:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },




});


const Doner = mongoose.model("a_doner",donerSchema)

module.exports=Doner