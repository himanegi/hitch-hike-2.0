import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      <div className="ml-10 mt-10">
        <SignIn />
      </div>
    </div>
  );
}
