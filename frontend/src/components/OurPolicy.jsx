import React from 'react'
import { assets } from '../assets/assets'
import NewsLetteraBox from '../components/NewsLetteraBox'
import Title from '../components/Title'

const PrivacyPolicy = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'PRIVACY'} text2={'POLICY'} />
      </div>

      <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
        <div>
          <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt='' />
          <p className='font-semibold'>Easy Exchange Policy</p>
          <p className='text-gray-400'>We offer hassle free exchange policy</p>
        </div>
        <div>
          <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt='' />
          <p className='font-semibold'>7 Days Return Policy</p>
          <p className='text-gray-400'>We provide 7 days free return policy</p>
        </div>
        <div>
          <img src={assets.support_img} className='w-12 m-auto mb-5' alt='' />
          <p className='font-semibold'>Best Customer Support</p>
          <p className='text-gray-400'>We provide 24/7 customer support</p>
        </div>
      </div>

      <NewsLetteraBox />
    </div>
  )
}

export default PrivacyPolicy