import { useState, useEffect, useRef, useContext } from "react";
import { BiDownArrow } from "react-icons/bi";
import { BiUpArrow } from "react-icons/bi";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

import Navbar from "../../components/Navbar";
import { getModuleData } from "../../lib/firebase";
import Quiz from "../../components/Quiz";
import Footer from "../../components/Footer";
import { UserContext } from "../../lib/context";
import { auth } from "../../lib/firebase";
import toast from "react-hot-toast";

export async function getServerSideProps({ query: urlQuery }) {
    const { module } = urlQuery;
    const moduleData = await getModuleData(module);

    // If no user, short circuit to 404 page
    if (!moduleData) {
        return {
        notFound: true,
        };
    }
  
    return {
        props: { module, moduleData }, // will be passed to the page component as props
    };
}

export default function ModulePage({ module, moduleData }) {
    const router = useRouter();
    const { user } = useContext(UserContext);

    // useEffect(() => {
    //     if (!user) {
    //         toast.error("Trying to be sneaky, huh.")
    //         router.push('/');
    //     }
    // }, [])
    useEffect(() => {
        if (!localStorage.getItem("userAuth")) {
            toast.error("Trying to be sneaky, huh.")
            router.push('/');
        }
    }, [router])

    const [offsetY, setOffsetY] = useState(0);
    const handleScroll = () => setOffsetY(window.pageYOffset);
    const ref = useRef(null);
    const topRef = useRef(null);

    const topScroll = () => topRef.current.scrollIntoView()    
  
    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
  
      return () => window.removeEventListener("scroll", handleScroll);
    }, [])


    const splitModuleName = (module) => {
        let splitName = module.replace("-", " ")
        return splitName.charAt(0).toUpperCase() + splitName.substr(1).toLowerCase()
    }

    return (
        <div className="absolute w-full z-0">
            <Navbar />
            <div ref={topRef} className="bg-[#DDDBCB] relative z-40 h-[250px] top-0 left-0" style={{ transform: `translateY(${offsetY * -0.5 }px)`}}>
                <div className='relative top-full left-0'>
                    <div className="pb-10 bg-[#DDDBCB] w-full flex flex-col px-6 ss:px-32 md:px-48 gap-6">
                        <h2 className="text-2xl font-thin text-right text-[#1B9AAA]">{splitModuleName(module)}</h2>
                        <h3 className="text-4xl sm:text-6xl w-2/3 sm:w-1/">{moduleData.title}</h3>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#DDDBCB" fillOpacity="1" d="M0,224L0,64L180,64L180,96L360,96L360,128L540,128L540,320L720,320L720,96L900,96L900,0L1080,0L1080,224L1260,224L1260,160L1440,160L1440,0L1260,0L1260,0L1080,0L1080,0L900,0L900,0L720,0L720,0L540,0L540,0L360,0L360,0L180,0L180,0L0,0L0,0Z"></path></svg>
                </div>
            </div>
            
            <div className="h-[200px] relative z-30 bg-[#F5F1E3] top-0 left-0" style={{ transform: `translateY(${offsetY * -0.7 }px)`}}>
                <div className=' relative top-full left-0'>
                    <div className="pb-20 bg-[#F5F1E3] w-full">

                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#F5F1E3" fillOpacity="1" d="M0,64L0,96L75.8,96L75.8,64L151.6,64L151.6,256L227.4,256L227.4,192L303.2,192L303.2,128L378.9,128L378.9,128L454.7,128L454.7,160L530.5,160L530.5,64L606.3,64L606.3,288L682.1,288L682.1,160L757.9,160L757.9,64L833.7,64L833.7,320L909.5,320L909.5,64L985.3,64L985.3,288L1061.1,288L1061.1,256L1136.8,256L1136.8,288L1212.6,288L1212.6,192L1288.4,192L1288.4,128L1364.2,128L1364.2,224L1440,224L1440,0L1364.2,0L1364.2,0L1288.4,0L1288.4,0L1212.6,0L1212.6,0L1136.8,0L1136.8,0L1061.1,0L1061.1,0L985.3,0L985.3,0L909.5,0L909.5,0L833.7,0L833.7,0L757.9,0L757.9,0L682.1,0L682.1,0L606.3,0L606.3,0L530.5,0L530.5,0L454.7,0L454.7,0L378.9,0L378.9,0L303.2,0L303.2,0L227.4,0L227.4,0L151.6,0L151.6,0L75.8,0L75.8,0L0,0L0,0Z"></path></svg>                </div>
            </div>

            <div className=" h-[300px] z-10 flex justify-center" style={{ transform: `translateY(${offsetY * 0.5 }px)`}} >
                <div className="h-max w-[300px] border border-dark flex flex-col justify-between items-center px-12 py-6">
                    <p className="text-left w-full">Come on ... </p>
                    <p className="text-right w-full">... keep it moving</p>
                </div>
            </div>

            <div className="relative top-0 z-20 left-0" style={{ transform: `translateY(${offsetY * 0 }px)`}}>
                <div>
                    
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#F5F1E3" fillOpacity="1" d="M0,224L0,160L62.6,160L62.6,224L125.2,224L125.2,224L187.8,224L187.8,288L250.4,288L250.4,128L313,128L313,160L375.7,160L375.7,288L438.3,288L438.3,96L500.9,96L500.9,160L563.5,160L563.5,160L626.1,160L626.1,224L688.7,224L688.7,160L751.3,160L751.3,288L813.9,288L813.9,0L876.5,0L876.5,32L939.1,32L939.1,96L1001.7,96L1001.7,224L1064.3,224L1064.3,256L1127,256L1127,224L1189.6,224L1189.6,288L1252.2,288L1252.2,256L1314.8,256L1314.8,64L1377.4,64L1377.4,96L1440,96L1440,320L1377.4,320L1377.4,320L1314.8,320L1314.8,320L1252.2,320L1252.2,320L1189.6,320L1189.6,320L1127,320L1127,320L1064.3,320L1064.3,320L1001.7,320L1001.7,320L939.1,320L939.1,320L876.5,320L876.5,320L813.9,320L813.9,320L751.3,320L751.3,320L688.7,320L688.7,320L626.1,320L626.1,320L563.5,320L563.5,320L500.9,320L500.9,320L438.3,320L438.3,320L375.7,320L375.7,320L313,320L313,320L250.4,320L250.4,320L187.8,320L187.8,320L125.2,320L125.2,320L62.6,320L62.6,320L0,320L0,320Z"></path></svg>
                <main className="py-32 w-full bg-light flex flex-col items-center gap-32" >
                    <section className="text-center flex flex-col gap-8 py-12">
                        <h3 className="text-6xl font-thin pb-12"><span className="shifting-text">Flash</span> Cards</h3>
                        
                        <div>
                            <Quiz moduleData={moduleData} module={module} />
                        </div>
                    </section>
                </main>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#F5F1E3" fillOpacity="1" d="M0,64L0,96L240,96L240,160L480,160L480,192L720,192L720,64L960,64L960,192L1200,192L1200,128L1440,128L1440,0L1200,0L1200,0L960,0L960,0L720,0L720,0L480,0L480,0L240,0L240,0L0,0L0,0Z"></path></svg>
                
            </div>

            <div className="absolute top-0 bg-red-300">
                hello
            </div>

            <div className="w-full flex items-center justify-center my-10">
                <motion.button onClick={topScroll} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}><BiUpArrow size={20} /></motion.button>
            </div>
           
      
            <Footer />
          
        </div>
        
    );
}