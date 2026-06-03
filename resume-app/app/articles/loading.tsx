export default function Loading() {
	return (
		<main className="min-h-screen flex items-center justify-center bg-background text-foreground">
			<div className="card flex items-center gap-3 px-6 py-4">
				<div className="w-3 h-3 rounded-full bg-indigo-500 animate-bounce" />
				<div className="w-3 h-3 rounded-full bg-indigo-500 animate-bounce [animation-delay:150ms]" />
				<div className="w-3 h-3 rounded-full bg-indigo-500 animate-bounce [animation-delay:300ms]" />

				<p className="text-muted ml-2">Loading articles...</p>
			</div>
		</main>
	);
}
