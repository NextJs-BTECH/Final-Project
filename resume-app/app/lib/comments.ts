import sql from "@/app/lib/db";
import type { CommentWithUser } from "@/app/types/comments";

/* ---------------- GET COMMENTS BY ARTICLE ---------------- */
export async function getCommentsByArticle(articleId: number) {
	return await sql<CommentWithUser[]>`
		SELECT
			c.id,
			c.content,
			c.user_id,
			c.article_id,
			c.created_at,
			u.name
		FROM comments c
		JOIN users u ON u.id = c.user_id
		WHERE c.article_id = ${articleId}
		ORDER BY c.created_at DESC
	`;
}

/* ---------------- GET COMMENTS BY USER ---------------- */
export async function getCommentsByUser(userId: string) {
	return await sql<CommentWithUser[]>`
		SELECT
			c.id,
			c.content,
			c.user_id,
			c.article_id,
			c.created_at,
			u.name,
			a.title AS article_title,
			a.slug AS article_slug
		FROM comments c
		LEFT JOIN users u ON u.id = c.user_id
		LEFT JOIN articles a ON a.id = c.article_id
		WHERE c.user_id = ${userId}
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
	const comment = await sql<{ user_id: string }[]>`
		SELECT user_id FROM comments WHERE id = ${id}
	`;

	if (!comment.length) throw new Error("Comment not found");
	if (comment[0].user_id !== userId) throw new Error("Unauthorized");

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
	const comment = await sql<{ user_id: string }[]>`
		SELECT user_id FROM comments WHERE id = ${id}
	`;

	if (!comment.length) throw new Error("Comment not found");
	if (comment[0].user_id !== userId) throw new Error("Unauthorized");

	return await sql`
		UPDATE comments
		SET content = ${content}
		WHERE id = ${id}
	`;
}
