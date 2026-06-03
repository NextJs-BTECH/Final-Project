import Link from "next/link";
import { requireUser } from "@/app/lib/auth";
import { getCommentsByUser } from "@/app/lib/comments";

// ⏱ shared delay helper
function sleep(ms: number) {
	return new Promise((res) => setTimeout(res, ms));
}

export default async function DashboardCommentsPage() {
	// ⏱ match your home page loading time (change if needed)
	await sleep(1500);

	const user = await requireUser();
	const comments = await getCommentsByUser(user.id);

	return (
		<main className="max-w-6xl mx-auto px-6 py-16 space-y-10">
			{/* HEADER */}
			<header className="space-y-2">
				<h1 className="text-3xl font-semibold">My Comments</h1>
				<p className="muted">Welcome back, {user.name || user.email || "User"}</p>
			</header>

			{/* STATS */}
			<section className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="card">
					<p className="muted text-sm">Your Comments</p>
					<p className="text-2xl font-semibold">{comments.length}</p>
				</div>

				<div className="card">
					<p className="muted text-sm">Active Articles</p>
					<p className="text-2xl font-semibold">
						{new Set(comments.map((c) => c.article_id)).size}
					</p>
				</div>

				<div className="card">
					<p className="muted text-sm">Latest Activity</p>
					<p className="text-2xl font-semibold">{comments.length ? "Active" : "None"}</p>
				</div>
			</section>

			{/* COMMENTS */}
			<section className="space-y-4">
				<h2 className="text-xl font-semibold">Your Comments</h2>

				{comments.length === 0 ? (
					<div className="card">
						<p className="muted">You haven’t written any comments yet.</p>
					</div>
				) : (
					<div className="grid gap-4">
						{comments.map((c) => (
							<div key={c.id} className="card space-y-3">
								<div className="flex justify-between items-start">
									<div className="space-y-1">
										<p className="text-sm font-medium">{c.name || "You"}</p>

										<Link
											href={`/articles/${c.article_slug}`}
											className="btn btn-secondary text-sm w-fit"
										>
											{c.article_title || "Deleted Article"}
										</Link>
									</div>

									<span className="muted text-xs">
										{new Date(c.created_at).toLocaleDateString()}
									</span>
								</div>

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
