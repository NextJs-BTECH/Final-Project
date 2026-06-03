import sql from "./db";

export async function getUserByEmail(email: string) {
	const result = await sql`
		SELECT * FROM users WHERE email = ${email} LIMIT 1
	`;

	return result[0] || null;
}

export async function getUserById(id: string) {
	const result = await sql`
		SELECT id, name, email FROM users WHERE id = ${id} LIMIT 1
	`;

	return result[0] || null;
}
