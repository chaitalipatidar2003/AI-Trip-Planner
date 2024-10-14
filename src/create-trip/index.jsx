import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '@/constants/options';
import { chatSession } from '@/service/AIModal';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

function CreateTrip() {
    const [place, setPlace] = useState("");
    const [formData, setFormData]=useState([]);
    const [error, setError] = useState('');


    const handleInputChange=(name, value)=>{
        if (name === 'noOfDays') {
            if (value > 5) {
                setError('Please enter less than 5 days');
                return;
            } else {
                setError(''); 
            }
        }

       setFormData({
        ...formData,
        [name]:value
       })
    }

   useEffect(()=>{
     console.log(formData);
   }, [formData])

   

   const OnGenerateTrip=async()=>{
    if (error || formData?.noOfDays > 5 && !formData?.location || !formData?.budget|| !formData?.traveler) {
        toast("PLease fill all details.")

        return; // Exit the function if there's an error
    }

    console.log(formData);
    
    const FINAL_PROMT=AI_PROMPT
    .replace('{location}',formData?.location)
    .replace('{totalDays}', formData?.noOfDays)
    .replace('{traveler}', formData?.traveler)
    .replace('{budget}', formData?.budget)
    .replace('{totalDays}', formData?.noOfDays)
    

    console.log(FINAL_PROMT);

    const result=await chatSession.sendMessage(FINAL_PROMT);

    console.log(result?.response?.text());
   }

    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
            <h2 className='font-bold text-3xl'> Tell us about your travel preferences 🌴🏕️</h2>
            <p className='mt-3 text-gray-500 text-xl'>
                Share your travel preferences to receive a personalized itinerary that suits your style, budget, and desired experiences.
            </p>

          

            <div className='mt-20 flex flex-col gap-10 '>
                <div>
                    <h2 className='text-xl my-3 font-medium'>What is the destination of your choice</h2>
                    
                    {/* Simple Input Field */}
                    <Input 
                        placeholder={"Ex. Shimla"} 
                        type="text" 
                        value={place} 
                        onChange={(e) => setPlace(e.target.value)} 
                        onBlur={() => handleInputChange('location', place)}  // Update only when the input loses focus
                    />
                </div>
            </div>

            <div>
            <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
                   <Input 
                        placeholder={"Ex. 7"} 
                        type="number"
                        onBlur={(e)=>handleInputChange('noOfDays', e.target.value)} 
                        />

                         {/* Display error message if the input is invalid */}
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>

            <div>
            <h2 className='text-xl my-3 font-medium'>what is your budget?</h2>
             <div className='grid grid-cols-3 gap-5 mt-5'>
                {SelectBudgetOptions.map((item, index)=>(
                    <div key={index} 
                     onClick={()=>handleInputChange('budget', item.title)}
                    className={`p-4 border cursor-pointer 
                    rounded-lg hover:shadow-lg
                    ${formData?.budget==item.title&&'shadow-lg border-black'}
                    `}>
                   <h2 className='text-4xl'>{item.icon}</h2>
                   <h2 className='font-bold text-lg'>{item.title}</h2>
                   <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                    </div>
                ))}
             </div>
            </div>

            <div>
            <h2 className='text-xl my-3 font-medium'>who do you plan on traveling with your next adventure?</h2>
             <div className='grid grid-cols-3 gap-5 mt-5'>
                {SelectTravelList.map((item, index)=>(
                    <div key={index}
                    onClick={()=>handleInputChange('traveler', item.people)}
                    className={`p-4 border cursor-pointer
                     rounded-lg hover:shadow-lg
                     ${formData?.traveler==item.people && 'shadow-lg border-black'}
                     `}>
                   <h2 className='text-4xl'>{item.icon}</h2>
                   <h2 className='font-bold text-lg'>{item.title}</h2>
                   <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                    </div>
                ))}
             </div>
            </div>


       <div className='my-10 justify-end flex'>
            <Button
             onClick={OnGenerateTrip}
            className='text-white'
            disabled={!!error}
            >Genrate Trip</Button>

       </div>
        </div>
    );
}

export default CreateTrip;
