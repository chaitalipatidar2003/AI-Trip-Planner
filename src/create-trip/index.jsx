import React from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

function CreateTrip() {
    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
            <h2 className='font-bold text-3xl'> Tell us about your travel preferences</h2>
            <p className='mt-3 text-gray-500 text-xl'>Share your travel preferences to receive a personalized itinerary that suits your style, budget, and desired experiences.</p>

            <div>
                <div className='mt-15'>
                     <h2 className='font-bold text-2xl mt-10 my-3'>1. Where are you traveling to?</h2>
                        <p className='text-gray-500 mt-3'>Enter the destination you want to visit</p>
                      {/* <GooglePlacesAutocomplete apiKey={import.meta.env.vite_google_place_api}/> */}

                        <input type='text' className='border border-gray-300 rounded-lg w-full mt-3 p-3' placeholder='Enter destination'/>
                        

                </div>

            </div>

        </div>
    )
}



export default CreateTrip


