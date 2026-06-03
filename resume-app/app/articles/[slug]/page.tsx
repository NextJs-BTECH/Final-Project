import sql from "@/app/lib/db";
import { notFound } from "next/navigation";
import { getCommentsByArticle } from "@/app/lib/comments";
import CommentForm from "@/app/ui/CommentForm";
import { auth } from "@/auth";
import CommentActions from "@/app/ui/CommentActions";

// ⏱ optional: match homepage/articles loading delay if you're standardizing UX
function sleep(ms: number) {
	return new Promise((res) => setTimeout(res, ms));
}

export default async function ArticlePage({
	params,
}: {
	params: Promise<{ slug?: string }>;
}) {
	const { slug } = await params;

	const cleanSlug = slug?.trim();
	if (!cleanSlug) notFound();

	await sleep(1500);

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
			{/* ARTICLE HEADER */}
			<header className="space-y-3">
				<h1 className="text-3xl font-semibold">{currentArticle.title}</h1>

				<p className="text-muted italic">{currentArticle.excerpt}</p>
			</header>

			{/* ARTICLE BODY */}
			<article className="card space-y-4">
				<p className="leading-7">{currentArticle.content}</p>
			</article>

			<hr className="border-border" />

			{/* COMMENTS SECTION */}
			<section className="space-y-6">
				<h2 className="text-xl font-semibold">Comments</h2>

				{/* COMMENTS FIRST */}
				<ul className="space-y-4">
					{comments.length === 0 ? (
						<li className="card">
							<p className="text-muted">No comments yet. Be the first to comment.</p>
						</li>
					) : (
						comments.map((c) => (
							<li key={c.id} className="card space-y-3">
								{/* TOP ROW */}
								<div className="flex justify-between items-start">
									<strong className="text-sm">{c.name ?? "Unknown user"}</strong>

									{session?.user?.id === c.user_id && <CommentActions comment={c} />}
								</div>

								{/* CONTENT */}
								<p className="text-sm text-muted leading-6">{c.content}</p>
							</li>
						))
					)}
				</ul>

				{/* COMMENT FORM LAST */}
				<div className="card space-y-3">
					<h3 className="text-sm font-semibold">Write a comment</h3>

					<CommentForm articleId={currentArticle.id} />
				</div>
			</section>
		</main>
	);
}
