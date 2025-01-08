import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div
      className="min-h-screen flex flex-col justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/bg_b.jpg')" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between ">
          <div
            className="bg-white p-8 rounded-3xl shadow-lg text-gray-800 text-right w-full md:w-auto mt-1 block outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 focus:outline-none focus:ring-2 hover:ring-4 hover:ring-indigo-500 appearance-none"
            id="locationSelect"
          >
            <h1 className="text-4xl md:text-[100px] font-semibold mb-4 text-shadow-lg">
              Hitch Hike 2.0
            </h1>
            <p className="text-lg md:text-2xl font-light text-shadow-lg">
              The smart way to carpool and save money.
            </p>
          </div>
          <SignIn />
        </div>
      </div>
    </div>
  );
}
