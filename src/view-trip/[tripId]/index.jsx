import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

function Viewtrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState([])


useEffect(() => {
   tripId && getTripData();
}, [tripId])

    //get data from firebase
    const getTripData = async () => {
        
            const docRef = doc(db, 'AiTrips', tripId);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setTrip(docSnap.data());
            } else {
                console.log("No such document");
                toast('No trip found');
            }
        
    };


    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
           {/* information section */}
          <InfoSection  trip={trip}/>

           {/*    reccommendation hotels */}        
          <Hotels trip={trip}/>

           {/* daily plan */}
              <PlacesToVisit trip={trip}/>

              {/* footer */}
              <Footer trip={trip}/>
        </div>
    )
}

export default Viewtrip;
