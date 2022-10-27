import Layout from "@/components/Layout";
import {parseCookie} from "@/helpers/parseCookie";
import DashBoardEvent from "@/components/DashboardEvent";
import {API_URL} from "@/config/index";
import styles from '@/styles/Dashboard.module.css'

export default function DashboardPage({events}) {

    const deleteEvent=(id)=> {
        console.log(id)
    }
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
            events: events
        },
    }
}
