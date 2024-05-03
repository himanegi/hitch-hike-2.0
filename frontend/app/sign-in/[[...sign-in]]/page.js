import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="bg-blue-500 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-white">
              <h1 className="text-5xl font-bold mb-4">Hitch Hike 2.0</h1>
              <p className="text-lg">
                The smart way to carpool and save money.
              </p>
            </div>
            <div className="ml-10 mt-4 bg-white p-4 rounded-lg">
              <SignIn />
            </div>
          </div>
        </div>
      </div>

      {/* Options Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-4 bg-green-100">
            <h2 className="text-3xl font-bold mb-4">Become a Rider</h2>
            <p className="text-gray-700 mb-4">
              Find affordable rides with fellow commuters in your area. Save
              money and reduce your carbon footprint.
            </p>
            <button className="bg-green-500 text-white py-2 px-4 rounded-lg">
              Join as a Rider
            </button>
          </div>
          <div className="w-full md:w-1/2 p-4 bg-yellow-100">
            <h2 className="text-3xl font-bold mb-4">Become a Driver</h2>
            <p className="text-gray-700 mb-4">
              Offer rides to commuters and earn extra money for your daily
              commute. Flexible schedule and easy to use.
            </p>
            <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg">
              Join as a Driver
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16 bg-gray-200">
        <h2 className="text-3xl font-bold mb-8 text-center">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Safe and Secure</h3>
            <p className="text-gray-700">
              All riders and drivers are verified for your safety.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Affordable Rides</h3>
            <p className="text-gray-700">
              Share the cost of your commute with fellow riders.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Eco-Friendly</h3>
            <p className="text-gray-700">
              Reduce your carbon footprint by sharing rides.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
