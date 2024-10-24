import { Button } from '@/components/ui/button';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoIosSend } from "react-icons/io";

const API_URL='https://api.unsplash.com/search/photos';
const IMAGES_PER_PAGE=2;
function InfoSection({ trip }) {

    const [photoUrl, setPhotoUrl]=useState();
 useEffect(()=>{
    trip && GetPlacePhoto();
 }, [trip])

 const GetPlacePhoto=async()=>{
   try{ const data= trip?.userSelection?.location
    const result=await axios.get(
        `${API_URL}?query=${data}&page=1&per_page=${IMAGES_PER_PAGE}&client_id=${
            import.meta.env.VITE_UNSPLASH_API_KEY
        }`
    )
    console.log('result' ,result.data);
    const PhotoUrl=result.data.results[0].urls.small;
    setPhotoUrl(PhotoUrl);
     }catch(error){
        console.log(error);
     }
 }

    return (
        <div>
            <img
                src={photoUrl}
                alt="Trip Placeholder"
                className='h-[340px] w-full object-cover rounded-xl'
            />
            <div className='flex justify-between items-center '>
                <div className='my-5 flex flex-col gap-2 '>
                    <h2 className='font-bold text-2xl  '>{trip?.userSelection?.location}</h2>

                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>📅 {trip?.userSelection?.noOfDays} Day</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💰 {trip?.userSelection?.budget} Budget</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🥂 No. of Traveler {trip?.userSelection?.traveler} </h2>
                    </div>
                </div>

                <Button className='bg-black text-white'>
              <IoIosSend />
            </Button>
            </div>

            
        </div>
    );
}

export default InfoSection;