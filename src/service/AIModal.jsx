import { GoogleGenerativeAI } from "@google/generative-ai";

  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

   export const chatSession = model.startChat({
      generationConfig,
     history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel Plan for location:Las vegas, for 3 Days for Couple with a cheap budget, give me a hotels options list with hotelName, hotel address, price, hotel image url, geo coordinated, rating, description ans suggezt itineary with time of travel like(ex. 9:00 AM - 12:00 PM , placeName, Place Details, Place image url, geo coordinates, ticket pricing, timetotravel each of the location for 3 days with each day plan with best time to visit in JSON format."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"hotelOptions\": [\n    {\n      \"hotelName\": \"The D Las Vegas\",\n      \"hotelAddress\": \"301 Fremont Street, Las Vegas, NV 89101\",\n      \"price\": \"$50 - $80\",\n      \"hotelImageUrl\": \"https://www.theDlasvegas.com/images/hotel-exterior.jpg\", \n      \"geoCoordinates\": \"36.1696° N, 115.1422° W\",\n      \"rating\": 4.0,\n      \"description\": \"A classic downtown hotel with a retro vibe. Features the iconic Fremont Street Experience.\"\n    },\n    {\n      \"hotelName\": \"Golden Nugget Las Vegas\",\n      \"hotelAddress\": \"129 E Fremont Street, Las Vegas, NV 89101\",\n      \"price\": \"$60 - $100\",\n      \"hotelImageUrl\": \"https://www.goldennugget.com/las-vegas/images/hotel-exterior.jpg\", \n      \"geoCoordinates\": \"36.1696° N, 115.1423° W\",\n      \"rating\": 4.5,\n      \"description\": \"A historic hotel with an impressive shark tank aquarium and a lively casino floor.\"\n    },\n    {\n      \"hotelName\": \"Plaza Hotel & Casino\",\n      \"hotelAddress\": \"1 Main Street, Las Vegas, NV 89101\",\n      \"price\": \"$45 - $75\",\n      \"hotelImageUrl\": \"https://www.plazahotelcasino.com/images/hotel-exterior.jpg\", \n      \"geoCoordinates\": \"36.1697° N, 115.1423° W\",\n      \"rating\": 3.5,\n      \"description\": \"Affordable downtown hotel with a classic feel and easy access to the Fremont Street Experience.\"\n    },\n    {\n      \"hotelName\": \"The Orleans\",\n      \"hotelAddress\": \"4500 W Tropicana Ave, Las Vegas, NV 89103\",\n      \"price\": \"$40 - $60\",\n      \"hotelImageUrl\": \"https://www.orleanscasino.com/images/hotel-exterior.jpg\", \n      \"geoCoordinates\": \"36.0980° N, 115.1651° W\",\n      \"rating\": 3.0,\n      \"description\": \"A spacious hotel with a casual atmosphere and affordable dining options.\"\n    }\n  ],\n  \"itinerary\": [\n    {\n      \"day\": 1,\n      \"title\": \"Downtown Delights\",\n      \"activities\": [\n        {\n          \"time\": \"9:00 AM - 12:00 PM\",\n          \"placeName\": \"Fremont Street Experience\",\n          \"placeDetails\": \"Explore the lively pedestrian mall, enjoy street performers, and watch the spectacular light show.\",\n          \"placeImageUrl\": \"https://www.fremontstreetexperience.com/images/fremont-street-experience.jpg\",\n          \"geoCoordinates\": \"36.1696° N, 115.1422° W\",\n          \"ticketPricing\": \"Free\",\n          \"timeToTravel\": \"30 mins\" \n        },\n        {\n          \"time\": \"12:00 PM - 1:30 PM\",\n          \"placeName\": \"Lunch at a Downtown Eatery\",\n          \"placeDetails\": \"Choose from numerous affordable options along Fremont Street, like the Heart Attack Grill for a unique experience.\",\n          \"placeImageUrl\": \"https://www.heartattackgrill.com/images/restaurant.jpg\",\n          \"geoCoordinates\": \"36.1695° N, 115.1424° W\",\n          \"ticketPricing\": \"Budget-friendly\",\n          \"timeToTravel\": \"15 mins\"\n        },\n        {\n          \"time\": \"1:30 PM - 3:00 PM\",\n          \"placeName\": \"The Neon Museum\",\n          \"placeDetails\": \"Explore a collection of iconic Las Vegas neon signs, a great photo opportunity.\",\n          \"placeImageUrl\": \"https://www.neonmuseum.org/images/neon-museum.jpg\",\n          \"geoCoordinates\": \"36.1600° N, 115.1461° W\",\n          \"ticketPricing\": \"$20 per person\",\n          \"timeToTravel\": \"20 mins\"\n        },\n        {\n          \"time\": \"3:00 PM - 4:00 PM\",\n          \"placeName\": \"Downtown Container Park\",\n          \"placeDetails\": \"A unique shopping and dining experience built from repurposed shipping containers.\",\n          \"placeImageUrl\": \"https://www.downtowncontainerpark.com/images/container-park.jpg\",\n          \"geoCoordinates\": \"36.1692° N, 115.1426° W\",\n          \"ticketPricing\": \"Free\",\n          \"timeToTravel\": \"10 mins\"\n        },\n        {\n          \"time\": \"4:00 PM - 6:00 PM\",\n          \"placeName\": \"Free Walking Tour\",\n          \"placeDetails\": \"Join a free walking tour (check online for schedules) to learn about Las Vegas history and see hidden gems.\",\n          \"placeImageUrl\": \"https://www.freelastvegastours.com/images/walking-tour.jpg\",\n          \"geoCoordinates\": \"36.1696° N, 115.1422° W\",\n          \"ticketPricing\": \"Free\",\n          \"timeToTravel\": \"60 mins\"\n        },\n        {\n          \"time\": \"6:00 PM - 8:00 PM\",\n          \"placeName\": \"Dinner at a Downtown Casino Buffet\",\n          \"placeDetails\": \"Enjoy a discounted buffet at a downtown casino like Golden Nugget or The D.\",\n          \"placeImageUrl\": \"https://www.goldennugget.com/las-vegas/images/buffet.jpg\",\n          \"geoCoordinates\": \"36.1696° N, 115.1423° W\",\n          \"ticketPricing\": \"Budget-friendly\",\n          \"timeToTravel\": \"15 mins\"\n        },\n        {\n          \"time\": \"8:00 PM - 10:00 PM\",\n          \"placeName\": \"Fremont Street Experience After Dark\",\n          \"placeDetails\": \"Enjoy the vibrant atmosphere of Fremont Street as the city lights up.\",\n          \"placeImageUrl\": \"https://www.fremontstreetexperience.com/images/fremont-street-night.jpg\",\n          \"geoCoordinates\": \"36.1696° N, 115.1422° W\",\n          \"ticketPricing\": \"Free\",\n          \"timeToTravel\": \"30 mins\"\n        }\n      ]\n    },\n    {\n      \"day\": 2,\n      \"title\": \"The Strip & Entertainment\",\n      \"activities\": [\n        {\n          \"time\": \"9:00 AM - 11:00 AM\",\n          \"placeName\": \"Breakfast at a Casino Buffet\",\n          \"placeDetails\": \"Enjoy a discounted early-bird buffet at one of the Strip casinos (check for deals online).\",\n          \"placeImageUrl\": \"https://www.caesars.com/images/buffet.jpg\",\n          \"geoCoordinates\": \"36.1146° N, 115.1729° W\",\n          \"ticketPricing\": \"Budget-friendly\",\n          \"timeToTravel\": \"20 mins\"\n        },\n        {\n          \"time\": \"11:00 AM - 1:00 PM\",\n          \"placeName\": \"Exploring the Strip\",\n          \"placeDetails\": \"Walk or take a bus along the Strip to see the iconic hotels and casinos like Bellagio, Caesars Palace, and the Venetian.\",\n          \"placeImageUrl\": \"https://www.visitlasvegas.com/images/strip.jpg\",\n          \"geoCoordinates\": \"36.1146° N, 115.1729° W\",\n          \"ticketPricing\": \"Free\",\n          \"timeToTravel\": \"60 mins\"\n        },\n        {\n          \"time\": \"1:00 PM - 2:00 PM\",\n          \"placeName\": \"Lunch at a Food Court\",\n          \"placeDetails\": \"Enjoy a quick and affordable lunch at one of the many food courts in the Strip casinos.\",\n          \"placeImageUrl\": \"https://www.venetian.com/images/food-court.jpg\",\n          \"geoCoordinates\": \"36.1146° N, 115.1729° W\",\n          \"ticketPricing\": \"Budget-friendly\",\n          \"timeToTravel\": \"15 mins\"\n        },\n        {\n          \"time\": \"2:00 PM - 4:00 PM\",\n          \"placeName\": \"Bellagio Conservatory & Botanical Garden\",\n          \"placeDetails\": \"Experience a stunning display of flowers and botanical art.\",\n          \"placeImageUrl\": \"https://www.bellagio.com/images/conservatory.jpg\",\n          \"geoCoordinates\": \"36.1142° N, 115.1725° W\",\n          \"ticketPricing\": \"Free\",\n          \"timeToTravel\": \"10 mins\"\n        },\n        {\n          \"time\": \"4:00 PM - 5:30 PM\",\n          \"placeName\": \"Fountains of Bellagio Show\",\n          \"placeDetails\": \"Watch the iconic synchronized water and music show at the Bellagio.\",\n          \"placeImageUrl\": \"https://www.bellagio.com/images/fountains.jpg\",\n          \"geoCoordinates\": \"36.1142° N, 115.1725° W\",\n          \"ticketPricing\": \"Free\",\n          \"timeToTravel\": \"15 mins\"\n        },\n        {\n          \"time\": \"5:30 PM - 7:00 PM\",\n          \"placeName\": \"Dinner at a Strip Casino Buffet\",\n          \"placeDetails\": \"Check for discounts and deals on casino buffets for a tasty and filling meal.\",\n          \"placeImageUrl\": \"https://www.mgmgrand.com/images/buffet.jpg\",\n          \"geoCoordinates\": \"36.1146° N, 115.1729° W\",\n          \"ticketPricing\": \"Budget-friendly\",\n          \"timeToTravel\": \"20 mins\"\n        },\n        {\n          \"time\": \"7:00 PM - 9:00 PM\",\n          \"placeName\": \"Free Show\",\n          \"placeDetails\": \"Attend a free show on the Strip, like the Cirque du Soleil at the Bellagio (reservations recommended).\",\n          \"placeImageUrl\": \"https://www.bellagio.com/images/cirque-du-soleil.jpg\",\n          \"geoCoordinates\": \"36.1142° N, 115.1725° W\",\n          \"ticketPricing\": \"Free\",\n          \"timeToTravel\": \"15 mins\"\n        }\n      ]\n    },\n    {\n      \"day\": 3,\n      \"title\": \"Relax & Recharge\",\n      \"activities\": [\n        {\n          \"time\": \"9:00 AM - 11:00 AM\",\n          \"placeName\": \"Poolside Relaxation\",\n          \"placeDetails\": \"Enjoy some relaxing time by the pool at your hotel.\",\n          \"placeImageUrl\": \"https://www.theDlasvegas.com/images/pool.jpg\", \n          \"geoCoordinates\": \"36.1696° N, 115.1422° W\",\n          \"ticketPricing\": \"Free\",\n          \"timeToTravel\": \"0 mins\"\n        },\n        {\n          \"time\": \"11:00 AM - 1:00 PM\",\n          \"placeName\": \"Late Breakfast/Brunch\",\n          \"placeDetails\": \"Grab a late breakfast or brunch at a casual restaurant on the Strip or downtown.\",\n          \"placeImageUrl\": \"https://www.linq.com/images/restaurant.jpg\",\n          \"geoCoordinates\": \"36.1146° N, 115.1729° W\",\n          \"ticketPricing\": \"Budget-friendly\",\n          \"timeToTravel\": \"20 mins\"\n        },\n        {\n          \"time\": \"1:00 PM - 3:00 PM\",\n          \"placeName\": \"Shopping at a Discount Outlet Mall\",\n          \"placeDetails\": \"Visit a discount outlet mall like the Las Vegas Premium Outlets North for great deals on clothes, souvenirs, and more.\",\n          \"placeImageUrl\": \"https://www.premiumoutlets.com/images/las-vegas-north.jpg\",\n          \"geoCoordinates\": \"36.2074° N, 115.1559° W\",\n          \"ticketPricing\": \"Free\",\n          \"timeToTravel\": \"30 mins\"\n        },\n        {\n          \"time\": \"3:00 PM - 4:00 PM\",\n          \"placeName\": \"Happy Hour at a Bar\",\n          \"placeDetails\": \"Enjoy a discounted drink and appetizers at a local bar.\",\n          \"placeImageUrl\": \"https://www.theDlasvegas.com/images/bar.jpg\",\n          \"geoCoordinates\": \"36.1696° N, 115.1422° W\",\n          \"ticketPricing\": \"Budget-friendly\",\n          \"timeToTravel\": \"15 mins\"\n        },\n        {\n          \"time\": \"4:00 PM - 6:00 PM\",\n          \"placeName\": \"Explore the Arts District\",\n          \"placeDetails\": \"Check out the vibrant murals and galleries in the Arts District for a different side of Las Vegas.\",\n          \"placeImageUrl\": \"https://www.artsdistrictlv.com/images/arts-district.jpg\",\n          \"geoCoordinates\": \"36.1612° N, 115.1363° W\",\n          \"ticketPricing\": \"Free\",\n          \"timeToTravel\": \"20 mins\"\n        },\n        {\n          \"time\": \"6:00 PM - 8:00 PM\",\n          \"placeName\": \"Final Dinner\",\n          \"placeDetails\": \"Enjoy a last meal at a budget-friendly restaurant of your choice.\",\n          \"placeImageUrl\": \"https://www.fremontstreetexperience.com/images/restaurant.jpg\",\n          \"geoCoordinates\": \"36.1696° N, 115.1422° W\",\n          \"ticketPricing\": \"Budget-friendly\",\n          \"timeToTravel\": \"15 mins\"\n        },\n        {\n          \"time\": \"8:00 PM - 10:00 PM\",\n          \"placeName\": \"Evening Walk Along the Strip\",\n          \"placeDetails\": \"Take a final stroll along the Strip, enjoying the lights and atmosphere.\",\n          \"placeImageUrl\": \"https://www.visitlasvegas.com/images/strip-night.jpg\",\n          \"geoCoordinates\": \"36.1146° N, 115.1729° W\",\n          \"ticketPricing\": \"Free\",\n          \"timeToTravel\": \"30 mins\"\n        }\n      ]\n    }\n  ]\n}\n```\n\n**Notes:**\n\n* **Prices are approximate and subject to availability.**\n* **Image URLs are placeholders. You can search for relevant images online.**\n* **Transportation:**  Las Vegas has a public bus system (RTC) that's affordable and efficient. Consider purchasing a day pass for the Strip and downtown.\n* **Free Shows:**  Many Strip casinos offer free shows in their theaters and on their properties. Check online schedules for times and reservations.\n* **Discount Deals:**  Check online for discounts and deals on dining, attractions, and other activities. \n* **This itinerary is a suggestion and can be customized based on your interests and preferences.** \n"},
          ],
        },
      ],
    });
  
 
  
  
  