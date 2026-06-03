import Link from "next/link";
import { getArticles } from "@/app/lib/articles";

export default async function ArticlesPage() {
	const articles = await getArticles();

	return (
		<main className="max-w-5xl mx-auto px-6 py-16 space-y-8">
			{/* HEADER */}
			<h1 className="text-3xl font-semibold">Articles</h1>

			{/* LIST */}
			<ul className="grid gap-4">
				{articles.map((a) => {
					if (!a.slug) return null;

					return (
						<li key={a.id} className="card flex items-center justify-between gap-4">
							{/* LEFT SIDE */}
							<div className="space-y-2">
								<Link
									href={`/articles/${a.slug}`}
									className="text-lg font-semibold hover:opacity-80 transition"
								>
									{a.title}
								</Link>

								<p className="text-sm text-muted">{a.excerpt}</p>
							</div>

							{/* RIGHT SIDE BUTTON */}
							<Link href={`/articles/${a.slug}`} className="btn btn-secondary shrink-0">
								View
							</Link>
						</li>
					);
				})}
			</ul>
		</main>
	);
}
