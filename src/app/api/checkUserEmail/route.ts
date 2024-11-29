import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/user";
import { connectMongoDB } from "../../../../lib/mondodb";

export async function POST(req:NextRequest) {
    try{
        await connectMongoDB()
        const { email } = await req.json()
        const user = await User.findOne({ email }).select("_id")

        return NextResponse.json({
            success:true,
            user,
        })
    }catch(error:any){
        return NextResponse.json({
            success:false,
            message: error.message
        })
    }
}