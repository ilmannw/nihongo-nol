import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0f172a] p-4">
      <SignIn />
    </main>
  );
}
