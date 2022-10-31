import React, { useEffect, useState } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { motion } from 'framer-motion';


export default function Quiz({ moduleData, module }) {

    const [quizData, setQuizData] = useState({});

    const getData = () => {
        fetch(`data.json`,{
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((res) => {
            return res.json();
        }).then((myJson) => {
            setQuizData(myJson[module])
        });
    }


    useEffect(() => {
        getData();
    }, []);



    const QuizCard = ({ data, no }) => (
        <div className="w-[300px] h-[700px] pb-12 bg-transparent cursor-pointer group perspective mx-10">
            <div className="relative preserve-3d group-hover:my-rotate-y-180 w-full h-full duration-1000">
                <div className="absolute backface-hidden bg-offwhite shadow-lg border-2 w-full h-full p-8 flex flex-col justify-around items-center text-center">
                    <p className="font-bold text-base text-dark"><span className='italic font-thin'>{no}.  </span>{data?.qu}</p>
                    <div>
                        <ul className=''>
                            {Object.keys(data.ans).map((i) => (
                                <li key={i} className='flex flex-row gap-2 items-center pt-2 text-dark'>
                                    <p className='italic'>{i}.</p>
                                    <p className='text-left text-sm'>{data.ans[i]}</p>
                                </li>
                            ))}
                            
                        </ul>
                    </div>
                </div>
                <div className="absolute my-rotate-y-180 backface-hidden w-full h-full bg-white text-purple-navy shadow-lg overflow-hidden p-8 flex flex-col justify-around items-center text-center">
                    <p>{data?.sol}</p>
                </div>
            </div>
        </div>
    )

    return (
        <>
        {quizData && (
            <div className='flex flex-col gap-2'>

                <p className="text-dark opacity-20 pt-1 text-center">*click me*</p>
                
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
                    {Object.keys(quizData).map((i) => (
                        <QuizCard key={i} data={quizData[i]} no={i}  />
                    ))}
                </div>
                
                <div className='flex flex-col gap-3 pt-12'>
                    <p className='opacity-70 text-sm'>All question have been sources directly from:</p>
                    <p className='text-strong font-thin text-lg'>{"'"}AWS Certified Cloud Practitioner STUDY GUIDE{"'"}</p>
                    <p className='opacity-70'>written by B. Piper and D. Clinton</p>
                    <p className='opacity-20 text-xs pt-8 text-dark'>(Trying to save myself a lawsuit.)</p>
                </div>

            </div>
        )}
        </>
    );
}
