// import React, { useState } from 'react';
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { Button } from "./components/ui/button";

// const genAI = new GoogleGenerativeAI(import.meta.env.VITE_AI_STUDIO_API);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// function Chatbot() {
//     const [chatInput, setChatInput] = useState("");
//     const [chatResponse, setChatResponse] = useState("");

//     const handleChatSubmit = async () => {
//         if (chatInput.trim() === "") return;

//         const prompt = chatInput;

//         try {
//             console.log("Sending prompt:", prompt);
//             const result = await model.generateContent([prompt]);
//             console.log("AI Response:", result);
//             setChatResponse(result.response.text());
//         } catch (error) {
//             console.error("Error generating response:", error);
//             setChatResponse("Sorry, I couldn't process that. Please try again.");
//         }
//     };

//     return (
//         <div className="w-full mt-12 p-4 bg-gray-100 rounded-lg shadow-md flex flex-col items-center">
//             <h2 className="text-2xl font-bold mb-4">Ask Our AI Assistant</h2>
//             <div className="flex w-full max-w-md">
//                 <input
//                     type="text"
//                     className="flex-grow p-2 border border-gray-300 rounded-l-md"
//                     placeholder="Type your question here..."
//                     value={chatInput}
//                     onChange={(e) => setChatInput(e.target.value)}
//                 />
//                 <Button className="rounded-r-md bg-black text-white" onClick={handleChatSubmit}>
//                     Ask
//                 </Button>
//             </div>
//             {chatResponse && (
//                 <div className="mt-4 p-3 bg-white border rounded-lg text-gray-700">
//                     <p>{chatResponse}</p>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Chatbot;



import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Button } from "./components/ui/button";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_AI_STUDIO_API);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function Chatbot() {
    const [chatInput, setChatInput] = useState("");
    const [chatHistory, setChatHistory] = useState([]);

    const handleChatSubmit = async () => {
        if (chatInput.trim() === "") return;

        const userMessage = chatInput;
        const newChatHistory = [...chatHistory, { sender: 'user', text: userMessage }];
        setChatHistory(newChatHistory);
        setChatInput(""); // Clear input field

        try {
            const result = await model.generateContent([userMessage]);
            const aiResponse = result.response.text();
            setChatHistory([...newChatHistory, { sender: 'ai', text: aiResponse }]);
        } catch (error) {
            console.error("Error generating response:", error);
            setChatHistory([...newChatHistory, { sender: 'ai', text: "Sorry, I couldn't process that. Please try again." }]);
        }
    };

    return (
        <div className="w-full mt-12 p-4 bg-gray-100 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Ask Our AI Assistant</h2>
            <div className="flex w-full max-w-md flex-col space-y-4 mb-4">
                {/* Display chat history */}
                <div className="bg-white p-3 rounded-lg max-h-60 overflow-y-auto">
                    {chatHistory.map((chat, index) => (
                        <div key={index} className={chat.sender === 'user' ? "text-right" : "text-left"}>
                            <p className={`font-semibold ${chat.sender === 'user' ? "text-blue-600" : "text-gray-700"}`}>
                                {chat.sender === 'user' ? "You: " : "AI: "}
                            </p>
                            <p className={`${chat.sender === 'user' ? "text-blue-600" : "text-gray-700"}`}>{chat.text}</p>
                        </div>
                    ))}
                </div>
                <div className="flex w-full">
                    <input
                        type="text"
                        className="flex-grow p-2 border border-gray-300 rounded-l-md"
                        placeholder="Type your question here..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                    />
                    <Button className="rounded-r-md bg-black text-white" onClick={handleChatSubmit}>
                        Ask
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Chatbot;
