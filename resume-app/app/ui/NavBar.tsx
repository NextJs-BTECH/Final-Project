"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function NavBar() {
	const { data: session } = useSession();

	return (
		<nav
			style={{
				display: "flex",
				gap: 12,
				padding: 16,
				borderBottom: "1px solid #ddd",
				alignItems: "center",
			}}
		>
			{/* Always visible links */}
			<Link href="/">Home</Link>
			<Link href="/articles">Articles</Link>
			<Link href="/dashboard/comments">Dashboard</Link>

			<div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
				{session?.user ? (
					<>
						<span>{session.user.email}</span>
						<button onClick={() => signOut()}>Logout</button>
					</>
				) : (
					<>
						<Link href="/login">Login</Link>
						<Link href="/register">Register</Link>
					</>
				)}
			</div>
		</nav>
	);
}
