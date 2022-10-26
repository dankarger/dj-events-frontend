import {FaUser} from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useEffect, useContext, useState} from "react";
import AuthContext from "@/context/AuthContex";
import Link from 'next/link'
import Layout from "@/components/Layout";
import styles from '@/styles/AuthForm.module.css'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [ password, setPassword] = useState('')
    const {login, error} = useContext(AuthContext)

    useEffect(()=> {
         if(error) toast.error(error)
    } ,[error])

    const handleSubmit=(e)=>{
        e.preventDefault()
        login({email, password})
        // console.log({email, password})
    }

    return (
        <Layout title='User Login'>
            <div className={styles.auth}>
                 <h1><FaUser/>Login</h1>
                <ToastContainer/>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input type="email"
                               id='email'
                               value={email}
                               onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password"
                               id='password'
                               value={password}
                               onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <input type="submit" value={'login'} className='btn'/>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <p>Don't have an account?
                    <Link href={'/account/register'}>
                        Register
                    </Link>
                </p>
                </form>
            </div>
        </Layout>
    )
}