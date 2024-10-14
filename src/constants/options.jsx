export const SelectTravelList=[
    {
        id:1,
        title:'Just me',
        desc:'A sole travels in exploration',
        icon:'👧',
        people:'1'
    },
    {
        id:2,
        title:'Family Trip',
        desc:'A family travels in exploration',
        icon:'👨‍👩‍👧‍👦',
        people:'4'
    },
    {
        id:3,
        title:'With Friends',
        desc:'A trip with  in exploration',
        icon:'👩‍👧‍👦',
        people:'6'
    },
    {
        id:4,
        title:'Office friends',
        desc:'A trip with office colegues travels in exploration',
        icon:'🏢',
        people:'10'
    }
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:'cheap',
        desc:'Stay conscious of costs',
        icon:'💵',
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average side',
        icon:'💰',
    },
    {
        id:3,
        title:'Luxury',
        desc:'Dont worry about the cost',
        icon:'💸'
    }
]
export const AI_PROMPT='Generate Travel Plan for {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me hotels options list with hotelName, hotel address, price, hotel image url, geo coordinates, rating, descriptions snd suggest itinerary with placeName, place details, place image url, geo coordinates, ticket pricing, time travel each os the location for {totalDays} days with each day with best time to visit in JSON format.'