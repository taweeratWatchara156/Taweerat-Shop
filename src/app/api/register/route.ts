import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/user";
import bcrypt from 'bcryptjs'
import { connectMongoDB } from "../../../../lib/mondodb";

export async function POST(req:NextRequest) {
    try{
        const { firstName, lastName, username, email, password } = await req.json()
        const hashedPassword = await bcrypt.hash(password, 10)

        const cart:Object = {}
        const favorite:Object = {}

        await connectMongoDB();
        await User.create({firstName, lastName, username, email, password:hashedPassword, cart, favorite })

        return NextResponse.json({
            success:true,
            message: "Email is already exists"
        })
    }catch(error:any){
        return NextResponse.json({
            success:false,
            message: error.message
        })
    }
}