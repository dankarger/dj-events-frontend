import Layout from "@/components/Layout";
import {API_URL} from "@/config/index";
import EventItem from "@/components/EventItem";
import Link from 'next/link'

export default function Home({events}) {
  return (
    <Layout >
      <h1>Upcoming Events</h1>
        {events.length ===0 && <h3>No Event to show</h3>}
        {events.map(evt=>(
            <EventItem key={evt.id} evt={evt} />
        ))}
        {events.length>0 && (
            <Link href={'/events'}>
                <a className='btn-secondary'>View All Events</a>
            </Link>
        )}
    </Layout>
  )
}

export async function getStaticProps() {
    const res = await fetch(`${API_URL}/api/events?populate=*&_sort=date:ASC&_limit=3`);
    const jsonEvents = await res.json()
    const events = jsonEvents.data;

    console.log('e',events)
    console.log(API_URL)
    return {
        props: { events:events  },
        revalidate: 1
    }
}