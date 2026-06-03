"use client";

import Link from "next/link";
import { useState } from "react";
import { registerUserAction } from "@/app/lib/actions";

export default function RegisterPage() {
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(formData: FormData) {
		setMessage("");
		setLoading(true);

		try {
			await registerUserAction(formData);
			setMessage("Account created successfully!");
		} catch (err: unknown) {
			if (err instanceof Error) {
				setMessage(err.message);
			} else {
				setMessage("Registration failed");
			}
		} finally {
			setLoading(false);
		}
	}

	return (
		<main className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
			<div className="w-full max-w-sm card space-y-6">
				<Link href="/" className="text-sm text-muted hover:underline">
					← Back to Home
				</Link>

				<h1 className="text-2xl font-semibold">Create Account</h1>

				<form action={handleSubmit} className="space-y-4">
					<input
						name="name"
						type="text"
						placeholder="Full Name"
						required
						className="input"
					/>

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
						{loading ? "Creating account..." : "Register"}
					</button>

					{message && <p className="text-sm text-muted">{message}</p>}
				</form>
			</div>
		</main>
	);
}
