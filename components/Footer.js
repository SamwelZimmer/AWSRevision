import React from 'react'

const Footer = () => {
  return (
    <div className="relative top-0 left-0 bg-transparent" >
        <svg className='border-none' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#050505" stroke="#050505" fillOpacity="1" d="M0,96L0,192L240,192L240,32L480,32L480,32L720,32L720,128L960,128L960,64L1200,64L1200,256L1440,256L1440,320L1200,320L1200,320L960,320L960,320L720,320L720,320L480,320L480,320L240,320L240,320L0,320L0,320Z"></path></svg>
        <div className='text-light bg-dark pb-12 flex flex-col gap-6 items-center justify-center'>
            <h2 className='text-3xl'>SiteName</h2>
            <h4 className='text-strong'>Samwel Zimmer</h4>
        </div>
    </div>
  )
}

export default Footer