const mongoose = require("mongoose")
const validator = require('validator')

const donorSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    
    age:{
        type:Number,
        required:true
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


const Donor = mongoose.model("AllDonor",donorSchema)

module.exports=Donor