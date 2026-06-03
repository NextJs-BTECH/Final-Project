import sql from "@/app/lib/db";
import { requireUser } from "@/app/lib/auth";
import type { CommentWithUser } from "@/app/types/comments";

/* ---------------- GET COMMENTS ---------------- */
export async function getCommentsByArticle(articleId: number) {
	return await sql<CommentWithUser[]>`
		SELECT c.*, u.name
		FROM comments c
		JOIN users u ON u.id = c.user_id
		WHERE c.article_id = ${articleId}
		ORDER BY c.created_at DESC
	`;
}

/* ---------------- CREATE COMMENT ---------------- */
export async function createComment({
	articleId,
	content,
	userId,
}: {
	articleId: number;
	content: string;
	userId: string;
}) {
	return await sql`
		INSERT INTO comments (article_id, user_id, content, created_at)
		VALUES (${articleId}, ${userId}, ${content}, NOW())
	`;
}

/* ---------------- DELETE COMMENT (OWNER ONLY) ---------------- */
export async function deleteComment(id: number, userId: string) {
	const comment = await sql`
		SELECT user_id FROM comments WHERE id = ${id}
	`;

	if (!comment.length) {
		throw new Error("Comment not found");
	}

	if (comment[0].user_id !== userId) {
		throw new Error("Unauthorized");
	}

	return await sql`
		DELETE FROM comments WHERE id = ${id}
	`;
}

/* ---------------- UPDATE COMMENT (OWNER ONLY) ---------------- */
export async function updateComment({
	id,
	content,
	userId,
}: {
	id: number;
	content: string;
	userId: string;
}) {
	const comment = await sql`
		SELECT user_id FROM comments WHERE id = ${id}
	`;

	if (!comment.length) {
		throw new Error("Comment not found");
	}

	if (comment[0].user_id !== userId) {
		throw new Error("Unauthorized");
	}

	return await sql`
		UPDATE comments
		SET content = ${content}
		WHERE id = ${id}
	`;
}
