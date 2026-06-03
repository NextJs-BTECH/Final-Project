"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const reason = searchParams.get("reason");

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);
		setError("");

		const form = new FormData(e.currentTarget);

		const res = await signIn("credentials", {
			redirect: false,
			email: form.get("email"),
			password: form.get("password"),
		});

		setLoading(false);

		if (res?.error) {
			setError("Invalid email or password");
			return;
		}

		router.push("/");
		router.refresh();
	}

	return (
		<main className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
			<div className="w-full max-w-sm card space-y-6">
				{/* ✅ CONTEXT MESSAGE */}
				{reason === "dashboard" && (
					<div className="text-sm text-yellow-300 border border-yellow-500 p-3 rounded-md">
						You must be logged in or registered to view the dashboard page.
					</div>
				)}

				<h1 className="text-2xl font-semibold">Login</h1>

				<form onSubmit={onSubmit} className="space-y-4">
					<input
						name="email"
						type="email"
						placeholder="Email"
						required
						className="input"
					/>

					<input
						name="password"
						type="password"
						placeholder="Password"
						required
						className="input"
					/>

					<button type="submit" disabled={loading} className="btn btn-primary w-full">
						{loading ? "Logging in..." : "Login"}
					</button>

					{error && <p className="text-red-400 text-sm">{error}</p>}
				</form>
			</div>
		</main>
	);
}
