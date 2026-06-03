"use client";

import { useState } from "react";
import { createCommentAction } from "@/app/lib/actions";

export default function CommentForm({ articleId }: { articleId: number }) {
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(false);

	async function submit() {
		setLoading(true);

		try {
			await createCommentAction({
				articleId,
				content,
			});

			setContent("");
			window.location.reload();
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="space-y-3">
			{/* TEXT AREA */}
			<textarea
				value={content}
				onChange={(e) => setContent(e.target.value)}
				placeholder="Write a comment..."
				className="input min-h-[90px] resize-none"
			/>

			{/* BUTTON ROW */}
			<div className="flex justify-end">
				<button
					onClick={submit}
					disabled={loading || !content}
					className="btn btn-success"
				>
					{loading ? "Posting..." : "Post Comment"}
				</button>
			</div>
		</div>
	);
}
