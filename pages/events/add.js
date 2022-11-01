import { ToastContainer, toast } from 'react-toastify';
import {parseCookie} from "@/helpers/parseCookie";
import 'react-toastify/dist/ReactToastify.css';
import Layout from "@/components/Layout";
import {useState} from "react";
import {useRouter} from "next/router";
import Link from 'next/link'
import {API_URL} from "@/config/index";
import styles from '@/styles/Form.module.css'

export default function AddEventPage({ token }) {
    const [values, setValues] = useState({
        name: '',
        performers: '',
        venue: '',
        address: '',
        date: '',
        time: '',
        description: ''
    })

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        //Validation
        const hasEmptyFields = Object.values(values).some((element) => element=== '')
        if(hasEmptyFields) {
            toast.error('please fill all fields')
        }
        const res = await fetch(`${API_URL}/api/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ data: values }),
        })

        if(!res.ok) {
            if(res.status === 403 || res.status === 401) {
                toast.error('No token included')
                return
            }
            toast.error('Something went wrong')
        }else {
            const evt = await res.json()
            const json = evt.data
            console.log('res',json)
            await router.push(`/events/${json.attributes.slug}`)
        }

    }
    const handleInputChane = (e) => {
        const {name, value } = e.target
        setValues({...values, [name]: value})
    }
    return (
        <Layout title='Add Event'>
            <Link href={'/events'} >Go Back</Link>
            <h1>Add Event </h1>
            <ToastContainer/>
            <form onSubmit={handleSubmit} className={styles.form} >
                <div className={styles.grid}>
                    <div>
                        <label htmlFor="name">Event Name</label>
                        <input type="text" id='name' name='name'
                                value={values.name} onChange={handleInputChane}/>
                    </div>
                    <div>
                        <label htmlFor="performers">Performers</label>
                        <input type="text" id='performers' name='performers'
                               value={values.performers} onChange={handleInputChane}/>
                    </div>
                    <div>
                        <label htmlFor="venue">Venue</label>
                        <input type="text" id='venue' name='venue'
                               value={values.venue} onChange={handleInputChane}/>
                    </div>
                    <div>
                        <label htmlFor="address">Address</label>
                        <input type="text" id='address' name='address'
                               value={values.address} onChange={handleInputChane}/>
                    </div>
                    <div>
                        <label htmlFor="date">Date</label>
                        <input type="date" id='date' name='date'
                               value={values.date} onChange={handleInputChane}/>
                    </div>
                    <div>
                        <label htmlFor="time">Time</label>
                        <input type="text" id='time' name='time'
                               value={values.time} onChange={handleInputChane}/>
                    </div>
                </div>
                <textarea
                    name="description"
                    id="description"
                    cols="30" rows="10"
                    value={values.description}
                    onChange={handleInputChane}
                ></textarea>
                <input type="submit" value='Add Event' className='btn'/>
            </form>
        </Layout>
    )
}

export async function getServerSideProps({req}){
    const {token} = parseCookie(req)

    return {
        props: {
            token
        }
    }
}