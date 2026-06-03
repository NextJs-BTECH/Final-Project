import sql from "./db";

export async function createInquiry({
	name,
	email,
	message,
}: {
	name: string;
	email: string;
	message: string;
}) {
	return await sql`
		INSERT INTO inquiries (name, email, message, created_at)
		VALUES (${name}, ${email}, ${message}, NOW())
	`;
}
