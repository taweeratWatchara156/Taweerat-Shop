import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectMongoDB } from '../../../../../lib/mondodb'
import User from '../../../../../models/user'
import bcrypt from 'bcryptjs'

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {

            },
            async authorize(credentials, req) {
                const { email, password } = credentials as { email: string, password: string }

                try {
                    await connectMongoDB()
                    const user = await User.findOne({ email })

                    if (!user) return null;

                    const passwordMatch = await bcrypt.compare(password, user.password)

                    if (!passwordMatch) return null;

                    return user
                } catch (error: any) {
                    console.log("Error", error)
                }
            }
        })
    ],
    callbacks: {
        // the callbacks will be executed after a well done login
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id
                token.email = user.email
                token.username = user.username
                token.firstName = user.firstName
                token.lastName = user.lastName
                token.cart = user.cart
                token.favorite = user.favorite
            }
            return token
        },
        async session({ session, token, user }) {
            if (token?._id) session.user._id = token._id
            if (token?.email) session.user.email = token.email
            if (token?.username) session.user.username = token.username
            if (token?.firstName) session.user.firstName = token.firstName
            if (token?.lastName) session.user.lastName = token.lastName
            if (token?.cart) session.user.cart = token.cart
            if (token?.favorite) session.user.favorite = token.favorite
            return session
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/sign-in"
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
