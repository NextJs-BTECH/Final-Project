"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteCommentAction, updateCommentAction } from "@/app/lib/actions";

export default function CommentActions({
	comment,
}: {
	comment: { id: number; content: string };
}) {
	const [editing, setEditing] = useState(false);
	const [text, setText] = useState(comment.content);

	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	async function handleSave() {
		startTransition(async () => {
			await updateCommentAction({
				id: comment.id,
				content: text,
			});

			setEditing(false);
			router.refresh(); // 🔥 THIS fixes “needs refresh”
		});
	}

	function handleDelete() {
		startTransition(async () => {
			await deleteCommentAction(comment.id);
			router.refresh(); // 🔥 updates list immediately
		});
	}

	return (
		<div className="flex gap-2 items-center">
			{editing ? (
				<>
					<input
						className="input"
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>

					<button className="btn btn-primary" onClick={handleSave} disabled={isPending}>
						Save
					</button>

					<button className="btn btn-secondary" onClick={() => setEditing(false)}>
						Cancel
					</button>
				</>
			) : (
				<>
					<button className="btn btn-edit" onClick={() => setEditing(true)}>
						Edit
					</button>

					<button className="btn btn-danger" onClick={handleDelete} disabled={isPending}>
						Delete
					</button>
				</>
			)}
		</div>
	);
}
