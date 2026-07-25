"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await createClient().auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else location.href = "/dashboard";
  }

  return (
    <main className="grid min-h-screen place-items-center p-4">
      <form onSubmit={signIn} className="w-full max-w-sm space-y-4 rounded-xl border bg-white p-7 shadow-sm">
        <h1 className="text-2xl font-bold">SalesFlow</h1>
        <p className="text-sm text-slate-500">Sign in to continue</p>
        <input required type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input required type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className="w-full bg-indigo-600 text-white">Sign in</button>
      </form>
    </main>
  );
}
