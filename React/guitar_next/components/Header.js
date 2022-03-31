import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Header.module.css'

const Header = () => {
    return (
        <header className={styles.header}>
            <div className="contenedor">
                <div className={styles.bar}>
                    <Link href="/" passHref>
                        <Image width={400} height={100} src="/img/logo.svg" alt="Imagen logo" />
                    </Link>

                    <nav className={styles.navigation}>
                        <Link href="/">Inicio</Link>
                        <Link href="/about">Nosotros</Link>
                        <Link href="/blog">Blog</Link>
                        <Link href="/shop">Tienda</Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header