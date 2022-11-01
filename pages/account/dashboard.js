import Layout from "@/components/Layout";
import {parseCookie} from "@/helpers/parseCookie";
import DashBoardEvent from "@/components/DashboardEvent";
import {useRouter} from "next/router";import {API_URL} from "@/config/index";
import styles from '@/styles/Dashboard.module.css'
import {toast} from "react-toastify";

export default function DashboardPage({events, token}) {

    const router = useRouter()
    const deleteEvent = async (id) => {
        if(confirm('Are you sure?')) {
            const res = await fetch(`${API_URL}/api/events/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await  res.json()

            if(!res.ok){
                toast.error(data.error.message)
            }else {
                await  router.reload()
            }
        }
    };

    return (
        <Layout title = 'User Dashboard '>
            <div className={styles.dash}>
                <h1>Dashboard</h1>
                <h3>My Events</h3>
                {events.map((evt)=> (
                    <DashBoardEvent key={evt.id} evt={evt} handleDelete={deleteEvent}/>

                ))}
            </div>


        </Layout>
    )
}


export async function getServerSideProps({req}) {
    const {token} = parseCookie(req)

    const res = await fetch(`${API_URL}/api/events/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const events = await res.json();
    console.log('events-dashboard ', events)
    return {
        props: {
            events: events,
            token
        },
    }
}
