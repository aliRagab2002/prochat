// const mongoose = require('mongoose')
// const validator = require('validator')

// const userSchema = new mongoose.Schema({
//     name:{
//         type: String,
//         required: true
//     },
//     // lastName:{
//     //     type: String,
//     //     required: false
//     // },
//     email:{
//         type:String,
//         required:true,
//         trim:true,
//         lowercase:true,
//         unique:true,
//         validate(val){
//             if(!validator.isEmail(val)){
//                 throw new Error('email is invalid')
//     }}},
//     password:{
//         type: String,
//         required: true
//     }

// })

// module.exports = mongoose.model('User', userSchema)

const mongoose = require('mongoose')
const validator = require('validator')

const userRoles = require('../utils/userRoles')

const userSchema = new mongoose.Schema({
    FullName:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true,
        unique: true,
        validate:[ validator.isEmail,'filed must be a valid email address']
        
    },
    password:{
        type: String,
        required: true
    },
    token:{
        type:String
    },
    role:{
        type: String,
        enum: [userRoles.USER, userRoles.ADMIN, userRoles.MANGER],
        default: userRoles.USER
    },
    // avatar:{
    //     type: String,
    //     default: 'uploads/profile.jpg'
    // }
    // hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },

})

module.exports = mongoose.model('User', userSchema)