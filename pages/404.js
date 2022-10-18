import { FaExclamationTriangle} from 'react-icons/fa'
import Layout from "../components/Layout";
import Link from "next/link";
// import styles from '../styles/404.modules.css'

const notFoundPage=()=>{
        return (
            <Layout title='Page Not Found'>
                    <div className={'error'}>
                            <h1><FaExclamationTriangle/> 404</h1>
                            <h4>Sorry, page not found </h4>
                            <Link href='/'>Go Back </Link>
                    </div>
            </Layout>

        )
}
export default notFoundPage