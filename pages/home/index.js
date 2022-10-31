import Navbar from '../../components/Navbar'
import { auth } from '../../lib/firebase';
import { UserContext } from '../../lib/context';
import Footer from '../../components/Footer'

import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { BiMenuAltRight } from "react-icons/bi";
import { motion } from 'framer-motion';

const HomePage = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      localStorage.setItem("userAuth", user);
    } else {
      router.push('/');
    }
  })

  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [])

  return (
    <>
        <Navbar />

       
        <section className='bg-light shadow-lg border-b-2 border-soft flex flex-col gap-6 text-center items-center py-32'>

          <h3 className='text-4xl font-thin opacity-40'>Uhh..</h3>
          <h2 className='text-xl opacity-60'>... Basically ...</h2>
          <p className='text-base opacity-40'>... I couldn't find a good quizlet so I made a site for </p>
          <h1 className='text-4xl'>AWS Revision<br /> <span className='shifting-text'>Flash </span>Cards</h1>

        </section>
          
        <section className='flex flex-col gap-12 items-center justify-center w-full pt-28 text-dark text-opacity-70'>
          <p className='text-center justify-center text-xl'>Navigate to the module you want to <br /><span className='flex flex-row items-center justify-center'>revise using:   <BiMenuAltRight size={30} /></span></p>
          <div class="inline-flex justify-center items-center w-full">
            <hr class="my-8 w-64 h-px bg-soft border-0" />
            <span class="absolute left-1/2 px-3 font-medium text-strong bg-white -translate-x-1/2">or</span>
          </div>
          <p className='text-center justify-center text-3xl'>Generate Random <br /> <span className='shifting-text'>Flash</span> Card</p>

          <div className='pb-32 w-full flex flex-col'>
            <GenerateRandomCard />
          </div>
          
        </section>
        <Footer />
    </>
  )
}



function GenerateRandomCard() {

  const [allCards, setAllCards] = useState({});
  const [card, setCard] = useState({qu: "A random question from the 'AWS Certified Cloud Practitioner' written by B.Piper and D.Clinton.", ans: {"1": "Press the button below", "2": "Answer the question", "3": "Hover over this card to see the solution", "4": "Rinse and Repeat"}, sol: "The solution will be here."});

  const getData = () => {
      fetch(`data.json`,{
          headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          }
      }).then((res) => {
        return res.json();
      }).then((myJson) => {
        setAllCards(myJson)
      });
  }

  useEffect(() => {
    getData();
  }, []);

  const getRandCard = (e) => {
    let moduleQuestions = allCards[`module-${Math.floor(Math.random() * 10)}`]
    if (moduleQuestions) {
      let moduleSize = Object.keys(moduleQuestions).length;
      setCard(moduleQuestions[Math.floor(Math.random() * moduleSize)])
    }
  }

  return (
    <>
        <div className="w-[300px] h-[600px] cursor-pointer group perspective self-center">
            <div className="relative preserve-3d group-hover:my-rotate-y-180 w-full h-full duration-1000">
                <div className="absolute backface-hidden bg-white shadow-lg border-2 border-soft w-full h-full p-8 flex flex-col justify-around items-center text-center">
                    <p className="font-bold text-base text-dark">{card.qu}</p>
                    <div>
                     {card ? 
                     <ul className=''>
                          {Object.keys(card.ans).map((i) => (
                              <li key={i} className='flex flex-row gap-2 items-center pt-2 text-dark'>
                                  <p className='italic'>{i}.</p>
                                  <p className='text-left text-sm'>{card.ans[i]}</p>
                              </li>
                          ))}
                      </ul>
                    : "hello"}
                    </div>
                </div>
                <div className="absolute my-rotate-y-180 backface-hidden w-full h-full bg-light border-2 border-soft text-purple-navy shadow-lg overflow-hidden p-8 flex flex-col justify-around items-center text-center">
                    <p>{card.sol}</p>
                </div>
            </div>
        </div>

        <div className='pt-12 flex flex-row w-full items-end justify-center'>
          <motion.button onClick={getRandCard} className='bg-light p-3 border border-dark text-dark shadow-md hover:border-strong hover:bg-transparent'>
            New Card
          </motion.button>
        </div>
                            
        <p className='text-center pt-12 opacity-30 px-12'>If you get an error, just refresh the page. IDK why is breaks.</p>
    
    </>
  );
}

export default HomePage;
