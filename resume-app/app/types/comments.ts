export type CommentWithUser = {
	id: number;
	content: string;
	user_id: string;
	article_id: number;
	created_at: string;

	name?: string;
	article_title?: string;
	article_slug?: string;
};
