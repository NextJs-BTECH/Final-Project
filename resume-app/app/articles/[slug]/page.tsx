import sql from "@/app/lib/db";
import { notFound } from "next/navigation";
import { getCommentsByArticle } from "@/app/lib/comments";
import CommentForm from "@/app/ui/CommentForm";
import { auth } from "@/auth";
import CommentActions from "@/app/ui/CommentActions";

export default async function ArticlePage({
	params,
}: {
	params: Promise<{ slug?: string }>;
}) {
	const { slug } = await params;

	const cleanSlug = slug?.trim();
	if (!cleanSlug) notFound();

	const article = await sql`
		SELECT * FROM articles
		WHERE slug = ${cleanSlug}::text
		LIMIT 1
	`;

	if (!article.length) notFound();

	const currentArticle = article[0];
	const comments = await getCommentsByArticle(currentArticle.id);

	const session = await auth();

	return (
		<main className="max-w-5xl mx-auto px-6 py-16 space-y-10">
			{/* ARTICLE */}
			<header className="space-y-3">
				<h1 className="text-3xl font-semibold">{currentArticle.title}</h1>
				<p className="text-muted italic">{currentArticle.excerpt}</p>
			</header>

			<article className="card space-y-4">
				<p className="leading-7">{currentArticle.content}</p>
			</article>

			<hr className="border-border" />

			{/* COMMENTS */}
			<section className="space-y-6">
				<h2 className="text-xl font-semibold">Comments</h2>

				<div className="card">
					<CommentForm articleId={currentArticle.id} />
				</div>

				<ul className="grid gap-3">
					{comments.length === 0 ? (
						<p className="text-muted">No comments yet.</p>
					) : (
						comments.map((c) => (
							<li key={c.id} className="card space-y-2">
								<div className="flex justify-between items-center">
									<strong className="text-sm">{c.name ?? "Unknown user"}</strong>

									{/* ONLY OWNER CAN SEE ACTIONS */}
									{session?.user?.id === c.user_id && <CommentActions comment={c} />}
								</div>

								<p className="text-sm text-muted">{c.content}</p>
							</li>
						))
					)}
				</ul>
			</section>
		</main>
	);
}
