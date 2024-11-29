import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mondodb";
import User from "../../../../../models/user";

export async function POST(req:NextRequest) {
    try{
        const { email, productId, amount } = await req.json()

        if(!email || !productId || !amount){
            return NextResponse.json({
                success:false,
                message: "Email, Product Id and Amount are required"
            }, { status:404 })
        }

        await connectMongoDB();

        const user = await User.findOne({ email })

        if(!user) return NextResponse.json({ success:false, message: "User not found" }, { status:404 })
        
        const currentCart = new Map(user.cart || {})

        if(currentCart.has(productId)){
            const currentAmount = (currentCart.get(productId) as { amount: number }).amount;
            const newAmount = currentAmount + amount;

            if(newAmount <= 0) currentCart.delete(productId)
            else currentCart.set(productId, { amount: newAmount });
        }else if(amount > 0){
            currentCart.set(productId, { amount: amount });
        }

        user.cart = currentCart;
        const savedUser = await user.save();

        return NextResponse.json({
            success: true,
            message: "Successfully updated cart !",
            cart: Object.fromEntries(savedUser.cart)
        })
    }catch(error:any){
        return NextResponse.json({
            success:false,
            message: error.message
        })
    }
}