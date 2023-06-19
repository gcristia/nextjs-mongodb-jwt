import { NextResponse } from 'next/server'
import User from '@/models/user'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/libs/mongodb'

export async function POST(request: Request) {
    const { fullname, email, password } = await request.json()

    if (!password || password == password.length < 6) {
        return NextResponse.json({ message: 'Password must be at least 6 characters' }, { status: 400 })
    }

    try {
        await connectDB()
        const userFound = await User.findOne({ email })
        if (userFound) {
            return NextResponse.json({ message: 'Email already exists' }, { status: 409 })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = new User({
            email,
            fullname,
            password: hashedPassword,
        })

        const userSaved = await user.save()

        return NextResponse.json(
            {
                fullname,
                email,
                createdAt: userSaved.createdAt,
                updatedAt: userSaved.updatedAt,
            },
            { status: 201 },
        )
    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })
        }
    }
}
