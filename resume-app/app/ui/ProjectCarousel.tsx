"use client";

import { useState } from "react";
import Link from "next/link";

const projects = [
	{
		title: "Articles System",
		description: "Full CRUD article system with Neon Postgres.",
		href: "/articles",
	},
	{
		title: "Auth Dashboard",
		description: "Protected dashboard using NextAuth credentials.",
		href: "/dashboard/comments",
	},
	{
		title: "Weather Hook",
		description: "Custom hook consuming OpenWeather API.",
		href: "/",
	},
];

export default function ProjectCarousel() {
	const [index, setIndex] = useState(0);

	function next() {
		setIndex((i) => (i + 1) % projects.length);
	}

	function prev() {
		setIndex((i) => (i - 1 + projects.length) % projects.length);
	}

	const project = projects[index];

	return (
		<div
			style={{
				marginTop: 24,
				padding: 16,
				border: "1px solid #ddd",
				borderRadius: 8,
			}}
		>
			<h2>{project.title}</h2>
			<p>{project.description}</p>

			<div style={{ display: "flex", gap: 10, marginTop: 12 }}>
				<button onClick={prev}>Prev</button>
				<button onClick={next}>Next</button>

				<Link href={project.href}>Open</Link>
			</div>
		</div>
	);
}
