/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button } from '@/components/ui/button'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';


const API_URL='https://api.unsplash.com/search/photos';
const IMAGES_PER_PAGE=2;

function PlaceCardItem({ place }) {

    
    
        const [photoUrl, setPhotoUrl]=useState();
     useEffect(()=>{
        place && GetPlacePhoto();
     }, [place])
    
     const GetPlacePhoto=async()=>{
       try{ const data= place.placeName
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
        <Link  to={'https://www.google.com/maps/search/?api=1&query=' + place?.placeName} target='_blank' className='text-black '>
            <div className='border rounded-xl p-3 mt-2 flex gap-2 hover:scale-105 transiton-all hover:shadow-md curser-pointer text-black'>
                <img src={photoUrl?photoUrl:'placeholder.png'}
                    alt="Trip Placeholder"
                    className=' w-[130px] h-[130px] rounded-xl object-cover'
                />
                <div>
                    <h2 className='font-bold text-lg'>{place.placeName}</h2>
                    <p className='text-sm text-gray-400'>{place?.placeDetails}</p>
                    <h2 className='mt-2'>🕙 {place?.timeToTravel}</h2>

                    {/* <Button size="sm" bg="black" color="white">
                        <FaMapLocationDot className='text-white' />
                    </Button> */}
                    
                </div>
            </div>
        </Link>
    )
}

export default PlaceCardItem