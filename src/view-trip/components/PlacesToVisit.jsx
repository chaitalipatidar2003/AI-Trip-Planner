import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  const itinerary = trip?.tripData?.itinerary;

  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>
      <div>
        {Array.isArray(itinerary) ? (
          itinerary.map((item, index) => (
            <div key={index} className="mt-5">
              <h2 className="font-medium text-lg">Day {item?.day}</h2>
              <div className="grid md:grid-cols-2 gap-5">
                {item?.activities?.map((place, idx) => (
                  <div key={idx} className="my-3">
                    <h2 className="font-medium text-sm text-orange-600">{place.time}</h2>
                    <PlaceCardItem place={place} />
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No itinerary available</p>
        )}
      </div>
    </div>
  );
}

export default PlacesToVisit;
