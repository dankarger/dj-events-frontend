import Head from 'next/head';
import {useRouter} from "next/router";
import Header from "./Header";
import Footer from "./Footer";
import ShowCase from "@/components/ShowCase";
import styles from '@/styles/Layout.module.css';

const Layout = ({title,keyword, description, children})=> {
    const router = useRouter();

    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name='description' content={description}/>
                <meta name='keyword' content={keyword} />
            </Head>
            <Header />
            {router.pathname==='/' && <ShowCase />}
            <div className={styles.container}>
                {children}
            </div>
            <Footer />
        </div>
    )
}
Layout.defaultProps = {
    title: 'DJ Events | Find the hotest parties',
    description: 'Find the latest DJ and othe musical events',
    keyword: 'music, dj, edm, events'
}

export default Layout