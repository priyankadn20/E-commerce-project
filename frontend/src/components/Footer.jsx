import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img src={assets.logo} className='mb-5 w-32' alt=''/>
                <p className='w-full md:w-2/3 text-gray-600'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur eligendi eius hic eos quod, ab inventore? Asperiores, quisquam vitae animi facere iste soluta, cumque et placeat, incidunt dolore iure illum!  
                </p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <Link to='/'><li className='hover:text-black cursor-pointer'>Home</li></Link>
                    <Link to='/about'><li className='hover:text-black cursor-pointer'>About us</li></Link>
                    <Link to='/collection'><li className='hover:text-black cursor-pointer'>Delivery</li></Link>
                    <Link to='/OurPolicy'><li className='hover:text-black cursor-pointer'>Privacy policy</li></Link>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+880 1753669229</li>
                    <li>contact@foreveryou.com</li>
                </ul>
            </div>
        </div>
        <div>
            <hr/>
            <p className='py-5 text-sm text-center'>Copyright 2026@ forever.com - All Right</p>
        </div>
    </div>
  )
}

export default Footer