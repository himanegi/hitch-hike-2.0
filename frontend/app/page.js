import React from "react";
import Link from "next/link";

const Home = () => (
  <div className="flex flex-col min-h-screen bg-gray-100">
    <div className="flex-1 flex flex-col justify-center items-center p-8">
      <div className="max-w-md text-center">
        <h1 className="text-[60px] font-extralight mb-4 text-green-600">
          Join as a Driver
        </h1>
        <p className="text-gray-600 mb-8">
          Share your ride and travel with company while saving costs.
        </p>
        <Link href="/share" passHref>
          <button className="bg-green-100 text-green-600 px-6 py-3 font-medium rounded-full hover:bg-green-200 transition-colors">
            Share Your Ride
          </button>
        </Link>
      </div>
    </div>
    <div className="flex-1 flex flex-col justify-center items-center bg-white p-8">
      <div className="max-w-md text-center">
        <h1 className="text-[60px] font-extralight mb-4 text-blue-600">
          Join as a Rider
        </h1>
        <p className="text-gray-600 mb-8">
          Find affordable rides to your destination with our trustworthy
          community.
        </p>
        <Link href="/search" passHref>
          <button className="bg-blue-100 text-blue-600 px-6 py-3 font-medium rounded-full hover:bg-blue-200 transition-colors">
            Search for Trips
          </button>
        </Link>
      </div>
    </div>
  </div>
);

export default Home;
