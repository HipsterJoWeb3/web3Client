import '../styles/main.scss'


import Header from '../components/Header'
import Footer from "../components/Footer";
import { wrapper} from "../redux/store";
import MyHead from "../components/Head";







const  MyApp = ({ Component, pageProps }) => {



    return (
        <>
            <MyHead></MyHead>
            <div className="container">

                <Header/>
                <Component {...pageProps} />
                <Footer/>
            </div>



        </>
    )
}



export default wrapper.withRedux(MyApp)





