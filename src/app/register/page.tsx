'use client'
import { FormEvent, useState } from 'react'
import axios, { AxiosError } from 'axios'
import { signIn } from 'next-auth/react'
import { router } from 'next/client'

function RegisterPage() {
    const [error, setError] = useState()
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const email = formData.get('email')
        const password = formData.get('password')
        const fullname = formData.get('fullname')

        try {
            const signUpResponse = await axios.post('/api/auth/signup', {
                email,
                password,
                fullname,
            })

            const res = await signIn('credentials', {
                email: signUpResponse.data.email,
                password: formData.get('password'),
                redirect: false,
            })

            if (res?.ok) return router.push('/dashboard')
        } catch (error) {
            console.log(error)
            if (error instanceof AxiosError) {
                setError(error.response?.data?.message)
            }
        }
    }

    return (
        <div className='justify-center h-[calc(100vh-4rem)] flex items-center'>
            <form onSubmit={handleSubmit} className='bg-neutral-950 px-8 py-10 w-2/12'>
                {error && <div className='bg-red-500 text-white p-2 mb-2'>{error}</div>}
                <h1 className='text-4xl font-bold mb-7'>Sign Up</h1>

                <label className='text-slate-300'>Email:</label>
                <input
                    type='email'
                    placeholder='Email'
                    className='bg-zinc-800 px-4 py-2 block mb-2 w-full'
                    name='email'
                />

                <label className='text-slate-300'>Password:</label>
                <input
                    type='password'
                    placeholder='Password'
                    className='bg-zinc-800 px-4 py-2 block mb-2 w-full'
                    name='password'
                />

                <button className='bg-blue-500 text-white px-4 py-2 block w-full mt-4'>Register</button>
            </form>
        </div>
    )
}

export default RegisterPage
