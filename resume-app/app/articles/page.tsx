import Link from "next/link";
import { getArticles } from "@/app/lib/articles";

function sleep(ms: number) {
	return new Promise((res) => setTimeout(res, ms));
}

export default async function ArticlesPage() {
	// ⏱ remove if you don't want artificial delay
	await sleep(1500);

	const articles = await getArticles();

	return (
		<main className="max-w-5xl mx-auto px-6 py-16 space-y-8">
			{/* HEADER */}
			<header className="space-y-2">
				<h1 className="text-3xl font-semibold">Articles</h1>

				<p className="text-muted">Browse all published articles below.</p>
			</header>

			{/* LIST */}
			<ul className="space-y-4">
				{articles.length === 0 ? (
					<li className="card">
						<p className="text-muted">No articles available yet.</p>
					</li>
				) : (
					articles.map((a) => {
						if (!a.slug) return null;

						return (
							<li
								key={a.id}
								className="card flex flex-col md:flex-row md:items-center md:justify-between gap-4"
							>
								{/* LEFT SIDE */}
								<div className="space-y-2">
									<Link
										href={`/articles/${a.slug}`}
										className="text-lg font-semibold hover:opacity-80 transition"
									>
										{a.title}
									</Link>

									<p className="text-sm text-muted leading-6">{a.excerpt}</p>
								</div>

								{/* RIGHT SIDE */}
								<div className="md:shrink-0">
									<Link href={`/articles/${a.slug}`} className="btn btn-secondary">
										View Article
									</Link>
								</div>
							</li>
						);
					})
				)}
			</ul>
		</main>
	);
}
