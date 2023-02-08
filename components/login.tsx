import React, {FC, useState} from 'react'
import {useAuth} from '../context/auth'

const Login:FC = () => {
    const [email, setEmail] = useState<string>('t@t.com')
    const [password, setPassword] = useState<string>('123456')
    const [error, setError] = useState<null | string>(null)

    const {login} = useAuth()

    async function submitHandler() {
        if (!email || !password) {
            setError('Please enter email and password')
            return
        }
        try {
            await login(email, password)
        } catch (err) {
            setError('Incorrect email or password')
        }
    }

    return (
        <div className='dark:text-white text-black flex-1 text-xs sm:text-sm flex flex-col justify-center items-center gap-2 sm:gap-4'>
            <h1 className='font-extrabold select-none text-2xl sm:text-4xl uppercase'>Login</h1>
            {error && <div
                className='w-full max-w-[40ch] border-rose-400 border text-center border-solid text-rose-400 py-2'>{error}</div>}
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email Address'
                   className='dark:text-white text-black dark:bg-slate-800 bg-white outline-none duration-300 border-b-2 border-solid border-gray-600 focus:border-gray-400 p-2 w-full max-w-[40ch]'/>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password'
                   className='dark:text-white text-black dark:bg-slate-800 bg-white outline-none p-2 w-full max-w-[40ch] duration-300 border-b-2 border-solid border-gray-600 focus:border-gray-400'/>
            <button onClick={submitHandler}
                    className='w-full max-w-[40ch] border dark:border-white border-gray-600 border-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900'>
                <h2 className='relative z-20'>
                    SUBMIT
                </h2>
            </button>
        </div>
    )
}

export default Login;