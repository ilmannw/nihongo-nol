import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0f172a] p-4">
      <SignUp />
    </main>
  );
}
