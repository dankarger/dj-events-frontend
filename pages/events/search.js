import Layout from "@/components/Layout";
import {API_URL} from "@/config/index";
import EventItem from "@/components/EventItem";
import qs from 'qs';

export default function SearchPage({events}) {
    console.log('evev',events)
    return (
        <Layout>
            <h1>Events</h1>
            {events.length === 0 && <h3>No Event to show</h3>}
            {events.map(evt => (
                <EventItem key={evt.id} evt={evt}/>
            ))}
        </Layout>
    )
}

// export async function getServerSideProps({query: {term}}) {
    // const query = qs.stringify(
    //     {
    //         filters: {
    //             $or: [
    //                 {
    //                     name: {
    //                         $containsi: term,
    //                     },
    //                 },
    //                 {
    //                     performers: {
    //                         $containsi: term,
    //                     },
    //                 },
    //                 {
    //                     description: {
    //                         $containsi: term,
    //                     },
    //                 },
    //                 {
    //                     venue: {
    //                         $containsi: term,
    //                     },
    //                 },
    //             ],
    //         },
    //     },
    //     {
    //         encode: false,
    //     }
    // )
//     const q = '[name]'
//     const res = await fetch(`${API_URL}/api/events?${query}&populate=*`);
//     const json = await res.json();
//     const events = json.data;
//     return {props: {events},};
// }
//


export async function getServerSideProps({ query: { term } }) {
    console.log('term',term)
    const query = qs.stringify(
        {
            filters: {
                $or: [
                    {
                        name: {
                            $containsi: term,
                        },
                    },
                    {
                        performers: {
                            $containsi: term,
                        },
                    },
                    // {
                    //     description: {
                    //         $containsi: term,
                    //     },
                    // },
                    // {
                    //     venue: {
                    //         $containsi: term,
                    //     },
                    // },
                ],
            },
        },
        {
            encode: false,
        }
    )
    // const query = qs.stringify({
    //     _where: {
    //         _or: [
    //             { name_contains: term },
    //             { performers_contains: term },
    //             { description_contains: term },
    //             { venue_contains: term },
    //         ],
    //     },
    // })

    console.log('query',query)
    const res = await fetch(`${API_URL}/api/events?${query}&populate=*`)
    const events = await res.json()

    return {
        props: { events: events.data },
    }
}