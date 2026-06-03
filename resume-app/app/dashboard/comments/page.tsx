import sql from "@/app/lib/db";
import { requireUser } from "@/app/lib/auth";
import Link from "next/link";

export default async function DashboardCommentsPage() {
	const user = await requireUser();

	const comments = await sql`
		SELECT
			c.*,
			u.name,
			a.title AS article_title,
			a.slug AS article_slug
		FROM comments c
		LEFT JOIN users u ON u.id = c.user_id
		LEFT JOIN articles a ON a.id = c.article_id
		ORDER BY c.created_at DESC
	`;

	return (
		<main className="max-w-6xl mx-auto px-6 py-16 space-y-10">
			{/* HEADER */}
			<header className="space-y-2">
				<h1 className="text-3xl font-semibold">Comments Dashboard</h1>
				<p className="muted">Welcome back, {user.name ?? user.email}</p>
			</header>

			{/* STATS */}
			<section className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="card">
					<p className="muted text-sm">Total Comments</p>
					<p className="text-2xl font-semibold">{comments.length}</p>
				</div>

				<div className="card">
					<p className="muted text-sm">Active Users</p>
					<p className="text-2xl font-semibold">
						{new Set(comments.map((c) => c.user_id)).size}
					</p>
				</div>

				<div className="card">
					<p className="muted text-sm">Latest Activity</p>
					<p className="text-2xl font-semibold">
						{comments.length > 0 ? "Active" : "None"}
					</p>
				</div>
			</section>

			{/* COMMENTS */}
			<section className="space-y-4">
				<h2 className="text-xl font-semibold">Recent Comments</h2>

				{comments.length === 0 ? (
					<div className="card">
						<p className="muted">No comments yet.</p>
					</div>
				) : (
					<div className="grid gap-4">
						{comments.map((c) => (
							<div key={c.id} className="card space-y-3">
								{/* TOP ROW */}
								<div className="flex justify-between items-start">
									<div className="space-y-1">
										<p className="text-sm font-medium">{c.name ?? "Unknown User"}</p>

										<p className="muted text-xs">Commented on:</p>

										<Link
											href={`/articles/${c.article_slug}`}
											className="btn btn-secondary text-sm inline-flex w-fit"
										>
											{c.article_title ?? "Deleted Article"}
										</Link>
									</div>

									<span className="muted text-xs">
										{new Date(c.created_at).toLocaleDateString()}
									</span>
								</div>

								{/* COMMENT BODY */}
								<div className="border-t border-[var(--border)] pt-3">
									<p className="leading-7">{c.content}</p>
								</div>
							</div>
						))}
					</div>
				)}
			</section>
		</main>
	);
}
