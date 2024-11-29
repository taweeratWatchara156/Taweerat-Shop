import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mondodb";
import User from "../../../../../models/user";

export async function POST(req: NextRequest) {
    try {
        const { email, productId, amount } = await req.json()

        if (!email || !productId) {
            return NextResponse.json({
                success: false,
                message: "Email, Product Id and Amount are required"
            }, { status: 404 })
        }

        await connectMongoDB();

        const user = await User.findOne({ email })

        if (!user) return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })

        const currentFavorite = new Map(user.favorite || {})

        if (amount > 0) {
            if (currentFavorite.has(productId)) {
                return NextResponse.json({
                    success: false,
                    message: "Product is already favorite"
                })
            }
            else{
                currentFavorite.set(productId, { amount: 1 });
                user.favorite = currentFavorite;
            }
        }else if(amount < 0){
            if(!currentFavorite.has(productId)){
                return NextResponse.json({
                    success: false,
                    message: "Product Not found can not remove from favorite"
                })
            }else{
                currentFavorite.delete(productId)
                user.favorite = currentFavorite;
            }
        }

        const savedUser = await user.save();

        return NextResponse.json({
            success: true,
            message: "Successfully updated favorite !",
            favorite: Object.fromEntries(savedUser.favorite)
        })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message
        })
    }
}