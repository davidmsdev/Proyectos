import Layout from '../components/Layout'
import Image from 'next/image'
import styles from '../styles/About.module.css'


const About = () => {
    return (
        <Layout
            page='Nosotros'
        >
            <main className="contenedor">
                <h2 className="heading">Nosotros</h2>

                <div className={styles.content}>

                    <Image layout="responsive" width={600} height={450} src="/img/nosotros.jpg" alt="Imagen sobre nosotros" />

                    <div>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vehicula maximus massa fermentum tincidunt. 
                            Nulla a sapien in risus porta vulputate. Suspendisse ac dui at mi ultricies molestie. 
                            Ut ornare et ligula sed venenatis. Etiam nec sagittis sem, nec hendrerit velit. 
                            Vestibulum cursus lacus ante, quis vestibulum arcu semper nec. Cras non facilisis orci. 
                            Sed aliquam consectetur laoreet. Donec lectus ligula, dictum nec sagittis eu, hendrerit non risus. 
                            Vestibulum convallis leo tellus, a varius nunc efficitur sed. Vivamus auctor non mi eu varius.
                        </p>
                        <p>
                           Aenean maximus, dolor at ornare blandit, purus est mollis ligula, id convallis urna odio in turpis. 
                           Vestibulum vehicula, mi sed porttitor accumsan, urna dui tristique tortor, eu tincidunt purus enim eget dui. 
                           Morbi facilisis sapien accumsan metus eleifend posuere. Aenean sed efficitur magna.
                            Sed porttitor tortor ac semper malesuada. Integer venenatis erat neque, in vehicula purus iaculis non. 
                            Aliquam auctor lorem est, eu viverra turpis ultrices a. Ut varius lectus ullamcorper, posuere sem eu, tempor lectus.
                        </p>
                    </div>
                </div>
            </main>
        </Layout> 
    )
}

export default About