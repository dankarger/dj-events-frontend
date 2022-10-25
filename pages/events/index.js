import Layout from "@/components/Layout";
import {API_URL, PER_PAGE} from "@/config/index";
import EventItem from "@/components/EventItem";
import Pagination from "@/components/Pagination";


export default function EventsPage({ events, total, page }) {

    return (
        <Layout>
            <h1>Events</h1>
            {events.length === 0 && <h3>No Event to show</h3>}
            {events.map(evt => (
                <EventItem key={evt.id} evt={evt}/>
            ))}

            <Pagination page={page} total={total}/>

        </Layout>
    )
}

export async function getServerSideProps({ query: {page = 1}}) {
    // calculate start page
    const start = +page === 1 ? 0 : (+page -1) * PER_PAGE
    // Fetch Number Of Events
    const totalRes = await fetch(
        `${API_URL}/api/events?pagination[withCount]=true`
    );
    const totalData = await totalRes.json();
    const total = totalData.meta.pagination.total;
    // console.log({ total });
    const res = await fetch(`${API_URL}/api/events?pagination[page]=${page}&pagination[pageSize]=${PER_PAGE}&populate=*`);
    const eventsData = await res.json();
    const events = eventsData.data;

    return {
        props: {events, page: +page , total},

    }
}