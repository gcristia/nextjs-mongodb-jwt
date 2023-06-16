import { model, models, Schema } from 'mongoose'

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^([\w-]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is not valid'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false,
    },
    fullname: {
        type: String,
        required: [true, 'Fullname is required'],
        minLength: [3, 'Fullname must be at least 3 characters'],
        maxLength: [50, 'Fullname must be at most 50 characters'],
    },
    __v: { type: Number, select: false },
})

const User = models.User || model('User', userSchema)
export default User
