import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import Chatbot from '@/Chatbot'; // Import the Chatbot component

function Hero() {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false); // State to control Chatbot visibility

    const translateButtonRef = useRef(null);

    useEffect(() => {
        // Create Google Translate button if it doesn't exist yet
        if (!translateButtonRef.current) {
            translateButtonRef.current = document.createElement('div');
            translateButtonRef.current.id = 'google_translate_element';
            document.body.appendChild(translateButtonRef.current);
            const script = document.createElement('script');
            script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            document.body.appendChild(script);
            window.googleTranslateElementInit = () => {
                new window.google.translate.TranslateElement(
                    { pageLanguage: 'en' },
                    'google_translate_element'
                );
            };
        }
    }, []);


    return (
        <div className="flex flex-col items-center mx-56 gap-9 relative">

<div id="google_translate_element" className="absolute top-4 right-4"></div>

            <h1 className="font-extrabold text-[60px] text-center mt-16">
                Plan Your Next Adventure with AI: <span className="text-blue-500">Personalize Your Trip</span>
            </h1>
            <p className="text-xl text-gray-500 text-center">
                AI Trip Planner is an intelligent travel assistant that helps you create personalized itineraries, making your travel planning easy and efficient. Discover new destinations and customize your trips with just a few clicks.
            </p>
            <Link to="/create-trip">
                <Button className="bg-black text-white">Get Started, It's free</Button>
            </Link>
            <div className="w-80 h-80">
                <img src="trip.png" alt="Hero" className="w-72 h-48 border-4 border-black shadow-xl" />
            </div>






            {/* Chatbot Button fixed to the bottom right */}
            <div className={`fixed bottom-10 right-10 z-50`}>
                <button
                    className="text-2xl fixed bottom-4 right-4 bg-gray-200 rounded-full p-2 shadow-md"
                    onClick={() => setIsChatbotOpen(!isChatbotOpen)}
                    title="Open Chatbot"
                >
                    🤖
                </button>
                {/* Conditionally render the Chatbot component */}
                {isChatbotOpen && (
                    <div className="mt-2">
                        <Chatbot />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Hero;
