"use client";

import { useState } from "react";
import Link from "next/link";
import "./login.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL ?? "http://localhost:3001";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      let data: { error?: string };
        try {
          data = await res.json();
        } catch {
          data = {};
        }
        if (!res.ok) {
          setError(data.error ?? (res.status >= 500 ? "Server error. Ensure Postgres is running and run pnpm db:seed." : "Login failed"));
          return;
        }
      window.location.href = ADMIN_URL;
    } catch {
      setError("Login failed. Check your connection.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login">
      <div className="login__grid" />
      <div className="login__card">
        <div className="login__header">
          <h1 className="login__title">Sign in</h1>
          <p className="login__tagline">Manage your portfolio</p>
        </div>
        <form className="login__form" onSubmit={handleSubmit}>
          {error && <p className="login__error">{error}</p>}
          <label className="login__label">
            Email
            <input
              type="email"
              className="login__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              disabled={loading}
            />
          </label>
          <label className="login__label">
            Password
            <input
              type="password"
              className="login__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              disabled={loading}
            />
          </label>
          <button type="submit" className="login__btn" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <Link href="/" className="login__back">
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
