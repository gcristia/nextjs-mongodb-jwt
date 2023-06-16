'use client'
import { FormEvent, useState } from 'react'
import axios, { AxiosError } from 'axios'

function RegisterPage() {
    const [error, setError] = useState()
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const email = formData.get('email')
        const password = formData.get('password')
        const fullname = formData.get('fullname')

        try {
            const res = axios.post('/api/auth/signup', {
                email,
                password,
                fullname,
            })

            console.log(res)
        } catch (error) {
            console.log(error)
            if (error instanceof AxiosError) {
                setError(error.response?.data?.message)
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {error && <div className='bg-red-500 text-white p-2 mb-2'>{error}</div>}
                <h1>Sign Up</h1>
                <input
                    type='text'
                    placeholder='John Doe'
                    name='fullname'
                    className='bg-zinc-800 px-4 py-2 block mb-2'
                />
                <input
                    type='email'
                    placeholder='user@domain'
                    name='email'
                    className='bg-zinc-800 px-4 py-2 block mb-2'
                />
                <input
                    type='password'
                    placeholder='***********'
                    name='password'
                    className='bg-zinc-800 px-4 py-2 block mb-2'
                />
                <button className='bg-indigo-500 px-4 py-2'>Register</button>
            </form>
        </div>
    )
}

export default RegisterPage
