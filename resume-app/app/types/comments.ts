export type CommentWithUser = {
	id: number;
	content: string;
	created_at: string;
	article_id: number;
	user_id: string;
	name: string | null;
};
