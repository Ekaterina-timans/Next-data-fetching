import '@/styles/global.sass';
import Header from '@/components/Header';


export default function App({ Component, pageProps }) {
  return <>
    <Header />
    <main><Component {...pageProps} /></main>
  </>
}
