import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_URL = 'https://api.unsplash.com/search/photos';
const IMAGES_PER_PAGE = 2;

const UserTripCardItem = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    try {
      const data = trip?.userSelection?.location;
      const result = await axios.get(
        `${API_URL}?query=${data}&page=1&per_page=${IMAGES_PER_PAGE}&client_id=${import.meta.env.VITE_UNSPLASH_API_KEY}`
      );

      const photoUrl = result.data.results[0]?.urls?.small || null;  // Default to null if no results
      setPhotoUrl(photoUrl);
    } catch (error) {
      console.log('Error fetching photo:', error);
      setPhotoUrl('fallback-image.png');  // Set a local fallback image on error
    }
  };

  return (
    <Link to={`/view-trip/${trip?.id}`}>
      <div className="hover:scale-105 transition-all hover:shadow-md">
        <img
          src={photoUrl || 'fallback-image.png'}
          alt={`${trip?.userSelection?.location} Trip`}
          className="object-cover rounded-xl h-[220px] w-full"
        />

        <div>
          <h2 className="font-bold text-lg">{trip?.userSelection?.location}</h2>
          <h2 className="text-sm text-gray-500">
            {trip?.userSelection?.noOfDays} Days Trip with Luxury {trip?.userSelection?.budget} Budget
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default UserTripCardItem;
