import React, { useState, useEffect, useRef, useContext } from 'react';
import { motion } from "framer-motion";
import { BiDownArrow } from "react-icons/bi";
import { BiUpArrow } from "react-icons/bi";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import { UserContext } from '../lib/context';
import { auth } from "../lib/firebase"


export default function Home() {
  const router = useRouter();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      router.push('/home')
    }
  })

  // animation
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);
  const ref = useRef(null);
  const topRef = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [])


  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show-item")
        } else {
          entry.target.classList.remove("show-item")
        }
      });
    });
    const hiddenElements = document.querySelectorAll(".hidden-item");
    hiddenElements.forEach((el) => observer.observe(el));
  }, [])

  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
  }

  // sign up logic
  const [isSignIn, setIsSignIn] = useState(true);

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const registerWithEmailAndPassword = async (email, password) => {
    if (email.includes("@bristol.ac.uk")) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (err) {
        console.log(err.message)
        if (err.message.includes("email")) {
          toast.error("That email already has an account, love")
        } else if (err.message.includes("password")) {
          toast.error("Invalid password, matey")
        } else {
          toast.error("Something went wrong, my bad")
        }
      }
    } else {
      toast.error("I'm not letting you in, sorry.\nTry a uni email maybe.")
    }

  };

  // switching forms
  const handleSignUpSubmit = (e) => {
      e.preventDefault();
      registerWithEmailAndPassword(signupEmail, signupPassword);
  }

  // login logic
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const logInWithEmailAndPassword = async (email, password) => {
      try {
          await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
          console.log(err);
          toast.error(`You sure you've got an account?`);
      }    
  };

  const handleLogInSubmit = (e) => {
      e.preventDefault();
      logInWithEmailAndPassword(loginEmail, loginPassword);
      
  }

  // scroll button
  const topScroll = () => ref.current.scrollIntoView();

  return (
    <div className='black-gradient h-[4000px] relative w-full top-0 left-0'>
     


      {/* Auth Area */}
      <div className='z-40 fixed top-1/4 w-full flex flex-col items-center px-12'>
        <div className={`border w-full sm:w-[400px] h-[400px] flex flex-col items-center justify-betwen border-dark p-12 bg-light bg-opacity-90 ${offsetY > 400 && "bg-opacity-100"} shadow-xl gap-6`}>
          <h3 className='text-2xl'>{isSignIn ? "Sign Up" : "Log In" }</h3>
        {isSignIn 
        ? 
          <form onSubmit={handleSignUpSubmit} className='w-full h-full justify-between flex flex-col gap-6'>
            <div className="w-full flex flex-col">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-dark">Email</label>
                <input value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required type="email" id="email" className="block w-full p-2.5 text-sm placeholder:opacity-50 text-dark bg-white border border-dark border-opacity-30 outline-strong focus:outline-none focus:border-strong" placeholder="AB12345@bristol.ac.uk" />
            </div>

            <div className="w-full flex flex-col ">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-dark">Password</label>
                <input value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required type="password" id="password" className="block w-full p-2.5 text-sm placeholder:opacity-50 text-dark bg-white border border-dark border-opacity-30 outline-strong focus:outline-none focus:border-strong" placeholder="(I won't tell)" />
            </div>

            <motion.button type='submit' className='text-dark bg-soft hover:text-strong hover:bg-transparent self-center w-1/2 border border-dark p-3  hover:border-strong' whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97}}>Let{"'"}s go</motion.button>
          </form>
        : 
          <form onSubmit={handleLogInSubmit} className='w-full h-full justify-between flex flex-col gap-6'>
            <div className="w-full flex flex-col">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-dark">Email</label>
                <input value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required type="email" id="email" className="block w-full p-2.5 text-sm placeholder:opacity-50 text-dark bg-white border border-dark border-opacity-30 outline-strong focus:outline-none focus:border-strong" placeholder="AB12345@bristol.ac.uk" />
            </div>

            <div className="w-full flex flex-col ">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-dark">Password</label>
                <input value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required type="password" id="password" className="block w-full p-2.5 text-sm placeholder:opacity-50 text-dark bg-white border border-dark border-opacity-30 outline-strong focus:outline-none focus:border-strong" placeholder="(I won't tell)" />
            </div>

            <motion.button type='submit' className='text-dark bg-soft hover:text-strong hover:bg-transparent self-center w-1/2 border border-dark p-3  hover:border-strong' whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97}}>Let{"'"}s go</motion.button>
          </form>
        }
        </div>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={toggleSignIn} className="p-3">
          <p className='text-soft opacity-70'>
            {isSignIn ? "Already have an account?" : "Need an account?"}
          </p>
        </motion.button>
      </div>



      

      <div className='h-screen relative z-0 '>
      {/* Stalagtites */}
        <div className="bg-[#DDDBCB] z-40 relative h-[50px] top-0 left-0" style={{ transform: `translateY(${offsetY * -0.5 }px)`}}>
          <div className='relative top-full left-0'>
            <div className='flex flex-row w-full bg-soft justify-center items-center gap-3 text-strong text-opacity-30'>
              <p className="text-center">Scroll</p>
              <BiDownArrow />
            </div>

          <svg ref={ref} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#DDDBCB" fillOpacity="1" d="M0,256L0,192L360,192L360,224L720,224L720,256L1080,256L1080,192L1440,192L1440,0L1080,0L1080,0L720,0L720,0L360,0L360,0L0,0L0,0Z"></path></svg>                </div>
        </div>

        <div className="h-[0px] relative z-30 bg-[#F5F1E3] top-0 left-0" style={{ transform: `translateY(${offsetY * -0.1 }px)`}}>
          <div className=' relative top-full left-0'>
            <div className="pb-20 bg-[#F5F1E3] w-full">

            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#F5F1E3" fillOpacity="1" d="M0,256L0,128L240,128L240,64L480,64L480,32L720,32L720,128L960,128L960,288L1200,288L1200,320L1440,320L1440,0L1200,0L1200,0L960,0L960,0L720,0L720,0L480,0L480,0L240,0L240,0L0,0L0,0Z"></path></svg>
          </div>
        </div>

        <div className="h-[20px] relative z-20 bg-[#1B9AAA] opacity-70 top-0 left-0" style={{ transform: `translateY(${offsetY * -0.6 }px)`}}>
          <div className=' relative top-full left-0'>
            <div className="pb-20 bg-[#1B9AAA] w-full">

            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#1B9AAA" fillOpacity="1" d="M0,32L0,224L144,224L144,192L288,192L288,96L432,96L432,160L576,160L576,192L720,192L720,320L864,320L864,96L1008,96L1008,192L1152,192L1152,320L1296,320L1296,256L1440,256L1440,0L1296,0L1296,0L1152,0L1152,0L1008,0L1008,0L864,0L864,0L720,0L720,0L576,0L576,0L432,0L432,0L288,0L288,0L144,0L144,0L0,0L0,0Z"></path></svg>        </div>
        </div>

        <div className="h-[100px] relative z-10 bg-[#F5F1E3] opacity-30 top-0 left-0" style={{ transform: `translateY(${offsetY * -0.2 }px)`}}>
          <div className=' relative top-full left-0'>
            <div className="pb-20 bg-[#F5F1E3] w-full">

            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#F5F1E3" fillOpacity="1" d="M0,32L0,224L144,224L144,192L288,192L288,96L432,96L432,160L576,160L576,192L720,192L720,320L864,320L864,96L1008,96L1008,192L1152,192L1152,320L1296,320L1296,256L1440,256L1440,0L1296,0L1296,0L1152,0L1152,0L1008,0L1008,0L864,0L864,0L720,0L720,0L576,0L576,0L432,0L432,0L288,0L288,0L144,0L144,0L0,0L0,0Z"></path></svg>        </div>
        </div>

        {/* Stalagmites */}
        <div className={`h-[100px] top-[55%] relative z-10 w-full opacity-50 left-0 ${offsetY > 800 && "hidden"}`} style={{ transform: `translateY(${offsetY * 1.9 }px)`}}>
          <div className='relative left-0'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#F5F1E3" fillOpacity="1" d="M0,256L0,192L110.8,192L110.8,256L221.5,256L221.5,192L332.3,192L332.3,128L443.1,128L443.1,96L553.8,96L553.8,256L664.6,256L664.6,128L775.4,128L775.4,192L886.2,192L886.2,96L996.9,96L996.9,64L1107.7,64L1107.7,160L1218.5,160L1218.5,160L1329.2,160L1329.2,320L1440,320L1440,320L1329.2,320L1329.2,320L1218.5,320L1218.5,320L1107.7,320L1107.7,320L996.9,320L996.9,320L886.2,320L886.2,320L775.4,320L775.4,320L664.6,320L664.6,320L553.8,320L553.8,320L443.1,320L443.1,320L332.3,320L332.3,320L221.5,320L221.5,320L110.8,320L110.8,320L0,320L0,320Z"></path></svg>     
          </div>
          <div className="h-[300px] bg-[#F5F1E3] w-full" />
        </div>

        <div className={`h-[100px] top-[55%] relative z-10 w-full left-0 ${offsetY > 800 && "hidden"}`} style={{ transform: `translateY(${offsetY * 1.2 }px)`}}>
          <div className='relative left-0'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#1B9AAA" fillOpacity="1" d="M0,128L0,32L144,32L144,0L288,0L288,288L432,288L432,32L576,32L576,160L720,160L720,64L864,64L864,224L1008,224L1008,192L1152,192L1152,96L1296,96L1296,256L1440,256L1440,320L1296,320L1296,320L1152,320L1152,320L1008,320L1008,320L864,320L864,320L720,320L720,320L576,320L576,320L432,320L432,320L288,320L288,320L144,320L144,320L0,320L0,320Z"></path></svg>          </div>
          <div className="h-[300px] bg-[#1B9AAA] w-full" />
        </div>

        <div className={`h-[100px] top-[45%] relative z-10 w-full left-0 ${offsetY > 800 && "hidden"}`} style={{ transform: `translateY(${offsetY * 1.4 }px)`}}>
          <div className='relative left-0'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#DDDBCB" fillOpacity="1" d="M0,96L0,224L180,224L180,288L360,288L360,224L540,224L540,128L720,128L720,192L900,192L900,32L1080,32L1080,320L1260,320L1260,32L1440,32L1440,320L1260,320L1260,320L1080,320L1080,320L900,320L900,320L720,320L720,320L540,320L540,320L360,320L360,320L180,320L180,320L0,320L0,320Z"></path></svg>          </div>
          <div className="h-[300px] bg-[#DDDBCB] w-full" />
        </div>
      </div>

      <div className={`w-full hidden-item flex justify-center items-center pt-32`}>
        <div className='border-2 border-dark w-[300px] aspect-[2/1] flex flex-col justify-center items-center'>
          <p className='hidden-item text-2xl'>What is this?</p>
        </div>
      </div>
      <div className={`w-full hidden-item flex justify-center items-center pt-32`}>
        <div className='border-2 border-dark w-[300px] aspect-[2/1] flex flex-col justify-center items-center p-6'>
          <p className='hidden-item text-2xl'>A waste of time.</p>
          <p className='hidden-item text-base text-center text-soft'>And an excuse to try scroll animations</p>
        </div>
      </div>
    
      <div className={`w-full hidden-item flex justify-center items-center pt-32`}>
        <div className='border-2 border-dark w-[300px] aspect-[2/1] flex flex-col justify-center items-center p-6'>
          <p className='text-lg text-center'>But you get AWS flash cards without going on Quizlet.</p>
        </div>
      </div>

      <div className='pt-72 font-thin text-3xl w-full flex justify-center'>
        <p className='w-1/2 text-center absolute bottom-[45%]'>unneccesary white space</p>
        <p className='w-1/2 text-center absolute bottom-[25%]'>it{"'"}s not worth scrolling</p>
        <p className='w-1/2 text-center absolute bottom-[3%]'>told you</p>
        <motion.button onClick={topScroll} whileHover={{ scale: 1.1, translateY: -5 }} whileTap={{ scale: 0.9, translateY: 20 }} className='w-1/2 text-center absolute bottom-[1%] flex flex-row justify-center items-center'><BiUpArrow /></motion.button>
      </div>
    </div>
  );
}
