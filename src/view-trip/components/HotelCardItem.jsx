import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const API_URL='https://api.unsplash.com/search/photos';
const IMAGES_PER_PAGE=2;

export default function HotelCardItem({hotel, index}) {
   
    const [photoUrl, setPhotoUrl]=useState();
 useEffect(()=>{
    hotel && GetPlacePhoto();
 }, [hotel])

 const GetPlacePhoto=async()=>{
   try{ const data= hotel?.hotelName
    const result=await axios.get(
        `${API_URL}?query=${data}&page=1&per_page=${IMAGES_PER_PAGE}&client_id=${
            import.meta.env.VITE_UNSPLASH_API_KEY
        }`
    )
    console.log('result' ,result.data);

    const PhotoUrl=result.data.results[1].urls.small;
    setPhotoUrl(PhotoUrl);
     }catch(error){
        console.log(error);
     }
 }


  
    return (
  
       <Link key={index} to={'https://www.google.com/maps/search/?api=1&query='+ hotel?.hotelName+"." + hotel?.hotelAddress} target='_blank'>
                        <div key={index} className='hover:scale-105 transition-all cursor-pointer'>
                            <img
                                src={photoUrl}
                                alt="Trip Placeholder"
                                className='rounded-xl h-[180px] w-full object-cover'
                            />
                            <div className='my-2 flex flex-col gap-2'>
                                <h2 className='font-medium'>{hotel?.hotelName}</h2>
                                <h2 className='text-xs text-gray-500'>📍 {hotel?.hotelAddress}</h2>
                                <h2 className='text-sm'>💰 {hotel?.price}</h2>
                                <h2 className='text-sm'>⭐ {hotel?.rating} </h2>
                            </div>

                        </div>
        </Link>
   
  )
}