"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Incorrect password.");
        setLoading(false);
        return;
      }
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-sm flex-col justify-center px-5">
      <p className="label mb-4 text-taupe">Private</p>
      <h1 className="font-serif text-3xl text-ivory">Admin</h1>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          className="w-full border-b hairline bg-transparent py-2 text-ivory placeholder:text-taupe focus:outline-none"
        />
        {error && <p className="text-sm text-stone">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="label w-full border hairline bg-ivory py-3 text-ink disabled:opacity-50"
        >
          {loading ? "Checking…" : "Enter →"}
        </button>
      </form>
    </div>
  );
}
