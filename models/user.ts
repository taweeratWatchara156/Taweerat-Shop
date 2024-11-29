import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema(
    {
        firstName: {
            type:String,
            required:true
        },
        lastName: {
            type:String,
            require:true
        },
        username: {
            type:String,
            require:true
        },
        email: {
            type:String,
            require: true
        },
        password:{
            type:String,
            require:true
        },
        cart: {
            type: Map,
            of:{
                amount:Number
            },
            require:false,
            default: {}
        },
        favorite: {
            type: Map,
            of:{
                amount:Number
            },
            require:false,
            default: {}
        }
    },
    {timestamps: true}
)

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User