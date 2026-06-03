"use server";

import { auth } from "@/auth";
import sql from "@/app/lib/db";
import bcrypt from "bcrypt";

/* ---------------- REGISTER USER ---------------- */
export async function registerUserAction(formData: FormData) {
	const name = String(formData.get("name") || "");
	const email = String(formData.get("email") || "");
	const password = String(formData.get("password") || "");

	if (!email || !password) throw new Error("Missing fields");

	const existing = await sql`
		SELECT id FROM users WHERE email = ${email}
	`;

	if (existing.length > 0) {
		throw new Error("User already exists");
	}

	const hashed = await bcrypt.hash(password, 10);

	await sql`
		INSERT INTO users (name, email, password)
		VALUES (${name}, ${email}, ${hashed})
	`;

	return { ok: true };
}

/* ---------------- CREATE COMMENT ---------------- */
export async function createCommentAction(data: { articleId: number; content: string }) {
	const session = await auth();

	if (!session?.user?.id) {
		return { error: "UNAUTHORIZED_COMMENT" };
	}

	if (!data.content?.trim()) {
		return { error: "EMPTY_COMMENT" };
	}

	await sql`
		INSERT INTO comments (article_id, user_id, content, created_at)
		VALUES (${data.articleId}, ${session.user.id}, ${data.content}, NOW())
	`;

	return { ok: true };
}

/* ---------------- UPDATE COMMENT ---------------- */
export async function updateCommentAction(data: { id: number; content: string }) {
	const session = await auth();

	if (!session?.user?.id) {
		return { error: "UNAUTHORIZED" };
	}

	const comment = await sql`
		SELECT user_id FROM comments WHERE id = ${data.id}
	`;

	if (!comment.length || comment[0].user_id !== session.user.id) {
		return { error: "UNAUTHORIZED" };
	}

	await sql`
		UPDATE comments
		SET content = ${data.content}
		WHERE id = ${data.id}
	`;

	return { ok: true };
}

/* ---------------- DELETE COMMENT ---------------- */
export async function deleteCommentAction(id: number) {
	const session = await auth();

	if (!session?.user?.id) {
		return { error: "UNAUTHORIZED" };
	}

	const comment = await sql`
		SELECT user_id FROM comments WHERE id = ${id}
	`;

	if (!comment.length || comment[0].user_id !== session.user.id) {
		return { error: "UNAUTHORIZED" };
	}

	await sql`
		DELETE FROM comments WHERE id = ${id}
	`;

	return { ok: true };
}
