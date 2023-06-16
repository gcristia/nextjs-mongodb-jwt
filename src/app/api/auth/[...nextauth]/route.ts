import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectDB } from '@/libs/mongodb'
import User from '@/models/user'
import bcrypt from 'bcryptjs'

interface User {
    fullname: string
    email: string
    createdAt: string
    updatedAt: string
    password: string
}

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: '' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                await connectDB()
                const userFound = await User.findOne({ email: credentials?.email }).select('+password')
                if (!userFound) {
                    throw new Error('Invalid credentials')
                }
                const passwordMatch = await bcrypt.compare(credentials!.password, userFound.password)
                if (!passwordMatch) {
                    throw new Error('Invalid credentials')
                }

                return userFound
            },
        }),
    ],
    callbacks: {
        jwt({ account, token, user, profile, session }) {
            if (user) token.user = user
            return token
        },
        session({ session, token }) {
            const { password, ...object } = token.user as User
            session.user = object as never
            return session
        },
    },
})

export { handler as GET, handler as POST }
