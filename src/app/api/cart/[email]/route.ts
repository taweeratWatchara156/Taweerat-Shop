import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mondodb";
import User from "../../../../../models/user";

type Params = {
    params: {
        email: string;
    };
};

export async function GET(
    req: NextRequest,
    { params }: Params
) {
    try {
        await connectMongoDB();

        const { email } = params;

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found",
            });
        }

        const cart = user.cart;

        return NextResponse.json({
            success: true,
            cart,
            length: Object.keys(cart || {}).length,
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message,
        });
    }
}