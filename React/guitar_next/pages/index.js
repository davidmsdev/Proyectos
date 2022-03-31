import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../components/Layout'

const Home = () => {
    return (
        <Layout
            page='Inicio'
        >
            <h1>Desde Inicio</h1>
        </Layout>  
    )
}

export default Home