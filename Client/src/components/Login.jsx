import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'motion/react'
import axios from 'axios'
import { toast } from 'react-toastify'
const Login = () => {

    const [state, setState] = useState('Login')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { setShowLogin, setUser, setToken } = useContext(AppContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            if (state === 'Login') {
                const { data } = await axios.post("http://localhost:4000/api/user/login",
                    { email, password }
                )
                if (data.success) {
                    setToken(data.token);
                    setUser(data.user);
                    localStorage.setItem('token', data.token);
                    setShowLogin(false);
                } else {
                    toast.error(data.message);
                }

            } else {
                const { data } = await axios.post('http://localhost:4000/api/user/register',
                    { name, email, password }
                )
                if (data.success) {
                    setToken(data.token);
                    setUser(data.user);
                    localStorage.setItem('token', data.token);
                    setShowLogin(false);
                } else {
                    toast.error(data.message);
                }
            }

        } catch (error) {
            toast.error(error.message);
        }

    }


    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])


    return (
        <div

            className='fixed  top-0 left-0 right-0 bottom-0
    z-10 backdrop-blur-sm bg-black/30 flex justify-center
    items-center'>
            <motion.form onSubmit={onSubmitHandler}
                initial={{ opacity: 0.2, y: 50 }}
                transition={{ duration: 0.3 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative bg-white p-10 rounded-xl text-slate-500">
                <h1 className="text-center text-2xl text-neutral-700 font-medium">{state}</h1>
                <p className=" text-sm">
                    Welcome back! Please sign in to continue
                </p>
                {state !== 'Login' && <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
                    <img src={assets.profile_icon} alt="" className="" width={20} />
                    <input
                        onChange={e => setName(e.target.value)} value={name}
                        type="text" name="" id="" className="outline-none text-sm" placeholder='Full Name' required />
                </div>}
                <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
                    <img src={assets.email_icon} alt="" className="" />
                    <input
                        onChange={e => setEmail(e.target.value)} value={email}
                        type="email" id="" className="outline-none text-sm" placeholder='Email Id' required />
                </div>
                <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
                    <img src={assets.lock_icon} alt="" className="" />
                    <input
                        onChange={e => setPassword(e.target.value)} value={password}
                        type="password" name="" id="" className="outline-none text-sm" placeholder='Password' required />
                </div>
                <p className="text-sm text-blue-600 my-4 cursor-pointer">Forget Password?</p>
                <button
                    type="submit"
                    className="bg-blue-600 w-full text-white py-2 rounded-full">{state === 'Login' ? 'LogIn' : 'Create account'}</button>
                {state === 'Login' ?
                    <p className="mt-5 text-center">Don't have an account?
                        <span className=" text-blue-600 cursor-pointer"
                            onClick={() => setState('Sign Up')}
                        >Sign up</span>
                    </p>
                    :
                    <p className="mt-5 text-center">Already have an account?
                        <span className=" text-blue-600 cursor-pointer"
                            onClick={() => setState('Login')}
                        >LogIn</span>
                    </p>}
                <img
                    onClick={() => setShowLogin(false)}
                    src={assets.cross_icon} alt=""
                    className="absolute top-5 right-5 cursor-pointer" />
            </motion.form>

        </div>
    )
}

export default Login
