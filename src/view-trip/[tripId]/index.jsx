import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';
import Chatbot from '../../Chatbot'; 

function Viewtrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState([]);
    const [isChatbotVisible, setChatbotVisible] = useState(false); // State to control Chatbot visibility

    useEffect(() => {
        tripId && getTripData();
    }, [tripId]);

    // Get data from Firebase
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

    // Function to toggle Chatbot visibility
    const toggleChatbot = () => {
        setChatbotVisible(!isChatbotVisible);
    };

    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            {/* Information section */}
            <InfoSection trip={trip} />

            {/* Recommendation hotels */}        
            <Hotels trip={trip} />

            {/* Daily plan */}
            <PlacesToVisit trip={trip} />

            {/* Emoji Button to toggle Chatbot */}
            <button onClick={toggleChatbot} className="text-2xl fixed bottom-4 right-4 bg-gray-200 rounded-full p-2 shadow-md">
                🤖 
            </button>

            {/* Chatbot Section - conditionally render Chatbot just above the emoji */}
            {isChatbotVisible && (
                <div className="fixed bottom-16 right-4 z-50"> {/* Positioning above the emoji button */}
                    <Chatbot />
                </div>
            )}

            {/* Footer */}
            <Footer trip={trip} />
        </div>
    );
}

export default Viewtrip;
