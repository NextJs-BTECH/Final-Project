"use server";

import { auth } from "@/auth";
import sql from "@/app/lib/db";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createInquiry } from "@/app/lib/inquiries";

/* ---------------- REGISTER USER ---------------- */
export async function registerUserAction(formData: FormData) {
	const name = String(formData.get("name") || "");
	const email = String(formData.get("email") || "");
	const password = String(formData.get("password") || "");

	if (!email || !password) {
		throw new Error("Missing fields");
	}

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

	redirect("/login");
}

/* ---------------- INQUIRY ---------------- */
export async function submitInquiryAction(formData: FormData) {
	const name = String(formData.get("name") || "");
	const email = String(formData.get("email") || "");
	const message = String(formData.get("message") || "");

	if (!name || !email || !message) {
		throw new Error("Missing fields");
	}

	await createInquiry({ name, email, message });
}

/* =========================================================
   COMMENTS (SECURE SERVER ACTIONS)
========================================================= */

/* ---------------- CREATE COMMENT ---------------- */
export async function createCommentAction(data: { articleId: number; content: string }) {
	const session = await auth();

	if (!session?.user?.id) {
		throw new Error("Unauthorized");
	}

	if (!data.content?.trim()) {
		throw new Error("Missing content");
	}

	await sql`
		INSERT INTO comments (article_id, user_id, content, created_at)
		VALUES (${data.articleId}, ${session.user.id}, ${data.content}, NOW())
	`;
}

/* ---------------- UPDATE COMMENT ---------------- */
export async function updateCommentAction(data: { id: number; content: string }) {
	const session = await auth();

	if (!session?.user?.id) {
		throw new Error("Unauthorized");
	}

	if (!data.content?.trim()) {
		throw new Error("Missing content");
	}

	// 🔒 ownership check
	const comment = await sql`
		SELECT user_id FROM comments WHERE id = ${data.id}
	`;

	if (!comment.length || comment[0].user_id !== session.user.id) {
		throw new Error("Unauthorized");
	}

	await sql`
		UPDATE comments
		SET content = ${data.content}
		WHERE id = ${data.id}
	`;
}

/* ---------------- DELETE COMMENT ---------------- */
export async function deleteCommentAction(id: number) {
	const session = await auth();

	if (!session?.user?.id) {
		throw new Error("Unauthorized");
	}

	// 🔒 ownership check
	const comment = await sql`
		SELECT user_id FROM comments WHERE id = ${id}
	`;

	if (!comment.length || comment[0].user_id !== session.user.id) {
		throw new Error("Unauthorized");
	}

	await sql`
		DELETE FROM comments WHERE id = ${id}
	`;
}
