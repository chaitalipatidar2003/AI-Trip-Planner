import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigation } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';

export default function MyTrips() {
  
    const navigation = useNavigation();
    const [userTrips, setUserTrips] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        GetUserTrips();
    }, []);
    
    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigation('/');
            return;
        }
        
        setUserTrips([]); 
        setLoading(true); 

        const q = query(collection(db, 'AiTrips'), where('userEmail', '==', user?.email));
        const querySnapshot = await getDocs(q);
        const trips = [];

        querySnapshot.forEach((doc) => {
            trips.push(doc.data());
        });

        setUserTrips(trips);
        setLoading(false); 
    };

    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10 mb-2'>
            <h2 className='font-bold text-3xl'>
                My Trips
            </h2>

            <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5'>
                {loading ? (
                    
                    [1, 2, 3, 4, 5, 6].map((item, index) => (
                        <div key={index} className='h-[220px] w-full bg-slate-200 animate-pulse rounded-xl'></div>
                    ))
                ) : userTrips.length > 0 ? (
                  
                    userTrips.map((trip, index) => (
                        <UserTripCardItem key={index} trip={trip} />
                    ))
                ) : (
                    
                    <p className='col-span-2 md:col-span-3  text-gray-500'>
                        No trips yet 🥲🌴!
                    </p>
                )}
            </div>
        </div>
    );
}