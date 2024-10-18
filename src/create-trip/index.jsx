import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '@/constants/options';
import { chatSession } from '@/service/AIModal';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { FcGoogle } from "react-icons/fc"
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader

} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';



function CreateTrip() {
    const [place, setPlace] = useState("");
    const [formData, setFormData] = useState([]);
    const [error, setError] = useState('');

    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);

   const navigate= useNavigate();

    const handleInputChange = (name, value) => {
        if (name === 'noOfDays') {
            if (value > 10) {
                setError('Please enter less than 5 days');
                return;
            } else {
                setError('');
            }
        }

        setFormData({
            ...formData,
            [name]: value
        })
    }

    useEffect(() => {
        console.log(formData);
    }, [formData])

    const login = useGoogleLogin({
        onSuccess: (codeResp) => console.log(codeResp),
        onError: (error) => console.log(error)
    })

    const OnGenerateTrip = async () => {

        const user = localStorage.getItem('user');
        if (!user) {
            setOpenDialog(true);
            return;
        }


        if (error || formData?.noOfDays > 10 && !formData?.location || !formData?.budget || !formData?.traveler) {
            toast("PLease fill all details.")

            return; // Exit the function if there's an error
        }


        console.log(formData);

        setLoading(true);

        const FINAL_PROMT = AI_PROMPT
            .replace('{location}', formData?.location)
            .replace('{totalDays}', formData?.noOfDays)
            .replace('{traveler}', formData?.traveler)
            .replace('{budget}', formData?.budget)
            .replace('{totalDays}', formData?.noOfDays)


        // console.log(FINAL_PROMT);

        const result = await chatSession.sendMessage(FINAL_PROMT);

        console.log("--", result?.response?.text());

        setLoading(false);
        SaveAiTrip(result?.response?.text());

    }

    const SaveAiTrip = async (TripData) => {
        // Add a new document in collection "cities"
        setLoading(true);

        const docId = Date.now().toString();
        const user = JSON.parse(localStorage.getItem('user'));

        await setDoc(doc(db, "AiTrips", docId), {
            userSelection: formData,
            tripData: JSON.parse(TripData),
            userEmail: user?.email,
            id: docId
        });

        setLoading(false);

        navigate(`/view-trip/${docId}`);
    }

    const GetUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'application/json'
            }
        }).then((resp) => {
            console.log(resp);
            localStorage.setItem('user', JSON.stringify(resp.data))
            setOpenDialog(false);
            OnGenerateTrip();
        })

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
                    onBlur={(e) => handleInputChange('noOfDays', e.target.value)}
                />

                {/* Display error message if the input is invalid */}
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>

            <div>
                <h2 className='text-xl my-3 font-medium'>what is your budget?</h2>
                <div className='grid grid-cols-3 gap-5 mt-5'>
                    {SelectBudgetOptions.map((item, index) => (
                        <div key={index}
                            onClick={() => handleInputChange('budget', item.title)}
                            className={`p-4 border cursor-pointer 
                    rounded-lg hover:shadow-lg
                    ${formData?.budget == item.title && 'shadow-lg border-black'}
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
                    {SelectTravelList.map((item, index) => (
                        <div key={index}
                            onClick={() => handleInputChange('traveler', item.people)}
                            className={`p-4 border cursor-pointer
                     rounded-lg hover:shadow-lg
                     ${formData?.traveler == item.people && 'shadow-lg border-black'}
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
                    disabled={loading}
                >

                    {
                        loading ?
                            <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> :
                            'Genrate Trip'
                    }
                </Button>

            </div>

            <Dialog open={openDialog}>

                <DialogContent>
                    <DialogHeader>
                        <DialogDescription>
                            <img src='/logo.png' />
                            <h2 className='font-bold text-lg mt-7' >Sign With Google</h2>

                            <p>Sign in to the App with Google authentication securely</p>

                            <Button
                                disabled={loading}
                                onClick={login}
                                className="w-full mt-5 bg-black text-white flex gap-4 items-center">

                                <FcGoogle className='h-7 w-7' /> Sign In With Google


                            </Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    );
}

export default CreateTrip;
