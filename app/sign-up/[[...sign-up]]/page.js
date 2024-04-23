import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      <div className="ml-10 mt-10">
        <SignUp />
      </div>
    </div>
  );
}
