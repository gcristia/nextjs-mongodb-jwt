'use client'
import { signOut, useSession } from 'next-auth/react'

function ProfilePage() {
    const { data: session, status } = useSession()

    return (
        <div className='h-[calc(100vh-4rem)] flex flex-col gap-y-10 items-center justify-center'>
            <h1 className='font-bold text-3xl'>Profile</h1>

            <pre className='bg-zinc-800 p-4'>
                {JSON.stringify(
                    {
                        session,
                        status,
                    },
                    null,
                    2,
                )}
            </pre>

            <button
                className='bg-zinc-800 px-4 py-2 block mb-2'
                onClick={async () => {
                    await signOut()
                }}
            >
                Sign Out
            </button>
        </div>
    )
}

export default ProfilePage
