export default function Loading() {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="card flex items-center gap-3">
				<div className="w-3 h-3 rounded-full bg-indigo-500 animate-bounce" />
				<div className="w-3 h-3 rounded-full bg-indigo-500 animate-bounce [animation-delay:150ms]" />
				<div className="w-3 h-3 rounded-full bg-indigo-500 animate-bounce [animation-delay:300ms]" />

				<span className="text-muted ml-3">Loading home page...</span>
			</div>
		</div>
	);
}
