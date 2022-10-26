import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FaImage} from "react-icons/fa";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";
import {useState} from "react";
import {useRouter} from "next/router";
import Link from 'next/link'
import Image from 'next/image'
import {API_URL} from "@/config/index";
import styles from '@/styles/Form.module.css'
import {formatDateForInput} from "@/utils/formateDate";


export default function EditEventPage({evt, currentId}) {
    const [values, setValues] = useState({
        name: evt.name,
        performers: evt.performers,
        venue: evt.venue,
        address: evt.address,
        date: formatDateForInput(evt.date),
        time: evt.time,
        description: evt.description
    })
    const [imagePreview, setImagePreview] = useState(evt.image?.data?.attributes?.formats?.thumbnail?.url ? evt.image.data.attributes.formats.thumbnail.url : null)
    const [showModal, setShowModal] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        //Validation
        const hasEmptyFields = Object.values(values).some((element) => element === '')
        if (hasEmptyFields) {
            toast.error('please fill all fields')
        }
        console.log('eeeee', evt)
        const res = await fetch(`${API_URL}/api/events/${currentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({data: values}),
        })

        if (!res.ok) {
            toast.error('Something went wrong')
        } else {
            const evt = await res.json()
            const json = evt.data
            console.log('res', json)
            await router.push(`/events/${json.attributes.slug}`)
        }

    }
    const handleInputChane = (e) => {
        const {name, value} = e.target
        setValues({...values, [name]: value})
    }

    const imageUploaded = async (e) => {
        console.log('uploaded')
        const res = await fetch(`${API_URL}/api/events/${currentId}?populate=*`)
        const data = await res.json()
        console.log('uploaded222222', data)

        await setImagePreview(data.data.attributes.image.data.attributes.formats.thumbnail.url)
    }
    return (
        <Layout title='Add Event'>
            <Link href={'/events'}>Go Back</Link>
            <h1>Edit Event </h1>
            <ToastContainer/>
            <form onSubmit={handleSubmit} className={styles.form}>
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
                <input type="submit" value='Edit Event' className='btn'/>
            </form>
            <h2>Event Image</h2>
            {imagePreview ? (
                <Image src={imagePreview} height={100} width={170}/>
            ) : <div>
                <p>No Image uploaded</p>

            </div>}
            <div>
                <button className='btn-secondary' onClick={()=> setShowModal(true)}>
                    <FaImage />Set Image
                </button>
            </div>
            <Modal show={showModal}
                   onClose={()=>setShowModal(false)}

            >
                <ImageUpload evtId={currentId} imageUploaded={imageUploaded}/>
            </Modal>
        </Layout>
    )
}

export async function getServerSideProps({params: {id},req}) {
    const res = await fetch(`${API_URL}/api/events/${id}?populate=*`)
    const jsonData = await res.json();
    const currentId = jsonData.data.id
    const evt = jsonData.data.attributes
    // console.log('111', evt.image.data.attributes.formats.thumbnail.url)
    console.log('header',req.headers.cookie)
    return {
        props: {
            evt,
            currentId
        }
    }
}