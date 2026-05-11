import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/assets'
import NewsLetteraBox from "../components/NewsLetteraBox";  

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1= {'Contact'} text2={'Us'}/>
      </div>
      <div className = 'my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="Contact" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className = 'font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>3033 Main Street <br /> New York, NY 10001</p>
          <p className='text-gray-500'>Phone: (123) 456-7890 <br /> Fax: (123) 456-7891</p>
          <p className='font-semibold text-gray-600'>Careers of Forever</p>
          <p className='text-gray-500'>Learn more about our team and job openings</p>
          <button className='border border-black px-8 py-4 text-sm hover:text-white hover:bg-black transition all duration-500'>Explore jobs</button>
        </div>
      </div>
      <NewsLetteraBox />
    </div>
  )
}

export default Contact
