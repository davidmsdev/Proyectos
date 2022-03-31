import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

const Layout = ({children, page}) => {
    return (
        <div>
            <Head>
                <title>GuitarLA - {page}</title>
                <meta name="description" content="Sitio web de ventas de guitarra"/>
            </Head>

            <Header />

            {children}

            <Footer>

            </Footer>
        </div>
    )
}

export default Layout