import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
    return (
        < div className='flex flex-row'>
        <div className='flex flex-col items-center mx-56 gap-9'>
            <h1 className='font-extrabold text-[60px] text-center mt-16'>
                Plan Your Next Adventure with AI: <span className='text-blue-500'> Personalize Your Trip</span>
            </h1>
            <p className='text-xl text-gray-500 text-center'>AI Trip Planner is an intelligent travel assistant that helps you create personalized itineraries, making your travel planning easy and efficient. Discover new destinations and customize your trips with just a few clicks.</p>
              
        <Link to={'/create-trip'}>    
              <Button className='bg-black text-white'>Get Started, It's free</Button>
         </Link>  
        
        </div>
            
       
        </div>
    )
}

export default Hero
