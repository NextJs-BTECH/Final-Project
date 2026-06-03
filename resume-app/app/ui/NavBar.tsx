"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function NavBar() {
	const { data: session } = useSession();
	const user = session?.user;

	return (
		<nav className="navbar">
			<div className="navbar-inner">
				{/* LEFT LINKS */}
				<div className="nav-left">
					<NavItem href="/" label="Home" />
					<NavItem href="/articles" label="Articles" />
					<NavItem href="/dashboard/comments" label="Dashboard" />
				</div>

				{/* RIGHT SIDE */}
				<div className="nav-right">
					{user ? (
						<>
							<span className="nav-user">{user.name || user.email || "User"}</span>

							<button className="btn btn-secondary" onClick={() => signOut()}>
								Logout
							</button>
						</>
					) : (
						<>
							<NavItem href="/login" label="Login" />
							<NavItem href="/register" label="Register" />
						</>
					)}
				</div>
			</div>
		</nav>
	);
}

/* ---------------- NAV ITEM ---------------- */
function NavItem({ href, label }: { href: string; label: string }) {
	return (
		<Link href={href} className="nav-item">
			{label}
		</Link>
	);
}
