import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="bg-blue-500 min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-white">
            <h1 className="text-[100px] font-extralight ml-10 mb-4">
              Hitch Hike 2.0
            </h1>
            <p className="text-[20px] ml-10">
              The smart way to carpool and save money.
            </p>
          </div>
          <SignUp />
        </div>
      </div>
    </div>
  );
}
