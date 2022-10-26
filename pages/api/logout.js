import cookie from 'cookie'
import {API_URL} from "@/config/index";

export default async (req, res )=> {
    if(req.method === 'POST') {
        //destroy cookie
        res.setHeader('Set-Cookie', cookie.serialize('token', '',{
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            expire: new Date(0),
            sameSite: 'strict',
            path: '/'
        }))
        res.status(200).json({message: 'success'})
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).json({message: `method ${req.method} not allowed`})
    }
}