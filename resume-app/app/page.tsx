import Image from "next/image";
import Link from "next/link";
import ProjectCarousel from "@/app/ui/ProjectCarousel";
import ContactForm from "@/app/ui/ContactForm";
import WeatherCard from "@/app/ui/WeatherCard";

function sleep(ms: number) {
	return new Promise((res) => setTimeout(res, ms));
}

export default async function Home() {
	// ⏱️ adjust this number to control loading time
	await sleep(1500);

	return (
		<div className="min-h-screen bg-background text-foreground">
			<main className="max-w-5xl mx-auto px-6 py-16 space-y-20">
				{/* HERO */}
				<section className="space-y-6">
					<Image src="/next.svg" alt="Next.js logo" width={100} height={20} priority />

					<div className="space-y-3">
						<h1 className="text-4xl font-semibold tracking-tight">Portfolio App</h1>

						<p className="text-muted max-w-xl leading-7">
							Articles, authentication, comments, dashboard tools, and dynamic UI features
							built with App Router.
						</p>
					</div>
				</section>

				{/* ACTIONS */}
				<section className="flex flex-wrap gap-3">
					<Link href="/articles" className="btn btn-primary">
						Articles
					</Link>

					<Link href="/dashboard/comments" className="btn btn-secondary">
						Dashboard
					</Link>

					<Link href="/login" className="btn btn-secondary">
						Login
					</Link>

					<Link href="/register" className="btn btn-secondary">
						Register
					</Link>
				</section>

				{/* WEATHER */}
				<section className="space-y-4">
					<h2 className="text-xl font-semibold">Weather</h2>
					<WeatherCard />
				</section>

				{/* PROJECTS */}
				<section className="space-y-4">
					<h2 className="text-xl font-semibold">Featured Projects</h2>

					<div className="card">
						<ProjectCarousel />
					</div>
				</section>

				{/* FEATURES */}
				<section className="space-y-3">
					<h2 className="text-base font-semibold">Included Features</h2>

					<div className="card space-y-2 text-sm text-muted">
						<p>✔ Authentication (NextAuth)</p>
						<p>✔ Server Actions + Neon Postgres CRUD</p>
						<p>✔ Articles + comment system</p>
						<p>✔ Weather API integration</p>
						<p>✔ Reusable UI system (buttons, cards, inputs)</p>
					</div>
				</section>

				{/* CONTACT */}
				<section className="space-y-4">
					<h2 className="text-xl font-semibold">Contact</h2>

					<p className="text-muted max-w-xl">
						Have a question or want to collaborate? Send a message below.
					</p>

					<div className="card">
						<ContactForm />
					</div>
				</section>
			</main>
		</div>
	);
}
