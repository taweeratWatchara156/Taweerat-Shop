import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mondodb";
import User from "../../../../../models/user";

export async function GET(req:NextRequest, { params }: { params: { email:string } }){
    try{
        await connectMongoDB()
        const { email } = params;
        const user = await User.findOne({ email })

        if(!user) return NextResponse.json({ success:false, message: "User not found" })

        const favorite = user.favorite;

        return NextResponse.json({
            success:true,
            favorite,
            length: Object.keys(Object.fromEntries(favorite)).length
        })
    }catch(error:any){
        return NextResponse.json({
            success:false,
            message:error.message
        })
    }
}