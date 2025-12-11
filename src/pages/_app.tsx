import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router} from "react-router-dom";
import dynamic from "next/dynamic";
const Ai_button = dynamic(() => import("@/components/helpers/ai_bot_button"), {
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      
      <ToastContainer />
      <Component {...pageProps} />
      <Ai_button/>

    </>
  );
}
