import Head from 'next/head'
import styles from '../styles/Layout.module.css'
const Layout = ({title,keyword, description, children})=> {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name='description' content={description}/>
                <meta name='keyword' content={keyword} />
            </Head>
            <div className={styles.container}>
                {children}
            </div>

        </div>
    )
}
Layout.defaultProps = {
    title: 'DJ Events | Find the hotest parties',
    description: 'Find the latest DJ and othe musical events',
    keyword: 'music, dj, edm, events'
}

export default Layout