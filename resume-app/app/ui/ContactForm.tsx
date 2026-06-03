"use client";

import { useState, useTransition } from "react";

export default function ContactForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [isPending, startTransition] = useTransition();

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		startTransition(() => {
			console.log("Contact Form Submission:", {
				name,
				email,
				message,
			});

			// reset form
			setName("");
			setEmail("");
			setMessage("");
		});
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-3">
			<input
				className="input"
				placeholder="Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				required
			/>

			<input
				className="input"
				placeholder="Email"
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>

			<textarea
				className="input"
				placeholder="Message"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				rows={5}
				required
			/>

			<button className="btn btn-primary" type="submit" disabled={isPending}>
				{isPending ? "Sending..." : "Send Message"}
			</button>
		</form>
	);
}
