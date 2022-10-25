import {createContext, useState, useEffect} from "react";
import {useRouter} from "next/router";
import {API_URL} from "@/config/index";

const AuthContext = createContext()

export const AuthProvider= ( { children})=> {
    const [user , setUser] = useState(null)
    const [ error, setError] = useState(null)

    // Register user

    const register = async (user) => {
        console.log(user)
    }

    // login users
    const login = async ({email: identifier , password}) => {
        console.log(identifier, password)
    }
    //logout user
    const logout = async () => {
        console.log('Logout')
    }
    //check if user is logged in
    const checkUserLogin = async (ụser) => {
        console.log('check')
    }
    return (
        <AuthContext.Provider value={{user, error, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext