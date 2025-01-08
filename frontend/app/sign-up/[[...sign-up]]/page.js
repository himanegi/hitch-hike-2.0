export default function Page() {
  return (
    <div
      className="min-h-screen flex flex-col justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start justify-between">
          <div className="bg-white p-8 rounded-3xl shadow-lg text-black text-right w-full md:w-auto">
            <h1 className="text-4xl md:text-[100px] font-semibold mb-4 text-shadow-lg text-emerald-500">
              Hitch Hike 2.0
            </h1>
            <p className="text-lg md:text-2xl font-light text-shadow-lg">
              The smart way to carpool and save money.
            </p>
          </div>
          <SignUp />
        </div>
      </div>
    </div>
  );
}
