import sql from "./db";
import { faker } from "@faker-js/faker";

export async function getArticles() {
	const articles = await sql`
		SELECT id, title, slug, content FROM articles
		ORDER BY id DESC
	`;

	return articles.map((article) => ({
		id: article.id,
		title: article.title,
		slug: article.slug,

		// fallback safely (DO NOT rely on DB for these)
		content: article.content ?? faker.lorem.paragraphs(2),
		excerpt: faker.lorem.sentences(2),
	}));
}
