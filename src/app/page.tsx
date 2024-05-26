"use client"
import { Button } from "@/components/Button";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const {data: session, status} = useSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button onClick={signIn}>Sign In</Button>
      <pre>{JSON.stringify(session)}</pre>
    </main>
  );
}
