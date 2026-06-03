"use client";

import { useState } from "react";
import { createCommentAction } from "@/app/lib/actions";

export default function CommentForm({ articleId }: { articleId: number }) {
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function submit() {
		setLoading(true);
		setError(null);

		const res = await createCommentAction({
			articleId,
			content,
		});

		if (res?.error === "UNAUTHORIZED_COMMENT") {
			setError("You must be logged in to post comments");
		} else if (res?.error === "EMPTY_COMMENT") {
			setError("Comment cannot be empty");
		} else {
			setContent("");
			window.location.reload();
		}

		setLoading(false);
	}

	return (
		<div className="space-y-3">
			<textarea
				value={content}
				onChange={(e) => setContent(e.target.value)}
				placeholder="Write a comment..."
				className="input min-h-[90px] resize-none"
			/>

			<div className="flex justify-end">
				<button
					onClick={submit}
					disabled={loading || !content}
					className="btn btn-success"
				>
					{loading ? "Posting..." : "Post Comment"}
				</button>
			</div>

			{error && <p className="text-sm text-red-400">{error}</p>}
		</div>
	);
}
