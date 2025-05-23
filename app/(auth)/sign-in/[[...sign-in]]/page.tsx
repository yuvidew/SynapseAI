import { SignIn } from '@clerk/nextjs'
import React from 'react'

const SignInPage = () => {
    return (
        <main className='auth-page h-[100vh] flex items-center justify-center'>
            <SignIn redirectUrl={"/dashboard"} />
        </main>
    )
}

export default SignInPage
